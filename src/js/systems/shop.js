// 商店系统
class ShopSystem {
    constructor(player) {
        this.player = player;
        this.gold = 0;
        this.items = [];
        this.potions = [];
    }

    // 生成商店商品
    generateShop() {
        this.items = [];
        this.potions = [];
        
        // 3 张卡牌
        for (let i = 0; i < 3; i++) {
            const card = getRandomShopCard();
            if (card) {
                this.items.push({
                    type: 'card',
                    data: card,
                    price: this.getCardPrice(card),
                    sold: false
                });
            }
        }
        
        // 1 个遗物
        const relic = getRandomShopRelic();
        if (relic) {
            this.items.push({
                type: 'relic',
                data: relic,
                price: this.getRelicPrice(relic),
                sold: false
            });
        }
        
        // 1 个移除卡牌服务
        this.items.push({
            type: 'service',
            data: ShopItems.CARD_REMOVAL,
            price: ShopItems.CARD_REMOVAL.price,
            sold: false
        });
        
        // 1 个药水
        this.potions.push({
            ...ShopItems.POTION,
            sold: false
        });
        
        return { items: this.items, potions: this.potions };
    }

    // 获取卡牌价格
    getCardPrice(card) {
        switch (card.rarity) {
            case '普通': return 50;
            case '罕见': return 100;
            case '稀有': return 150;
            case '传说': return 300;
            default: return 100;
        }
    }

    // 获取遗物价格
    getRelicPrice(relic) {
        switch (relic.rarity) {
            case '普通': return 100;
            case '罕见': return 200;
            case '稀有': return 300;
            case '传说': return 500;
            default: return 200;
        }
    }

    // 购买卡牌
    buyCard(index) {
        const item = this.items[index];
        if (!item || item.type !== 'card' || item.sold) {
            return { success: false, message: '商品不可用' };
        }
        
        if (this.gold < item.price) {
            return { success: false, message: '金币不足' };
        }
        
        // 检查卡组是否已满
        if (this.player.deck.length >= 30) {
            return { success: false, message: '卡组已满' };
        }
        
        this.gold -= item.price;
        this.player.deck.push(item.data.id);
        item.sold = true;
        
        return { success: true, gold: this.gold, card: item.data };
    }

    // 购买遗物
    buyRelic(index) {
        const item = this.items[index];
        if (!item || item.type !== 'relic' || item.sold) {
            return { success: false, message: '商品不可用' };
        }
        
        if (this.gold < item.price) {
            return { success: false, message: '金币不足' };
        }
        
        // 检查是否已有该遗物
        if (this.player.relics.some(r => r.id === item.data.id)) {
            return { success: false, message: '已有此遗物' };
        }
        
        this.gold -= item.price;
        this.player.addRelic(item.data.id);
        item.sold = true;
        
        return { success: true, gold: this.gold, relic: item.data };
    }

    // 购买服务（移除卡牌）
    buyService(index) {
        const item = this.items[index];
        if (!item || item.type !== 'service' || item.sold) {
            return { success: false, message: '服务不可用' };
        }
        
        if (this.gold < item.price) {
            return { success: false, message: '金币不足' };
        }
        
        this.gold -= item.price;
        item.sold = true;
        
        return { success: true, gold: this.gold, service: item.data };
    }

    // 移除卡牌
    removeCard(cardId) {
        const index = this.player.deck.indexOf(cardId);
        if (index > -1) {
            this.player.deck.splice(index, 1);
            return { success: true };
        }
        return { success: false, message: '卡牌不在卡组中' };
    }

    // 购买药水
    buyPotion(index) {
        const potion = this.potions[index];
        if (!potion || potion.sold) {
            return { success: false, message: '药水不可用' };
        }
        
        if (this.gold < potion.price) {
            return { success: false, message: '金币不足' };
        }
        
        this.gold -= potion.price;
        potion.sold = true;
        
        // 立即使用药水
        if (potion.effect === 'heal') {
            this.player.heal(potion.value);
        }
        
        return { success: true, gold: this.gold, potion };
    }

    // 离开商店
    leaveShop() {
        // 清空商品
        this.items = [];
        this.potions = [];
        return { success: true, gold: this.gold };
    }

    // 获取商店状态
    getShopState() {
        return {
            gold: this.gold,
            items: this.items,
            potions: this.potions,
            playerGold: this.gold
        };
    }
}
