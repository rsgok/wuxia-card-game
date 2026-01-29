// 敌人数据
const EnemyDatabase = {
    // 普通敌人
    山贼: {
        id: '山贼',
        name: '山贼',
        hp: 30,
        maxHp: 30,
        actions: [
            { type: 'attack', damage: 8, intent: '攻击' },
            { type: 'defend', block: 5, intent: '防御' }
        ],
        reward: {
            exp: 10,
            gold: 5
        }
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
        reward: {
            exp: 12,
            gold: 8
        }
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
        reward: {
            exp: 15,
            gold: 10
        }
    },
    
    // 精英敌人
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
        reward: {
            exp: 30,
            gold: 25,
            card: true
        }
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
        reward: {
            exp: 35,
            gold: 30,
            card: true
        }
    },
    
    // Boss
    黑虎堂堂主: {
        id: '黑虎堂堂主',
        name: '黑虎堂堂主',
        hp: 100,
        maxHp: 100,
        actions: [
            { type: 'attack', damage: 20, intent: '虎爪' },
            { type: 'attack', damage: 12, count: 2, intent: '双爪' },
            { type: 'summon', name: '黑虎打手', intent: '召唤' }
        ],
        isBoss: true,
        reward: {
            exp: 50,
            gold: 50,
            relic: true
        }
    },
    西域魔僧: {
        id: '西域魔僧',
        name: '西域魔僧',
        hp: 120,
        maxHp: 120,
        actions: [
            { type: 'attack', damage: 15, intent: '魔掌' },
            { type: 'debuff', name: '中毒', value: 3, intent: '毒功' },
            { type: 'buff', name: '吸血', value: 5, intent: '吸血' }
        ],
        isBoss: true,
        reward: {
            exp: 60,
            gold: 60,
            relic: true
        }
    },
    武林盟主: {
        id: '武林盟主',
        name: '武林盟主',
        hp: 150,
        maxHp: 150,
        actions: [
            { type: 'attack', damage: 25, intent: '盟主令' },
            { type: 'attack', damage: 15, count: 3, intent: '三连击' },
            { type: 'buff', name: '无敌', value: 10, intent: '护体神功' }
        ],
        isBoss: true,
        reward: {
            exp: 100,
            gold: 100,
            relic: true,
            legendary: true
        }
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
    } else {
        pool = Object.values(EnemyDatabase).filter(e => !e.isBoss && !e.isElite);
    }
    
    const index = Math.floor(Math.random() * pool.length);
    return JSON.parse(JSON.stringify(pool[index])); // 深拷贝
}
