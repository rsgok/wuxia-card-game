// 事件系统
class EventSystem {
    constructor(player) {
        this.player = player;
        this.currentEvent = null;
    }

    // 触发事件
    triggerEvent(eventId) {
        let event;
        
        if (eventId) {
            event = MapEvents[eventId];
        } else {
            event = getRandomEvent();
        }
        
        if (!event) {
            return { success: false, message: '事件未找到' };
        }
        
        this.currentEvent = event;
        return { success: true, event };
    }

    // 选择事件选项
    makeChoice(choiceIndex) {
        if (!this.currentEvent) {
            return { success: false, message: '没有当前事件' };
        }
        
        const choice = this.currentEvent.choices[choiceIndex];
        if (!choice) {
            return { success: false, message: '选项不存在' };
        }
        
        let result = {
            success: true,
            choice: choice,
            rewards: {}
        };
        
        // 根据结果类型执行
        switch (choice.result) {
            case 'gain_card':
                this.player.deck.push(choice.card);
                result.rewards.card = getCard(choice.card);
                break;
                
            case 'exp':
                this.player.gainExp(choice.value);
                result.rewards.exp = choice.value;
                break;
                
            case 'relic':
                this.player.addRelic(choice.relic);
                result.rewards.relic = getRelic(choice.relic);
                break;
                
            case 'heal':
                this.player.heal(choice.value);
                result.rewards.heal = choice.value;
                break;
                
            case 'battle':
                result.battle = {
                    enemy: choice.enemy || '山贼',
                    reward: choice.reward || 'exp'
                };
                break;
                
            case 'buy_card':
                // 在商店逻辑中处理
                result.shop = true;
                break;
                
            case 'nothing':
            default:
                result.rewards.nothing = true;
                break;
        }
        
        return result;
    }

    // 休息节点处理
    rest(choice) {
        switch (choice) {
            case 'heal':
                const healAmount = Math.floor(this.player.maxHp * 0.3);
                this.player.heal(healAmount);
                return { 
                    success: true, 
                    choice: 'heal',
                    rewards: { heal: healAmount }
                };
                
            case 'upgrade':
                const upgradableCards = this.player.deck.filter(id => {
                    const card = getCard(id);
                    return card && !card.consumable && !id.endsWith('+');
                });
                
                if (upgradableCards.length === 0) {
                    return { success: false, message: '没有可升级的卡牌' };
                }
                
                // 随机选择一张卡升级
                const cardToUpgrade = upgradableCards[
                    Math.floor(Math.random() * upgradableCards.length)
                ];
                this.player.deck[this.player.deck.indexOf(cardToUpgrade)] = cardToUpgrade + '+';
                
                return { 
                    success: true, 
                    choice: 'upgrade',
                    rewards: { upgradedCard: getCard(cardToUpgrade) }
                };
                
            case 'skip':
            default:
                return { 
                    success: true, 
                    choice: 'skip',
                    rewards: { nothing: true }
                };
        }
    }

    // 获取当前事件
    getCurrentEvent() {
        return this.currentEvent;
    }

    // 清除当前事件
    clearEvent() {
        this.currentEvent = null;
    }
}
