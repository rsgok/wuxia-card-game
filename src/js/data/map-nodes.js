// 地图节点数据
const MapNodes = {
    // 节点类型
    BATTLE: 'battle',
    ELITE: 'elite',
    BOSS: 'boss',
    SHOP: 'shop',
    EVENT: 'event',
    REST: 'rest',
    TREASURE: 'treasure',
    UNKNOWN: 'unknown'
};

// 地图层数据
const MapLayers = {
    1: {
        name: '江湖边缘',
        description: '初入江湖，山贼横行',
        nodeCount: 10,
        possibleEnemies: ['山贼', '流浪武者', '门派弟子'],
        possibleElites: ['门派长老'],
        boss: '黑虎堂堂主'
    },
    2: {
        name: '门派地盘',
        description: '各大门派，高手云集',
        nodeCount: 12,
        possibleEnemies: ['流浪武者', '门派弟子', '江湖高手'],
        possibleElites: ['门派长老', '江湖高手'],
        boss: '西域魔僧'
    },
    3: {
        name: '武林深处',
        description: '武学巅峰，决战在即',
        nodeCount: 15,
        possibleEnemies: ['门派弟子', '江湖高手'],
        possibleElites: ['江湖高手', '武林盟主使者'],
        boss: '武林盟主'
    }
};

// 地图事件
const MapEvents = {
    老者赠剑: {
        id: '老者赠剑',
        name: '神秘老者',
        description: '一位白发老者拦住你的去路，"年轻人，我看你骨骼惊奇，这把剑便送给你吧。"',
        choices: [
            { text: '接受剑', result: 'gain_card', card: '独孤九剑' },
            { text: '婉拒', result: 'exp', value: 20 },
            { text: '请教武学', result: 'relic', relic: '剑意' }
        ]
    },
    毒蛇洞: {
        id: '毒蛇洞',
        name: '毒蛇洞',
        description: '前方有一个山洞，隐约可见毒蛇出没。',
        choices: [
            { text: '探索', result: 'battle', enemy: '毒蛇', reward: 'card' },
            { text: '绕行', result: 'nothing' },
            { text: '放火烧洞', result: 'exp', value: 30 }
        ]
    },
    江湖酒馆: {
        id: '江湖酒馆',
        name: '江湖酒馆',
        description: '前方有一家热闹的酒馆，酒客们正在谈论江湖大事。',
        choices: [
            { text: '喝一杯', result: 'heal', value: 15 },
            { text: '打听消息', result: 'map_reveal' },
            { text: '离开', result: 'nothing' }
        ]
    },
    武林秘籍: {
        id: '武林秘籍',
        name: '破旧书摊',
        description: '路边有个破旧的书摊，摊主说这些书都是武林秘籍。',
        choices: [
            { text: '购买（50金币）', result: 'buy_card', cost: 50 },
            { text: '偷取', result: 'battle', enemy: '书摊保镖', risk: true },
            { text: '离开', result: 'nothing' }
        ]
    }
};

// 获取地图层数据
function getMapLayer(layer) {
    return MapLayers[layer] || MapLayers[1];
}

// 获取随机事件
function getRandomEvent() {
    const events = Object.values(MapEvents);
    const index = Math.floor(Math.random() * events.length);
    return events[index];
}

// 商店物品
const ShopItems = {
    CARDS: [
        '剑气纵横', '独孤九剑', '万剑归宗',
        '降龙十八掌', '针灸', '轻功提纵', '绝世武功'
    ],
    RELICS: [
        '黑虎爪', '毒龙心法', '内力丹', '九转还魂丹', '剑谱残卷'
    ],
    POTION: {
        name: '回血药水',
        price: 30,
        effect: 'heal',
        value: 20
    },
    CARD_REMOVAL: {
        name: '移除卡牌',
        price: 100,
        effect: 'remove_card'
    }
};

// 根据稀有度获取随机卡牌
function getRandomShopCard(rarity = '罕见') {
    const cards = ShopItems.CARDS.map(id => getCard(id)).filter(c => c);
    const filtered = rarity === 'all' ? cards : cards.filter(c => c.rarity === rarity);
    
    if (filtered.length === 0) return null;
    const index = Math.floor(Math.random() * filtered.length);
    return filtered[index];
}

// 获取随机遗物
function getRandomShopRelic() {
    const relics = ShopItems.RELICS.map(id => getRelic(id)).filter(r => r);
    const index = Math.floor(Math.random() * relics.length);
    return relics[index] || null;
}
