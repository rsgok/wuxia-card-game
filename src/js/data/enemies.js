// 扩展的敌人数据库
const EnemyDatabase = {
    // ========== 普通敌人 ==========
    山贼: {
        id: '山贼',
        name: '山贼',
        hp: 30,
        maxHp: 30,
        actions: [
            { type: 'attack', damage: 8, intent: '攻击' },
            { type: 'defend', block: 5, intent: '防御' }
        ],
        reward: { exp: 10, gold: 5 }
    },
    流浪武者: {
        id: '流浪武者',
        name: '流浪武者',
        hp: 35,
        maxHp: 35,
        actions: [
            { type: 'attack', damage: 10, intent: '攻击' },
            { type: 'attack', damage: 6, count: 2, intent: '连击' }
        ],
        reward: { exp: 12, gold: 8 }
    },
    门派弟子: {
        id: '门派弟子',
        name: '门派弟子',
        hp: 40,
        maxHp: 40,
        actions: [
            { type: 'attack', damage: 7, intent: '攻击' },
            { type: 'buff', name: '防御增强', value: 3, intent: '强化' }
        ],
        reward: { exp: 15, gold: 10 }
    },
    毒蛇: {
        id: '毒蛇',
        name: '毒蛇',
        hp: 25,
        maxHp: 25,
        actions: [
            { type: 'attack', damage: 6, poison: 2, intent: '毒咬' },
            { type: 'buff', name: '速度', value: 2, intent: '加速' }
        ],
        reward: { exp: 8, gold: 3 }
    },
    书摊保镖: {
        id: '书摊保镖',
        name: '书摊保镖',
        hp: 50,
        maxHp: 50,
        actions: [
            { type: 'attack', damage: 12, intent: '铁拳' },
            { type: 'defend', block: 10, intent: '铁壁' }
        ],
        reward: { exp: 18, gold: 15 }
    },
    赌徒: {
        id: '赌徒',
        name: '赌徒',
        hp: 35,
        maxHp: 35,
        actions: [
            { type: 'attack', damage: 5, count: 3, intent: '乱拳' },
            { type: 'debuff', name: '虚弱', value: 1, intent: '赌博' }
        ],
        reward: { exp: 12, gold: 20 }
    },
    狼群: {
        id: '狼群',
        name: '狼群',
        hp: 60,
        maxHp: 60,
        actions: [
            { type: 'attack', damage: 5, count: 4, intent: '群攻' },
            { type: 'buff', name: '狂暴', value: 3, intent: '狂暴' }
        ],
        reward: { exp: 20, gold: 12 }
    },
    
    // ========== 精英敌人 ==========
    门派长老: {
        id: '门派长老',
        name: '门派长老',
        hp: 60,
        maxHp: 60,
        actions: [
            { type: 'attack', damage: 15, intent: '强力攻击' },
            { type: 'attack', damage: 8, count: 2, intent: '连击' },
            { type: 'defend', block: 12, intent: '铁壁' }
        ],
        isElite: true,
        reward: { exp: 30, gold: 25, card: true }
    },
    江湖高手: {
        id: '江湖高手',
        name: '江湖高手',
        hp: 55,
        maxHp: 55,
        actions: [
            { type: 'attack', damage: 18, intent: '必杀' },
            { type: 'buff', name: '伤害提升', value: 5, intent: '蓄力' }
        ],
        isElite: true,
        reward: { exp: 35, gold: 30, card: true }
    },
    武林盟主使者: {
        id: '武林盟主使者',
        name: '武林盟主使者',
        hp: 80,
        maxHp: 80,
        actions: [
            { type: 'attack', damage: 20, intent: '盟主令' },
            { type: 'buff', name: '无敌', value: 10, intent: '护体神功' },
            { type: 'debuff', name: '虚弱', value: 2, intent: '威压' }
        ],
        isElite: true,
        reward: { exp: 50, gold: 50, relic: true }
    },
    黑衣杀手: {
        id: '黑衣杀手',
        name: '黑衣杀手',
        hp: 65,
        maxHp: 65,
        actions: [
            { type: 'attack', damage: 25, intent: '必杀一击' },
            { type: 'buff', name: '闪避', value: 30, intent: '隐身' }
        ],
        isElite: true,
        reward: { exp: 40, gold: 35, card: true }
    },
    毒王弟子: {
        id: '毒王弟子',
        name: '毒王弟子',
        hp: 70,
        maxHp: 70,
        actions: [
            { type: 'attack', damage: 10, poison: 5, intent: '毒功' },
            { type: 'buff', name: '毒域', value: 3, intent: '毒雾' }
        ],
        isElite: true,
        reward: { exp: 45, gold: 40, card: true }
    },
    
    // ========== Boss ==========
    黑虎堂堂主: {
        id: '黑虎堂堂主',
        name: '黑虎堂堂主',
        hp: 100,
        maxHp: 100,
        actions: [
            { type: 'attack', damage: 20, intent: '虎爪' },
            { type: 'attack', damage: 12, count: 2, intent: '双爪' },
            { type: 'summon', name: '黑虎打手', intent: '召唤' },
            { type: 'buff', name: '虎威', value: 5, intent: '虎威' }
        ],
        isBoss: true,
        reward: { exp: 50, gold: 50, relic: true }
    },
    西域魔僧: {
        id: '西域魔僧',
        name: '西域魔僧',
        hp: 120,
        maxHp: 120,
        actions: [
            { type: 'attack', damage: 15, intent: '魔掌' },
            { type: 'debuff', name: '中毒', value: 3, intent: '毒功' },
            { type: 'buff', name: '吸血', value: 5, intent: '吸血' },
            { type: 'special', name: '魔龙波', damage: 30, intent: '魔龙波' }
        ],
        isBoss: true,
        reward: { exp: 60, gold: 60, relic: true }
    },
    武林盟主: {
        id: '武林盟主',
        name: '武林盟主',
        hp: 150,
        maxHp: 150,
        actions: [
            { type: 'attack', damage: 25, intent: '盟主令' },
            { type: 'attack', damage: 15, count: 3, intent: '三连击' },
            { type: 'buff', name: '无敌', value: 10, intent: '护体神功' },
            { type: 'special', name: '武林神功', damage: 40, intent: '绝世神功' }
        ],
        isBoss: true,
        reward: { exp: 100, gold: 100, relic: true, legendary: true }
    },
    
    // ========== 隐藏/特殊敌人 ==========
    恶鬼: {
        id: '恶鬼',
        name: '恶鬼',
        hp: 80,
        maxHp: 80,
        actions: [
            { type: 'attack', damage: 15, intent: '鬼爪' },
            { type: 'buff', name: '恐惧', value: 2, intent: '恐吓' }
        ],
        isElite: true,
        isSecret: true,
        reward: { exp: 60, gold: 60, relic: true }
    }
};

// 地图层数据
const MapLayers = {
    1: {
        name: '江湖边缘',
        description: '初入江湖，山贼横行',
        nodeCount: 10,
        possibleEnemies: ['山贼', '流浪武者', '门派弟子'],
        possibleElites: ['门派长老', '江湖高手'],
        boss: '黑虎堂堂主'
    },
    2: {
        name: '门派地盘',
        description: '各大门派，高手云集',
        nodeCount: 12,
        possibleEnemies: ['流浪武者', '门派弟子', '赌徒', '狼群'],
        possibleElites: ['门派长老', '江湖高手', '武林盟主使者'],
        boss: '西域魔僧'
    },
    3: {
        name: '武林深处',
        description: '武学巅峰，决战在即',
        nodeCount: 15,
        possibleEnemies: ['门派弟子', '赌徒', '狼群'],
        possibleElites: ['武林盟主使者', '黑衣杀手', '毒王弟子'],
        boss: '武林盟主'
    }
};

// 获取敌人
function getEnemy(enemyId) {
    return EnemyDatabase[enemyId];
}

// 根据难度获取随机敌人
function getRandomEnemy(difficulty = 'normal') {
    let pool;
    
    if (difficulty === 'boss') {
        pool = Object.values(EnemyDatabase).filter(e => e.isBoss);
    } else if (difficulty === 'elite') {
        pool = Object.values(EnemyDatabase).filter(e => e.isElite);
    } else if (difficulty === 'secret') {
        pool = Object.values(EnemyDatabase).filter(e => e.isSecret);
    } else {
        pool = Object.values(EnemyDatabase).filter(e => !e.isBoss && !e.isElite && !e.isSecret);
    }
    
    const index = Math.floor(Math.random() * pool.length);
    return JSON.parse(JSON.stringify(pool[index])); // 深拷贝
}

// 根据层数获取随机敌人
function getRandomEnemyByLayer(layer) {
    const layerData = getMapLayer(layer);
    const enemyId = layerData.possibleEnemies[
        Math.floor(Math.random() * layerData.possibleEnemies.length)
    ];
    return getEnemy(enemyId);
}

// 根据层数获取随机精英
function getRandomEliteByLayer(layer) {
    const layerData = getMapLayer(layer);
    const enemyId = layerData.possibleElites[
        Math.floor(Math.random() * layerData.possibleElites.length)
    ];
    return getEnemy(enemyId);
}

// 获取地图层数据
function getMapLayer(layer) {
    return MapLayers[layer] || MapLayers[1];
}
