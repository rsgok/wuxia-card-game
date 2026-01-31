// 卡组管理系统
class DeckManager {
    constructor(player) {
        this.player = player;
    }
    
    // 添加卡牌到卡组
    addCard(cardId) {
        const card = getCard(cardId);
        if (card) {
            this.player.deck.push(cardId);
            return true;
        }
        return false;
    }
    
    // 移除卡牌
    removeCard(cardId) {
        const index = this.player.deck.indexOf(cardId);
        if (index > -1) {
            this.player.deck.splice(index, 1);
            return true;
        }
        return false;
    }
    
    // 升级卡牌
    upgradeCard(cardId) {
        const card = getCard(cardId);
        if (!card) return false;
        
        // 检查卡牌是否已经升级
        if (this.player.deck.includes(cardId + '+')) {
            return false;
        }
        
        const index = this.player.deck.indexOf(cardId);
        if (index > -1) {
            // 创建升级版本
            const upgradedCard = JSON.parse(JSON.stringify(card));
            upgradedCard.id = cardId + '+';
            upgradedCard.name = card.name + '+';
            upgradedCard.rarity = this.nextRarity(card.rarity);
            
            // 提升效果
            if (upgradedCard.effect.value) {
                upgradedCard.effect.value = Math.floor(upgradedCard.effect.value * 1.5);
            }
            if (upgradedCard.effect.cost > 0) {
                upgradedCard.effect.cost = Math.max(0, upgradedCard.effect.cost - 1);
            }
            
            this.player.deck[index] = upgradedCard.id;
            
            // 如果升级卡在弃牌堆或抽牌堆中，也需要替换
            const replaceInArray = (arr) => {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id === cardId) {
                        arr[i] = upgradedCard;
                    }
                }
            };
            
            replaceInArray(this.player.drawPile);
            replaceInArray(this.player.discardPile);
            replaceInArray(this.player.hand);
            
            return true;
        }
        return false;
    }
    
    // 获取下一稀有度
    nextRarity(rarity) {
        const rarityOrder = ['普通', '罕见', '稀有', '传说'];
        const index = rarityOrder.indexOf(rarity);
        if (index > -1 && index < rarityOrder.length - 1) {
            return rarityOrder[index + 1];
        }
        return rarity;
    }
    
    // 获取随机奖励卡牌（3选1）
    getRandomRewardCards(characterClass) {
        const cards = getRandomCards(10, null, characterClass);
        const shuffled = [...cards].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    }
    
    // 获取卡组统计
    getDeckStats() {
        const stats = {
            total: this.player.deck.length,
            byType: {},
            byRarity: {}
        };
        
        this.player.deck.forEach(cardId => {
            const card = getCard(cardId);
            if (card) {
                stats.byType[card.type] = (stats.byType[card.type] || 0) + 1;
                stats.byRarity[card.rarity] = (stats.byRarity[card.rarity] || 0) + 1;
            }
        });
        
        return stats;
    }
}
