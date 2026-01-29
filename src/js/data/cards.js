// 卡牌数据
const CardDatabase = {
    // 剑客卡牌
    劈空掌: {
        id: '劈空掌',
        name: '劈空掌',
        type: '攻击',
        cost: 1,
        rarity: '普通',
        effect: { type: 'damage', value: 6 },
        description: '造成 6 点伤害',
        class: '剑客'
    },
    剑气纵横: {
        id: '剑气纵横',
        name: '剑气纵横',
        type: '攻击',
        cost: 2,
        rarity: '罕见',
        effect: { type: 'damage', value: 12 },
        description: '造成 12 点伤害',
        class: '剑客'
    },
    独孤九剑: {
        id: '独孤九剑',
        name: '独孤九剑',
        type: '攻击',
        cost: 3,
        rarity: '稀有',
        effect: { type: 'damage', value: 20 },
        description: '造成 20 点伤害',
        class: '剑客'
    },
    万剑归宗: {
        id: '万剑归宗',
        name: '万剑归宗',
        type: '攻击',
        cost: 4,
        rarity: '传说',
        effect: { type: 'damage', value: 35 },
        description: '造成 35 点伤害',
        class: '剑客'
    },
    
    // 拳师卡牌
    铁砂掌: {
        id: '铁砂掌',
        name: '铁砂掌',
        type: '攻击',
        cost: 1,
        rarity: '普通',
        effect: { type: 'damage', value: 5 },
        description: '造成 5 点伤害',
        class: '拳师'
    },
    罗汉拳: {
        id: '罗汉拳',
        name: '罗汉拳',
        type: '防御',
        cost: 1,
        rarity: '普通',
        effect: { type: 'block', value: 6 },
        description: '获得 6 点护甲',
        class: '拳师'
    },
    降龙十八掌: {
        id: '降龙十八掌',
        name: '降龙十八掌',
        type: '攻击',
        cost: 3,
        rarity: '稀有',
        effect: { type: 'damage', value: 25 },
        description: '造成 25 点伤害',
        class: '拳师'
    },
    
    // 医师卡牌
    金疮药: {
        id: '金疮药',
        name: '金疮药',
        type: '恢复',
        cost: 1,
        rarity: '普通',
        effect: { type: 'heal', value: 5 },
        description: '回复 5 点生命值',
        class: '医师'
    },
    针灸: {
        id: '针灸',
        name: '针灸',
        type: '能力',
        cost: 1,
        rarity: '罕见',
        effect: { type: 'buff', name: '再生', value: 2 },
        description: '每回合回复 2 点生命值，持续 3 回合',
        class: '医师'
    },
    
    // 通用卡牌
    铁布衫: {
        id: '铁布衫',
        name: '铁布衫',
        type: '防御',
        cost: 1,
        rarity: '普通',
        effect: { type: 'block', value: 5 },
        description: '获得 5 点护甲',
        class: '通用'
    },
    轻功提纵: {
        id: '轻功提纵',
        name: '轻功提纵',
        type: '能力',
        cost: 1,
        rarity: '罕见',
        effect: { type: 'buff', name: '闪避', value: 20 },
        description: '本回合闪避率 +20%',
        class: '通用'
    },
    
    // 消耗卡
    绝世武功: {
        id: '绝世武功',
        name: '绝世武功',
        type: '能力',
        cost: 2,
        rarity: '稀有',
        effect: { type: 'temporary', name: '攻击翻倍' },
        description: '本回合所有攻击伤害翻倍（消耗）',
        class: '通用',
        consumable: true
    }
};

// 初始卡组（根据职业）
const StartingDecks = {
    剑客: ['劈空掌', '劈空掌', '劈空掌', '劈空掌', '铁布衫', '铁布衫', '轻功提纵'],
    拳师: ['铁砂掌', '铁砂掌', '铁砂掌', '铁砂掌', '罗汉拳', '罗汉拳', '铁布衫'],
    医师: ['铁砂掌', '铁砂掌', '金疮药', '金疮药', '金疮药', '针灸', '铁布衫']
};

// 根据稀有度获取卡牌
function getRandomCards(count, rarity = '普通', characterClass = '通用') {
    const cards = Object.values(CardDatabase).filter(card => {
        if (rarity && card.rarity !== rarity) return false;
        if (characterClass !== '通用' && card.class !== '通用' && card.class !== characterClass) return false;
        return true;
    });

    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// 获取卡牌
function getCard(cardId) {
    return CardDatabase[cardId];
}
