// 玩家类
class Player {
    constructor(characterClass) {
        this.characterClass = characterClass;
        this.maxHp = 80;
        this.currentHp = 80;
        this.maxEnergy = 3;
        this.currentEnergy = 3;
        this.block = 0;
        
        // 卡组
        this.deck = [...StartingDecks[characterClass]];
        this.drawPile = [];
        this.discardPile = [];
        this.hand = [];
        
        // 状态
        this.relics = [];
        this.level = 1;
        this.exp = 0;
        this.expToNext = 100;
        
        // 战斗状态
        this.buffs = {};
        this.buffsDuration = {};
        
        // 战斗临时状态
        this.swordIntent = 0;
        this.attackDouble = false;
        
        // 遗物效果
        this.energyBonus = 0;
        this.costReduction = 0;
        
        this.initDeck();
    }
    
    // 初始化卡组
    initDeck() {
        this.drawPile = [...this.deck].sort(() => Math.random() - 0.5);
        this.discardPile = [];
        this.hand = [];
    }
    
    // 抽牌
    drawCards(count) {
        for (let i = 0; i < count; i++) {
            if (this.hand.length >= 10) break;
            
            if (this.drawPile.length === 0) {
                if (this.discardPile.length === 0) break;
                // 洗牌
                this.drawPile = [...this.discardPile].sort(() => Math.random() - 0.5);
                this.discardPile = [];
            }
            
            const card = this.drawPile.pop();
            if (card) {
                this.hand.push(JSON.parse(JSON.stringify(card))); // 深拷贝
            }
        }
    }
    
    // 弃牌
    discardCard(index) {
        const card = this.hand.splice(index, 1)[0];
        if (card) {
            this.discardPile.push(card);
        }
    }
    
    // 使用卡牌
    playCard(index) {
        const card = this.hand[index];
        if (!card) return null;
        
        // 检查内力消耗
        const actualCost = Math.max(0, card.cost - this.costReduction);
        if (this.currentEnergy < actualCost) {
            return { success: false, message: '内力不足' };
        }
        
        // 扣除内力
        this.currentEnergy -= actualCost;
        
        // 从手牌移除
        this.hand.splice(index, 1);
        
        // 如果不是消耗卡，加入弃牌堆
        if (!card.consumable) {
            this.discardPile.push(card);
        }
        
        // 触发遗物效果
        this.triggerRelics('play_card', card);
        
        return { success: true, card };
    }
    
    // 获得遗物
    addRelic(relicId) {
        const relic = getRelic(relicId);
        if (relic) {
            this.relics.push(relic);
            this.applyRelicEffect(relic);
            return true;
        }
        return false;
    }
    
    // 应用遗物效果
    applyRelicEffect(relic) {
        if (relic.effect.type === 'energy_bonus') {
            this.maxEnergy += relic.effect.value;
            this.energyBonus += relic.effect.value;
        } else if (relic.effect.type === 'cost_reduction') {
            this.costReduction += relic.effect.value;
        }
    }
    
    // 触发遗物
    triggerRelics(trigger, ...args) {
        this.relics.forEach(relic => {
            if (relic.effect.trigger === trigger) {
                if (relic.effect.condition) {
                    relic.effect.condition(this, ...args);
                } else if (relic.effect.modify) {
                    return relic.effect.modify(...args);
                }
            }
        });
    }
    
    // 受到伤害
    takeDamage(amount) {
        // 先扣护甲
        if (this.block > 0) {
            const blocked = Math.min(this.block, amount);
            this.block -= blocked;
            amount -= blocked;
        }
        
        if (amount > 0) {
            this.currentHp -= amount;
            if (this.currentHp < 0) this.currentHp = 0;
        }
        
        return amount;
    }
    
    // 获得护甲
    addBlock(amount) {
        this.block += amount;
    }
    
    // 回复生命值
    heal(amount) {
        this.currentHp = Math.min(this.currentHp + amount, this.maxHp);
    }
    
    // 新回合
    startTurn() {
        this.currentEnergy = this.maxEnergy;
        this.block = 0;
        
        // 应用再生buff
        if (this.buffs['再生']) {
            this.heal(this.buffs['再生']);
            this.buffsDuration['再生']--;
            if (this.buffsDuration['再生'] <= 0) {
                delete this.buffs['再生'];
            }
        }
        
        // 检查剑意翻倍
        if (this.attackDouble) {
            this.attackDouble = false;
        }
    }
    
    // 结束回合
    endTurn() {
        // 清除本回合buff
        if (this.buffs['闪避']) {
            delete this.buffs['闪避'];
        }
        
        // 清除临时buff
        Object.keys(this.buffs).forEach(buff => {
            if (this.buffsDuration[buff] !== undefined) {
                this.buffsDuration[buff]--;
                if (this.buffsDuration[buff] <= 0) {
                    delete this.buffs[buff];
                }
            }
        });
        
        // 弃掉所有手牌
        this.discardPile.push(...this.hand);
        this.hand = [];
    }
    
    // 获得经验
    gainExp(amount) {
        // 应用江湖经验遗物
        const expBonus = this.relics.some(r => r.id === '江湖经验') ? 1.5 : 1;
        amount = Math.floor(amount * expBonus);
        
        this.exp += amount;
        
        while (this.exp >= this.expToNext) {
            this.levelUp();
        }
    }
    
    // 升级
    levelUp() {
        this.exp -= this.expToNext;
        this.level++;
        this.expToNext = Math.floor(this.expToNext * 1.5);
        
        // 提升生命值
        this.maxHp += 5;
        this.currentHp = this.maxHp;
        
        // 检查天道酬勤
        if (this.relics.some(r => r.id === '天道酬勤')) {
            const newRelic = getRandomRelic();
            if (newRelic) {
                this.addRelic(newRelic.id);
            }
        }
    }
    
    // 战斗结束
    endBattle() {
        // 应用九转还魂丹
        const relic = this.relics.find(r => r.id === '九转还魂丹');
        if (relic) {
            this.heal(relic.effect.value);
        }
        
        // 重置战斗状态
        this.block = 0;
        this.buffs = {};
        this.buffsDuration = {};
        this.swordIntent = 0;
        this.attackDouble = false;
        this.hand = [];
        this.drawPile = [];
        this.discardPile = [];
        this.currentEnergy = this.maxEnergy;
    }
}
