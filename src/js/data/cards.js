// 扩展的卡牌数据库
const CardDatabase = {
    // ========== 剑客卡牌 ==========
    // 攻击卡
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
    越女剑法: {
        id: '越女剑法',
        name: '越女剑法',
        type: '攻击',
        cost: 1,
        rarity: '罕见',
        effect: { type: 'damage', value: 8 },
        description: '造成 8 点伤害',
        class: '剑客'
    },
    太极剑: {
        id: '太极剑',
        name: '太极剑',
        type: '攻击',
        cost: 2,
        rarity: '罕见',
        effect: { type: 'damage', value: 15 },
        description: '造成 15 点伤害',
        class: '剑客'
    },
    剑气如虹: {
        id: '剑气如虹',
        name: '剑气如虹',
        type: '攻击',
        cost: 2,
        rarity: '罕见',
        effect: { type: 'damage', value: 10, count: 2 },
        description: '造成 10 点伤害，2 次',
        class: '剑客'
    },
    破剑式: {
        id: '破剑式',
        name: '破剑式',
        type: '攻击',
        cost: 1,
        rarity: '罕见',
        effect: { type: 'damage', value: 8, breakBlock: true },
        description: '造成 8 点伤害，无视护甲',
        class: '剑客'
    },
    
    // 防御卡
    剑盾防御: {
        id: '剑盾防御',
        name: '剑盾防御',
        type: '防御',
        cost: 1,
        rarity: '普通',
        effect: { type: 'block', value: 6 },
        description: '获得 6 点护甲',
        class: '剑客'
    },
    
    // 能力卡
    剑意涌动: {
        id: '剑意涌动',
        name: '剑意涌动',
        type: '能力',
        cost: 1,
        rarity: '罕见',
        effect: { type: 'buff', name: '剑意', value: 3 },
        description: '获得 3 点剑意',
        class: '剑客'
    },
    
    // ========== 拳师卡牌 ==========
    // 攻击卡
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
    七伤拳: {
        id: '七伤拳',
        name: '七伤拳',
        type: '攻击',
        cost: 2,
        rarity: '罕见',
        effect: { type: 'damage', value: 18, selfDamage: 4 },
        description: '造成 18 点伤害，自身受到 4 点伤害',
        class: '拳师'
    },
    黯骨掌: {
        id: '黯骨掌',
        name: '黯骨掌',
        type: '攻击',
        cost: 2,
        rarity: '罕见',
        effect: { type: 'damage', value: 12, poison: 3 },
        description: '造成 12 点伤害，施加 3 层中毒',
        class: '拳师'
    },
    大力金刚掌: {
        id: '大力金刚掌',
        name: '大力金刚掌',
        type: '攻击',
        cost: 3,
        rarity: '罕见',
        effect: { type: 'damage', value: 22 },
        description: '造成 22 点伤害',
        class: '拳师'
    },
    
    // 防御卡
    金钟罩: {
        id: '金钟罩',
        name: '金钟罩',
        type: '防御',
        cost: 2,
        rarity: '罕见',
        effect: { type: 'block', value: 12 },
        description: '获得 12 点护甲',
        class: '拳师'
    },
    
    // 能力卡
    拳意爆发: {
        id: '拳意爆发',
        name: '拳意爆发',
        type: '能力',
        cost: 1,
        rarity: '罕见',
        effect: { type: 'buff', name: '力量', value: 3, duration: 3 },
        description: '获得 3 点力量，持续 3 回合',
        class: '拳师'
    },
    
    // ========== 医师卡牌 ==========
    // 攻击卡
    点穴截脉: {
        id: '点穴截脉',
        name: '点穴截脉',
        type: '攻击',
        cost: 1,
        rarity: '普通',
        effect: { type: 'damage', value: 4 },
        description: '造成 4 点伤害',
        class: '医师'
    },
    针灸: {
        id: '针灸',
        name: '针灸',
        type: '能力',
        cost: 1,
        rarity: '罕见',
        effect: { type: 'buff', name: '再生', value: 2, duration: 3 },
        description: '每回合回复 2 点生命值，持续 3 回合',
        class: '医师'
    },
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
    以毒攻毒: {
        id: '以毒攻毒',
        name: '以毒攻毒',
        type: '攻击',
        cost: 2,
        rarity: '罕见',
        effect: { type: 'damage', value: 8, poison: 5 },
        description: '造成 8 点伤害，施加 5 层中毒',
        class: '医师'
    },
    回春术: {
        id: '回春术',
        name: '回春术',
        type: '恢复',
        cost: 2,
        rarity: '罕见',
        effect: { type: 'heal', value: 15 },
        description: '回复 15 点生命值',
        class: '医师'
    },
    九花玉露丸: {
        id: '九花玉露丸',
        name: '九花玉露丸',
        type: '恢复',
        cost: 3,
        rarity: '稀有',
        effect: { type: 'heal', value: 25 },
        description: '回复 25 点生命值',
        class: '医师'
    },
    解毒丹: {
        id: '解毒丹',
        name: '解毒丹',
        type: '能力',
        cost: 1,
        rarity: '罕见',
        effect: { type: 'cleanse', target: 'all' },
        description: '清除所有负面状态',
        class: '医师'
    },
    
    // 防御卡
    护体真气: {
        id: '护体真气',
        name: '护体真气',
        type: '防御',
        cost: 1,
        rarity: '普通',
        effect: { type: 'block', value: 5 },
        description: '获得 5 点护甲',
        class: '医师'
    },
    
    // 能力卡
    医道传承: {
        id: '医道传承',
        name: '医道传承',
        type: '能力',
        cost: 1,
        rarity: '罕见',
        effect: { type: 'buff', name: '治疗', value: 2, duration: 3 },
        description: '下次恢复效果 +2，持续 3 回合',
        class: '医师'
    },
    
    // ========== 通用卡牌 ==========
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
    },
    绝世神功: {
        id: '绝世神功',
        name: '绝世神功',
        type: '能力',
        cost: 3,
        rarity: '传说',
        effect: { type: 'temporary', name: '全能提升', energy: 3, damage: 2, block: 2 },
        description: '本回合内力+3、攻击翻倍、护甲翻倍（消耗）',
        class: '通用',
        consumable: true
    },
    
    // 高级通用卡
    内力回气: {
        id: '内力回气',
        name: '内力回气',
        type: '能力',
        cost: 0,
        rarity: '罕见',
        effect: { type: 'energy', value: 2 },
        description: '回复 2 点内力（消耗）',
        class: '通用',
        consumable: true
    },
    暴雨梨花: {
        id: '暴雨梨花',
        name: '暴雨梨花',
        type: '攻击',
        cost: 1,
        rarity: '罕见',
        effect: { type: 'damage', value: 3, count: 5 },
        description: '造成 3 点伤害，5 次（消耗）',
        class: '通用',
        consumable: true
    },
    
    // 组合卡牌
    天山折梅手: {
        id: '天山折梅手',
        name: '天山折梅手',
        type: '攻击',
        cost: 2,
        rarity: '传说',
        effect: { type: 'damage', value: 18, effect: 'steal_hp' },
        description: '造成 18 点伤害，并回复等量生命值',
        class: '通用'
    },
    乾坤大挪移: {
        id: '乾坤大挪移',
        name: '乾坤大挪移',
        type: '能力',
        cost: 2,
        rarity: '传说',
        effect: { type: 'reflect', multiplier: 1.5 },
        description: '本回合受到的伤害的 150% 反射给攻击者（消耗）',
        class: '通用',
        consumable: true
    }
};

// 初始卡组（根据职业）
const StartingDecks = {
    剑客: [
        '劈空掌', '劈空掌', '劈空掌', '劈空掌',
        '剑气纵横', '铁布衫', '铁布衫',
        '轻功提纵', '剑意涌动'
    ],
    拳师: [
        '铁砂掌', '铁砂掌', '铁砂掌', '铁砂掌',
        '罗汉拳', '罗汉拳', '铁布衫',
        '铁布衫', '拳意爆发'
    ],
    医师: [
        '点穴截脉', '点穴截脉', '点穴截脉', '点穴截脉',
        '金疮药', '金疮药', '铁布衫',
        '铁布衫', '医道传承'
    ]
};

// 根据稀有度获取卡牌
function getRandomCards(count, rarity = '普通', characterClass = '通用') {
    const cards = Object.values(CardDatabase).filter(card => {
        if (rarity && rarity !== 'all' && card.rarity !== rarity) return false;
        if (characterClass !== '通用' && card.class !== '通用' && card.class !== characterClass) return false;
        return true;
    });

    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// 根据层数获取卡牌
function getCardsByLayer(layer) {
    const pool = [];
    
    if (layer === 1) {
        // 第一层：普通和罕见
        pool.push(...getRandomCards(20, '普通'));
        pool.push(...getRandomCards(10, '罕见'));
    } else if (layer === 2) {
        // 第二层：罕见和稀有
        pool.push(...getRandomCards(15, '罕见'));
        pool.push(...getRandomCards(8, '稀有'));
    } else {
        // 第三层：稀有和传说
        pool.push(...getRandomCards(10, '稀有'));
        pool.push(...getRandomCards(5, '传说'));
    }
    
    const shuffled = pool.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
}

// 获取卡牌
function getCard(cardId) {
    return CardDatabase[cardId];
}

// 获取升级后的卡牌
function getUpgradedCard(originalCardId) {
    const card = getCard(originalCardId);
    if (!card) return null;
    
    const upgraded = JSON.parse(JSON.stringify(card));
    upgraded.id = originalCardId + '+';
    upgraded.name = card.name + '+';
    upgraded.rarity = getNextRarity(card.rarity);
    
    // 提升效果
    if (upgraded.effect.value) {
        upgraded.effect.value = Math.floor(upgraded.effect.value * 1.5);
    }
    if (upgraded.effect.count) {
        upgraded.effect.count = Math.ceil(upgraded.effect.count * 1.2);
    }
    if (upgraded.effect.damage) {
        upgraded.effect.damage = Math.floor(upgraded.effect.damage * 1.5);
    }
    if (upgraded.effect.heal) {
        upgraded.effect.heal = Math.floor(upgraded.effect.heal * 1.5);
    }
    if (upgraded.effect.block) {
        upgraded.effect.block = Math.floor(upgraded.effect.block * 1.5);
    }
    
    return upgraded;
}

// 获取下一稀有度
function getNextRarity(rarity) {
    const rarityOrder = ['普通', '罕见', '稀有', '传说'];
    const index = rarityOrder.indexOf(rarity);
    if (index > -1 && index < rarityOrder.length - 1) {
        return rarityOrder[index + 1];
    }
    return rarity;
}
