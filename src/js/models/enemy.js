// 敌人类
class Enemy {
    constructor(enemyData) {
        this.id = enemyData.id;
        this.name = enemyData.name;
        this.hp = enemyData.hp;
        this.maxHp = enemyData.maxHp;
        this.actions = enemyData.actions;
        this.currentActionIndex = 0;
        
        this.isElite = enemyData.isElite || false;
        this.isBoss = enemyData.isBoss || false;
        
        this.block = 0;
        this.buffs = {};
        this.buffsDuration = {};
        this.poison = 0;
    }
    
    // 获取当前行动
    getCurrentAction() {
        // 随机选择行动
        const index = Math.floor(Math.random() * this.actions.length);
        return this.actions[index];
    }
    
    // 执行行动
    executeAction(player) {
        const action = this.getCurrentAction();
        
        if (action.type === 'attack') {
            // 攻击
            const count = action.count || 1;
            for (let i = 0; i < count; i++) {
                let damage = action.damage;
                
                // 应用吸血buff
                if (this.buffs['吸血']) {
                    damage += this.buffs['吸血'];
                }
                
                player.takeDamage(damage);
            }
            
        } else if (action.type === 'defend') {
            // 防御
            this.addBlock(action.block);
            
        } else if (action.type === 'buff') {
            // 增益
            this.buffs[action.name] = (this.buffs[action.name] || 0) + action.value;
            
        } else if (action.type === 'debuff') {
            // 减益玩家
            if (action.name === '中毒') {
                player.buffs['中毒'] = (player.buffs['中毒'] || 0) + action.value;
            }
        }
    }
    
    // 受到伤害
    takeDamage(amount) {
        // 先扣护甲
        if (this.block > 0) {
            const blocked = Math.min(this.block, amount);
            this.block -= blocked;
            amount -= blocked;
        }
        
        if (amount > 0) {
            this.hp -= amount;
            if (this.hp < 0) this.hp = 0;
        }
        
        return amount;
    }
    
    // 获得护甲
    addBlock(amount) {
        this.block += amount;
    }
    
    // 开始回合
    startTurn() {
        this.block = 0;
        
        // 毒素伤害
        if (this.poison > 0) {
            this.hp -= this.poison;
            this.poison--;
            if (this.hp < 0) this.hp = 0;
        }
    }
    
    // 结束回合
    endTurn() {
        // 清除buff
        Object.keys(this.buffs).forEach(buff => {
            if (this.buffsDuration[buff] !== undefined) {
                this.buffsDuration[buff]--;
                if (this.buffsDuration[buff] <= 0) {
                    delete this.buffs[buff];
                }
            }
        });
    }
    
    // 是否死亡
    isDead() {
        return this.hp <= 0;
    }
}
