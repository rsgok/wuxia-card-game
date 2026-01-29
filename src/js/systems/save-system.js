// 存档系统
class SaveSystem {
    constructor() {
        this.saveKey = 'wuxia_card_game_save';
        this.autoSaveKey = 'wuxia_card_game_autosave';
    }
    
    // 保存游戏
    saveGame(game) {
        try {
            const saveData = {
                version: '1.0',
                timestamp: new Date().toISOString(),
                player: this.serializePlayer(game.player),
                shopSystem: this.serializeShop(game.shopSystem),
                mapGenerator: this.serializeMap(game.mapGenerator),
                game: {
                    layer: game.layer,
                    currentNode: game.currentNode,
                    state: game.state
                }
            };
            
            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            return { success: true, message: '游戏已保存' };
        } catch (error) {
            console.error('Save failed:', error);
            return { success: false, message: '保存失败' };
        }
    }
    
    // 自动保存
    autoSave(game) {
        try {
            const saveData = {
                version: '1.0',
                timestamp: new Date().toISOString(),
                player: this.serializePlayer(game.player),
                shopSystem: this.serializeShop(game.shopSystem),
                mapGenerator: this.serializeMap(game.mapGenerator),
                game: {
                    layer: game.layer,
                    currentNode: game.currentNode,
                    state: game.state
                }
            };
            
            localStorage.setItem(this.autoSaveKey, JSON.stringify(saveData));
            return { success: true };
        } catch (error) {
            console.error('Auto save failed:', error);
            return { success: false };
        }
    }
    
    // 加载游戏
    loadGame() {
        try {
            const saveData = JSON.parse(localStorage.getItem(this.saveKey));
            if (!saveData) {
                return { success: false, message: '没有找到存档' };
            }
            
            return { success: true, saveData };
        } catch (error) {
            console.error('Load failed:', error);
            return { success: false, message: '加载失败' };
        }
    }
    
    // 加载自动存档
    loadAutoSave() {
        try {
            const saveData = JSON.parse(localStorage.getItem(this.autoSaveKey));
            if (!saveData) {
                return { success: false };
            }
            
            return { success: true, saveData };
        } catch (error) {
            console.error('Load auto save failed:', error);
            return { success: false };
        }
    }
    
    // 删除存档
    deleteSave() {
        try {
            localStorage.removeItem(this.saveKey);
            return { success: true, message: '存档已删除' };
        } catch (error) {
            console.error('Delete save failed:', error);
            return { success: false, message: '删除失败' };
        }
    }
    
    // 删除自动存档
    deleteAutoSave() {
        try {
            localStorage.removeItem(this.autoSaveKey);
            return { success: true };
        } catch (error) {
            console.error('Delete auto save failed:', error);
            return { success: false };
        }
    }
    
    // 检查是否有存档
    hasSave() {
        return localStorage.getItem(this.saveKey) !== null;
    }
    
    // 检查是否有自动存档
    hasAutoSave() {
        return localStorage.getItem(this.autoSaveKey) !== null;
    }
    
    // 获取存档信息
    getSaveInfo() {
        try {
            const saveData = JSON.parse(localStorage.getItem(this.saveKey));
            if (!saveData) {
                return null;
            }
            
            return {
                timestamp: saveData.timestamp,
                layer: saveData.game.layer,
                characterClass: saveData.player.characterClass,
                level: saveData.player.level,
                gold: saveData.shopSystem.gold,
                relics: saveData.player.relics.length,
                deckSize: saveData.player.deck.length
            };
        } catch (error) {
            console.error('Get save info failed:', error);
            return null;
        }
    }
    
    // 序列化玩家数据
    serializePlayer(player) {
        return {
            characterClass: player.characterClass,
            maxHp: player.maxHp,
            currentHp: player.currentHp,
            maxEnergy: player.maxEnergy,
            currentEnergy: player.currentEnergy,
            block: player.block,
            deck: [...player.deck],
            relics: [...player.relics],
            level: player.level,
            exp: player.exp,
            expToNext: player.expToNext,
            buffs: {...player.buffs},
            buffsDuration: {...player.buffsDuration},
            energyBonus: player.energyBonus,
            costReduction: player.costReduction
        };
    }
    
    // 反序列化玩家数据
    deserializePlayer(data) {
        const player = new Player(data.characterClass);
        player.maxHp = data.maxHp;
        player.currentHp = data.currentHp;
        player.maxEnergy = data.maxEnergy;
        player.currentEnergy = data.currentEnergy;
        player.block = data.block;
        player.deck = [...data.deck];
        player.relics = [...data.relics];
        player.level = data.level;
        player.exp = data.exp;
        player.expToNext = data.expToNext;
        player.buffs = {...data.buffs};
        player.buffsDuration = {...data.buffsDuration};
        player.energyBonus = data.energyBonus || 0;
        player.costReduction = data.costReduction || 0;
        
        return player;
    }
    
    // 序列化商店数据
    serializeShop(shop) {
        if (!shop) return null;
        return {
            gold: shop.gold,
            items: shop.items,
            potions: shop.potions
        };
    }
    
    // 反序列化商店数据
    deserializeShop(data) {
        const shop = new ShopSystem(null);
        shop.gold = data.gold;
        shop.items = [...data.items];
        shop.potions = [...data.potions];
        return shop;
    }
    
    // 序列化地图数据
    serializeMap(mapGen) {
        if (!mapGen) return null;
        return {
            map: mapGen.map,
            currentLayer: mapGen.currentLayer,
            currentNode: mapGen.currentNode,
            maxLayers: mapGen.maxLayers
        };
    }
    
    // 反序列化地图数据
    deserializeMap(data) {
        const mapGen = new MapGenerator();
        mapGen.map = data.map;
        mapGen.currentLayer = data.currentLayer;
        mapGen.currentNode = data.currentNode;
        mapGen.maxLayers = data.maxLayers;
        return mapGen;
    }
    
    // 获取所有存档
    getAllSaves() {
        const saves = [];
        
        // 主存档
        if (this.hasSave()) {
            saves.push({
                type: 'manual',
                info: this.getSaveInfo()
            });
        }
        
        // 自动存档
        if (this.hasAutoSave()) {
            try {
                const autoData = JSON.parse(localStorage.getItem(this.autoSaveKey));
                saves.push({
                    type: 'auto',
                    timestamp: autoData.timestamp,
                    layer: autoData.game.layer,
                    characterClass: autoData.player.characterClass,
                    level: autoData.player.level,
                    gold: autoData.shopSystem.gold
                });
            } catch (error) {
                console.error('Get auto save failed:', error);
            }
        }
        
        return saves;
    }
    
    // 导出存档
    exportSave() {
        const saveData = localStorage.getItem(this.saveKey);
        if (!saveData) {
            return { success: false, message: '没有存档' };
        }
        
        // 转换为 Base64
        const base64 = btoa(unescape(encodeURIComponent(saveData)));
        
        // 创建下载链接
        const blob = new Blob([base64], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wuxia_save_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return { success: true, message: '存档已导出' };
    }
    
    // 导入存档
    importSave(base64Data) {
        try {
            const saveData = decodeURIComponent(escape(atob(base64Data)));
            localStorage.setItem(this.saveKey, saveData);
            return { success: true, message: '存档已导入' };
        } catch (error) {
            console.error('Import save failed:', error);
            return { success: false, message: '导入失败：存档格式错误' };
        }
    }
    
    // 清空所有存档
    clearAllSaves() {
        this.deleteSave();
        this.deleteAutoSave();
        return { success: true, message: '所有存档已清空' };
    }
}
