// 完整的遗物系统
const RelicDatabase = {
    // ========== 战斗类 ==========
    剑意: {
        id: '剑意',
        name: '剑意',
        description: '每次打出攻击卡，获得 1 点剑意，满 10 点剑意下回合攻击卡伤害翻倍',
        rarity: '稀有',
        type: '战斗',
        effect: {
            type: 'passive',
            trigger: 'attack',
            onTrigger: (state) => {
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
        description: '攻击卡有 15% 概率施加中毒效果（3 层）',
        rarity: '稀有',
        type: '战斗',
        effect: {
            type: 'passive',
            trigger: 'attack',
            onTrigger: (state, enemy) => {
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
    铁布衫心法: {
        id: '铁布衫心法',
        name: '铁布衫心法',
        description: '每个回合开始自动获得 2 点护甲',
        rarity: '罕见',
        type: '战斗',
        effect: {
            type: 'passive',
            trigger: 'turn_start',
            onTrigger: (state) => {
                state.block = (state.block || 0) + 2;
            }
        }
    },
    金钟罩: {
        id: '金钟罩',
        name: '金钟罩',
        description: '受到的伤害减少 3 点',
        rarity: '稀有',
        type: '战斗',
        effect: {
            type: 'passive',
            trigger: 'take_damage',
            modify: (damage) => {
                return Math.max(0, damage - 3);
            }
        }
    },
    七伤拳诀: {
        id: '七伤拳诀',
        name: '七伤拳诀',
        description: '攻击卡造成的伤害增加 20%，但每次攻击自身受到 2 点伤害',
        rarity: '稀有',
        type: '战斗',
        effect: {
            type: 'passive',
            trigger: 'attack',
            onTrigger: (state, enemy) => {
                // 在 BattleSystem 的 applyCardEffect 中处理
                state.sevenHurtActive = true;
            }
        }
    },
    
    // ========== 成长类 ==========
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
    武学秘籍: {
        id: '武学秘籍',
        name: '武学秘籍',
        description: '每场战斗结束后有 30% 概率获得随机卡牌',
        rarity: '罕见',
        type: '成长',
        effect: {
            type: 'battle_end',
            chance: 0.3,
            reward: 'card'
        }
    },
    武林通缉: {
        id: '武林通缉',
        name: '武林通缉',
        description: '击败精英敌人时额外获得 20 金币',
        rarity: '普通',
        type: '成长',
        effect: {
            type: 'elite_killed',
            bonusGold: 20
        }
    },
    
    // ========== 资源类 ==========
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
    千年灵芝: {
        id: '千年灵芝',
        name: '千年灵芝',
        description: '每场战斗结束后回复 5 点生命值',
        rarity: '普通',
        type: '资源',
        effect: {
            type: 'battle_end_heal',
            value: 5
        }
    },
    聚宝盆: {
        id: '聚宝盆',
        name: '聚宝盆',
        description: '每层开始获得额外 50 金币',
        rarity: '普通',
        type: '资源',
        effect: {
            type: 'layer_start',
            gold: 50
        }
    },
    
    // ========== 特殊类 ==========
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
    },
    丐帮袋: {
        id: '丐帮袋',
        name: '丐帮袋',
        description: '每场战斗开始时，获得 3 张随机卡牌，战斗结束后这些卡牌移除',
        rarity: '传说',
        type: '特殊',
        effect: {
            type: 'battle_start',
            action: 'draw_3_temp'
        }
    },
    易筋经: {
        id: '易筋经',
        name: '易筋经',
        description: '升级卡牌时，提升 50% 更多效果',
        rarity: '传说',
        type: '特殊',
        effect: {
            type: 'card_upgrade',
            multiplier: 1.5
        }
    },
    武林至尊: {
        id: '武林至尊',
        name: '武林至尊',
        description: '你的最大生命值增加 20 点',
        rarity: '传说',
        type: '特殊',
        effect: {
            type: 'hp_bonus',
            value: 20
        }
    },
    
    // ========== 组合遗物 ==========
    少林三宝: {
        id: '少林三宝',
        name: '少林三宝',
        description: '（组合遗物）当拥有易筋经、金钟罩、达摩杖时，防御卡护甲效果翻倍',
        rarity: '传说',
        type: '组合',
        requires: ['易筋经', '金钟罩', '达摩杖'],
        effect: {
            type: 'combo',
            bonus: 'block_double'
        }
    },
    武当三丰: {
        id: '武当三丰',
        name: '武当三丰',
        description: '（组合遗物）当拥有太极剑、太极拳、武当心法时，攻击卡伤害增加 30%',
        rarity: '传说',
        type: '组合',
        requires: ['太极剑', '太极拳', '武当心法'],
        effect: {
            type: 'combo',
            bonus: 'attack_boost'
        }
    }
};

// 获取遗物
function getRelic(relicId) {
    return RelicDatabase[relicId];
}

// 根据稀有度获取随机遗物
function getRandomRelic(rarity = '普通') {
    let relics;
    
    if (rarity === 'all') {
        relics = Object.values(RelicDatabase);
    } else {
        relics = Object.values(RelicDatabase).filter(r => r.rarity === rarity);
    }
    
    if (relics.length === 0) return null;
    
    const index = Math.floor(Math.random() * relics.length);
    return JSON.parse(JSON.stringify(relics[index]));
}

// 检查组合遗物
function checkComboRelics(player) {
    const relicIds = player.relics.map(r => r.id);
    const combos = Object.values(RelicDatabase).filter(r => r.type === '组合');
    
    const activeCombos = [];
    
    combos.forEach(combo => {
        const hasAll = combo.requires.every(id => relicIds.includes(id));
        if (hasAll) {
            activeCombos.push(combo);
        }
    });
    
    return activeCombos;
}

// 根据类型获取遗物池
function getRelicPoolByType(type) {
    return Object.values(RelicDatabase).filter(r => r.type === type);
}

// Boss 遗物（只能从 Boss 获得）
const BossRelics = ['毒龙心法', '天道酬勤', '盟主令', '丐帮袋', '易筋经', '武林至尊', '少林三宝', '武当三丰'];

function getRandomBossRelic() {
    const index = Math.floor(Math.random() * BossRelics.length);
    return getRelic(BossRelics[index]);
}

// 根据层数获取遗物
function getRelicByLayer(layer) {
    const pool = [];
    
    if (layer === 1) {
        // 第一层：普通和罕见
        pool.push(...getRelicPoolByType('普通'));
        pool.push(...getRelicPoolByType('战斗').filter(r => r.rarity === '罕见'));
        pool.push(...getRelicPoolByType('成长').filter(r => r.rarity === '罕见'));
    } else if (layer === 2) {
        // 第二层：罕见和稀有
        pool.push(...getRelicPoolByType('战斗').filter(r => r.rarity === '罕见' || r.rarity === '稀有'));
        pool.push(...getRelicPoolByType('成长').filter(r => r.rarity === '罕见' || r.rarity === '稀有'));
        pool.push(...getRelicPoolByType('资源').filter(r => r.rarity === '罕见'));
    } else {
        // 第三层：稀有和传说
        pool.push(...getRelicPoolByType('稀有'));
        pool.push(...getRelicPoolByType('传说'));
    }
    
    if (pool.length === 0) return null;
    
    const index = Math.floor(Math.random() * pool.length);
    return JSON.parse(JSON.stringify(pool[index]));
}
