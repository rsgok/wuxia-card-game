// 地图生成系统
class MapGenerator {
    constructor() {
        this.map = [];
        this.currentLayer = 1;
        this.currentNode = 0;
        this.maxLayers = 3;
    }

    // 生成新地图
    generateMap(layer) {
        const layerData = getMapLayer(layer);
        this.currentLayer = layer;
        this.map = [];
        
        // 每层有多个节点列（通常是 6-8 列）
        const columns = Math.floor(Math.random() * 3) + 6; // 6-8 列
        const nodesPerColumn = Math.floor(Math.random() * 2) + 2; // 每列 2-3 个节点
        
        // 生成节点
        for (let col = 0; col < columns; col++) {
            const column = [];
            
            // 最后一列是 Boss
            if (col === columns - 1) {
                column.push({
                    x: col,
                    y: 0,
                    type: MapNodes.BOSS,
                    locked: false,
                    boss: layerData.boss
                });
            } else {
                // 生成普通节点
                for (let row = 0; row < nodesPerColumn; row++) {
                    const node = this.generateRandomNode(col, row, layerData);
                    column.push(node);
                }
            }
            
            this.map.push(column);
        }
        
        // 解锁第一列
        this.unlockColumn(0);
        
        return this.map;
    }

    // 生成随机节点
    generateRandomNode(col, row, layerData) {
        // 第一列总是战斗
        if (col === 0) {
            return {
                x: col,
                y: row,
                type: MapNodes.BATTLE,
                locked: false,
                enemies: this.getRandomEnemies(layerData, false)
            };
        }
        
        // 后面的列随机
        const rand = Math.random();
        let type;
        
        if (rand < 0.5) {
            // 50% 概率是战斗
            type = MapNodes.BATTLE;
        } else if (rand < 0.65) {
            // 15% 概率是精英
            type = MapNodes.ELITE;
        } else if (rand < 0.75) {
            // 10% 概率是商店
            type = MapNodes.SHOP;
        } else if (rand < 0.85) {
            // 10% 概率是事件
            type = MapNodes.EVENT;
        } else {
            // 15% 概率是休息
            type = MapNodes.REST;
        }
        
        const node = {
            x: col,
            y: row,
            type: type,
            locked: true
        };
        
        // 根据类型设置数据
        if (type === MapNodes.BATTLE) {
            node.enemies = this.getRandomEnemies(layerData, false);
        } else if (type === MapNodes.ELITE) {
            node.enemies = this.getRandomEnemies(layerData, true);
        } else if (type === MapNodes.EVENT) {
            node.event = getRandomEvent();
        }
        
        return node;
    }

    // 获取随机敌人
    getRandomEnemies(layerData, isElite) {
        if (isElite) {
            const enemyId = layerData.possibleElites[
                Math.floor(Math.random() * layerData.possibleElites.length)
            ];
            return [enemyId];
        } else {
            // 随机 1-2 个敌人
            const count = Math.floor(Math.random() * 2) + 1;
            const enemies = [];
            for (let i = 0; i < count; i++) {
                const enemyId = layerData.possibleEnemies[
                    Math.floor(Math.random() * layerData.possibleEnemies.length)
                ];
                enemies.push(enemyId);
            }
            return enemies;
        }
    }

    // 解锁某一列
    unlockColumn(colIndex) {
        if (colIndex >= this.map.length) return;
        
        this.map[colIndex].forEach(node => {
            node.locked = false;
        });
    }

    // 锁定某一列
    lockColumn(colIndex) {
        if (colIndex >= this.map.length) return;
        
        this.map[colIndex].forEach(node => {
            node.locked = true;
        });
    }

    // 获取可访问的节点
    getAccessibleNodes() {
        const accessible = [];
        
        for (let col = 0; col < this.map.length; col++) {
            for (let row = 0; row < this.map[col].length; row++) {
                const node = this.map[col][row];
                if (!node.locked) {
                    accessible.push(node);
                }
            }
        }
        
        return accessible;
    }

    // 选择节点
    selectNode(node) {
        if (node.locked) {
            return { success: false, message: '此节点尚未解锁' };
        }
        
        // 锁定当前列和之后的所有列
        for (let col = node.x; col < this.map.length; col++) {
            this.lockColumn(col);
        }
        
        // 解锁下一列
        this.unlockColumn(node.x + 1);
        
        return { success: true, node };
    }

    // 获取当前层的 Boss
    getCurrentBoss() {
        const layerData = getMapLayer(this.currentLayer);
        return getEnemy(layerData.boss);
    }

    // 检查是否还有下一层
    hasNextLayer() {
        return this.currentLayer < this.maxLayers;
    }

    // 进入下一层
    nextLayer() {
        if (!this.hasNextLayer()) {
            return { success: false, message: '已经到达最后一层' };
        }
        
        this.currentLayer++;
        this.currentNode = 0;
        return this.generateMap(this.currentLayer);
    }

    // 获取地图状态
    getMapState() {
        return {
            currentLayer: this.currentLayer,
            maxLayers: this.maxLayers,
            currentNode: this.currentNode,
            hasNextLayer: this.hasNextLayer(),
            layerData: getMapLayer(this.currentLayer)
        };
    }
}
