// 战斗系统
class BattleSystem {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.turn = 'player'; // 'player' 或 'enemy'
        this.battleLog = [];
        
        // 敌人当前意图
        this.enemyIntent = enemy.getCurrentAction();
    }
    
    // 玩家回合开始
    startPlayerTurn() {
        this.player.startTurn();
        this.player.drawCards(5);
        this.turn = 'player';
        this.log('玩家回合开始');
    }
    
    // 玩家使用卡牌
    playerPlayCard(cardIndex, target = this.enemy) {
        if (this.turn !== 'player') {
            return { success: false, message: '不是玩家回合' };
        }
        
        const result = this.player.playCard(cardIndex);
        if (!result.success) {
            return result;
        }
        
        const card = result.card;
        this.log(`玩家使用了【${card.name}】`);
        
        // 应用卡牌效果
        this.applyCardEffect(card, target);
        
        // 检查敌人是否死亡
        if (this.enemy.isDead()) {
            return { success: true, battleEnded: true, winner: 'player' };
        }
        
        return { success: true };
    }
    
    // 应用卡牌效果
    applyCardEffect(card, target) {
        const effect = card.effect;
        const player = this.player;
        
        // 检查攻击翻倍
        let damageMultiplier = 1;
        if (player.attackDouble && effect.type === 'damage') {
            damageMultiplier = 2;
        }
        
        // 检查剑意
        player.triggerRelics('attack', target);
        
        if (effect.type === 'damage') {
            let damage = effect.value * damageMultiplier;
            
            // 检查黑虎爪遗物
            const modified = player.triggerRelics('attack', damage);
            if (modified !== undefined) {
                damage = modified;
            }
            
            // 检查毒龙心法
            player.triggerRelics('attack', target);
            
            const actualDamage = target.takeDamage(damage);
            this.log(`造成了 ${actualDamage} 点伤害`);
            
        } else if (effect.type === 'block') {
            player.addBlock(effect.value);
            this.log(`获得了 ${effect.value} 点护甲`);
            
        } else if (effect.type === 'heal') {
            player.heal(effect.value);
            this.log(`回复了 ${effect.value} 点生命值`);
            
        } else if (effect.type === 'buff') {
            player.buffs[effect.name] = (player.buffs[effect.name] || 0) + (effect.value || 1);
            if (effect.duration) {
                player.buffsDuration[effect.name] = effect.duration;
            }
            this.log(`获得了【${effect.name}】效果`);
            
        } else if (effect.type === 'temporary') {
            // 临时效果
            if (effect.name === '攻击翻倍') {
                player.attackDouble = true;
                this.log('本回合攻击伤害翻倍！');
            }
        }
    }
    
    // 玩家结束回合
    endPlayerTurn() {
        if (this.turn !== 'player') {
            return;
        }
        
        this.player.endTurn();
        this.turn = 'enemy';
        this.log('玩家回合结束');
        
        // 敌人回合
        this.enemyTurn();
    }
    
    // 敌人回合
    enemyTurn() {
        this.enemy.startTurn();
        this.log(`${this.enemy.name}回合开始`);
        
        // 显示意图
        this.enemyIntent = this.enemy.getCurrentAction();
        this.log(`${this.enemy.name}准备：${this.enemyIntent.intent}`);
        
        // 执行行动
        this.enemy.executeAction(this.player);
        this.log(`${this.enemy.name}发动了${this.enemyIntent.intent}`);
        
        // 检查玩家是否死亡
        if (this.player.currentHp <= 0) {
            return { battleEnded: true, winner: 'enemy' };
        }
        
        // 敌人回合结束
        this.enemy.endTurn();
        
        // 玩家回合开始
        setTimeout(() => {
            this.startPlayerTurn();
        }, 500);
        
        return { battleEnded: false };
    }
    
    // 添加战斗日志
    log(message) {
        this.battleLog.push(message);
        if (this.battleLog.length > 10) {
            this.battleLog.shift();
        }
    }
    
    // 获取战斗日志
    getBattleLog() {
        return [...this.battleLog];
    }
    
    // 战斗结束
    endBattle(winner) {
        if (winner === 'player') {
            // 玩家胜利
            this.player.gainExp(this.enemy.reward?.exp || 10);
            this.player.endBattle();
            return {
                winner: 'player',
                exp: this.enemy.reward?.exp || 10,
                gold: this.enemy.reward?.gold || 5,
                card: this.enemy.reward?.card || false,
                relic: this.enemy.reward?.relic || false
            };
        } else {
            // 玩家失败
            return {
                winner: 'enemy',
                message: '你被打败了...'
            };
        }
    }
}
