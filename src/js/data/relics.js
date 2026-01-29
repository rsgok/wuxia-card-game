// 遗物数据
const RelicDatabase = {
    // 战斗类
    剑意: {
        id: '剑意',
        name: '剑意',
        description: '每次打出攻击卡，获得 1 点剑意，满 10 点剑意下回合攻击卡伤害翻倍',
        rarity: '稀有',
        type: '战斗',
        effect: {
            type: 'passive',
            trigger: 'attack',
            condition: (state) => {
                state.swordIntent = (state.swordIntent || 0) + 1;
                if (state.swordIntent >= 10) {
                    state.attackDouble = true;
                    state.swordIntent = 0;
                }
            }
        }
    },
    毒龙心法: {
        id: '毒龙心法',
        name: '毒龙心法',
        description: '攻击卡有 15% 概率施加中毒效果',
        rarity: '稀有',
        type: '战斗',
        effect: {
            type: 'passive',
            trigger: 'attack',
            condition: (state, enemy) => {
                if (Math.random() < 0.15) {
                    enemy.poison = (enemy.poison || 0) + 3;
                }
            }
        }
    },
    黑虎爪: {
        id: '黑虎爪',
        name: '黑虎爪',
        description: '攻击时 10% 概率额外造成 50% 伤害',
        rarity: '罕见',
        type: '战斗',
        effect: {
            type: 'passive',
            trigger: 'attack',
            modify: (damage) => {
                return Math.random() < 0.1 ? damage * 1.5 : damage;
            }
        }
    },
    
    // 成长类
    江湖经验: {
        id: '江湖经验',
        name: '江湖经验',
        description: '获得的经验 +50%',
        rarity: '普通',
        type: '成长',
        effect: {
            type: 'exp_multiplier',
            value: 1.5
        }
    },
    天道酬勤: {
        id: '天道酬勤',
        name: '天道酬勤',
        description: '每次升级获得随机遗物',
        rarity: '传说',
        type: '成长',
        effect: {
            type: 'level_reward',
            reward: 'relic'
        }
    },
    
    // 资源类
    内力丹: {
        id: '内力丹',
        name: '内力丹',
        description: '每回合多 1 点内力',
        rarity: '罕见',
        type: '资源',
        effect: {
            type: 'energy_bonus',
            value: 1
        }
    },
    九转还魂丹: {
        id: '九转还魂丹',
        name: '九转还魂丹',
        description: '战斗结束回复 15 点生命值',
        rarity: '罕见',
        type: '资源',
        effect: {
            type: 'battle_end_heal',
            value: 15
        }
    },
    
    // 特殊类
    盟主令: {
        id: '盟主令',
        name: '盟主令',
        description: '所有卡牌消耗降低 1，最低为 0',
        rarity: '传说',
        type: '特殊',
        effect: {
            type: 'cost_reduction',
            value: 1
        }
    },
    剑谱残卷: {
        id: '剑谱残卷',
        name: '剑谱残卷',
        description: '开始战斗时，获得 1 张随机攻击卡到手牌',
        rarity: '罕见',
        type: '特殊',
        effect: {
            type: 'battle_start',
            action: 'draw_attack'
        }
    }
};

// 根据稀有度获取随机遗物
function getRandomRelic(rarity = '普通') {
    const relics = Object.values(RelicDatabase).filter(r => r.rarity === rarity);
    if (relics.length === 0) return null;
    
    const index = Math.floor(Math.random() * relics.length);
    return JSON.parse(JSON.stringify(relics[index]));
}

// 获取遗物
function getRelic(relicId) {
    return RelicDatabase[relicId];
}
