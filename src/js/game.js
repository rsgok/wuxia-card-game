// 游戏主类
class Game {
    constructor() {
        this.ui = new GameUI();
        this.player = null;
        this.enemy = null;
        this.battle = null;
        this.deckManager = null;
        this.mapGenerator = new MapGenerator();
        this.shopSystem = null;
        this.eventSystem = null;
        
        // 游戏状态
        this.state = 'menu'; // menu, map, battle, shop, event, rest, victory, defeat
        this.layer = 1;
        this.currentNode = null;
        
        // 初始化显示主菜单
        this.ui.renderMenu();
    }
    
    // 开始游戏
    startGame(characterClass) {
        this.player = new Player(characterClass);
        this.deckManager = new DeckManager(this.player);
        this.shopSystem = new ShopSystem(this.player);
        this.eventSystem = new EventSystem(this.player);
        
        // 给玩家初始遗物
        this.player.addRelic('剑谱残卷');
        
        // 初始化金币
        this.shopSystem.gold = 100;
        
        // 生成第一层地图
        this.mapGenerator.generateMap(1);
        
        // 显示地图
        this.state = 'map';
        this.ui.renderMap(this.mapGenerator.map, this.mapGenerator.getMapState(), this.player);
    }
    
    // 地图节点选择
    selectNode(node) {
        const result = this.mapGenerator.selectNode(node);
        if (!result.success) {
            alert(result.message);
            return;
        }
        
        this.currentNode = result.node;
        
        // 根据节点类型进入相应界面
        switch (node.type) {
            case MapNodes.BATTLE:
            case MapNodes.ELITE:
            case MapNodes.BOSS:
                this.startBattle(node);
                break;
                
            case MapNodes.SHOP:
                this.enterShop();
                break;
                
            case MapNodes.EVENT:
                this.enterEvent(node.event);
                break;
                
            case MapNodes.REST:
                this.enterRest();
                break;
        }
    }
    
    // 开始战斗
    startBattle(node) {
        const enemyId = node.boss || node.enemies[0];
        const enemyData = getEnemy(enemyId);
        
        if (!enemyData) {
            console.error('Enemy not found:', enemyId);
            return;
        }
        
        this.enemy = new Enemy(enemyData);
        this.battle = new BattleSystem(this.player, this.enemy);
        
        this.state = 'battle';
        this.ui.renderBattle(this.player, this.enemy, this.battle);
        
        // 开始玩家回合
        this.battle.startPlayerTurn();
        this.ui.renderHand(this.player);
    }
    
    // 玩家使用卡牌
    playCard(cardIndex) {
        const result = this.battle.playerPlayCard(cardIndex, this.enemy);
        
        if (!result.success) {
            return;
        }
        
        // 更新UI
        this.ui.updateStatus(this.player, this.enemy);
        this.ui.renderHand(this.player);
        
        // 检查战斗是否结束
        if (result.battleEnded) {
            this.endBattle(result.winner);
        }
    }
    
    // 结束玩家回合
    endPlayerTurn() {
        if (this.battle.turn !== 'player') return;
        
        const result = this.battle.endPlayerTurn();
        
        // 更新UI
        this.ui.updateStatus(this.player, this.enemy);
        this.ui.renderHand(this.player);
        
        // 检查战斗是否结束
        if (result && result.battleEnded) {
            this.endBattle(result.winner);
        }
    }
    
    // 结束战斗
    endBattle(winner) {
        const result = this.battle.endBattle(winner);
        
        if (winner === 'player') {
            // 胜利
            this.shopSystem.gold += this.currentNode.boss ? 100 : 50;
            
            if (this.currentNode.type === MapNodes.BOSS) {
                // Boss 战胜利，进入下一层
                if (this.mapGenerator.hasNextLayer()) {
                    this.showVictoryPanel(result, true);
                } else {
                    this.showVictoryPanel(result, false);
                }
            } else {
                // 普通战斗，显示奖励
                this.showRewardPanel(result);
            }
        } else {
            // 失败
            this.showDefeatPanel();
        }
    }
    
    // 显示奖励面板
    showRewardPanel(reward) {
        // 生成随机奖励卡牌（3选1）
        const rewardCards = this.deckManager.getRandomRewardCards(this.player.characterClass);
        this.ui.showRewardPanel(reward, rewardCards);
    }
    
    // 选择奖励卡牌
    selectRewardCard(cardIndex, rewardCards) {
        const card = rewardCards[cardIndex];
        if (card) {
            this.deckManager.addCard(card.id);
            this.returnToMap();
        }
    }
    
    // 显示胜利面板（Boss 战）
    showVictoryPanel(reward, hasMoreLayers) {
        this.ui.showVictoryPanel(reward, hasMoreLayers);
    }
    
    // 显示失败面板
    showDefeatPanel() {
        this.ui.showDefeatPanel();
    }
    
    // 返回地图
    returnToMap() {
        this.state = 'map';
        this.ui.hidePanels();
        
        if (this.currentNode && this.currentNode.type === MapNodes.BOSS && this.mapGenerator.hasNextLayer()) {
            // 进入下一层
            this.mapGenerator.nextLayer();
            this.ui.renderMap(this.mapGenerator.map, this.mapGenerator.getMapState(), this.player);
        } else {
            // 更新地图显示
            this.ui.renderMap(this.mapGenerator.map, this.mapGenerator.getMapState(), this.player);
        }
    }
    
    // 进入商店
    enterShop() {
        this.state = 'shop';
        this.shopSystem.generateShop();
        this.ui.renderShop(this.shopSystem.getShopState());
    }
    
    // 购买商品
    buyItem(type, index) {
        let result;
        
        switch (type) {
            case 'card':
                result = this.shopSystem.buyCard(index);
                break;
            case 'relic':
                result = this.shopSystem.buyRelic(index);
                break;
            case 'service':
                result = this.shopSystem.buyService(index);
                // 如果是移除卡牌服务，需要显示卡牌选择界面
                if (result.success) {
                    this.ui.showCardRemoval(this.player.deck);
                    return;
                }
                break;
            case 'potion':
                result = this.shopSystem.buyPotion(index);
                break;
        }
        
        if (result.success) {
            this.ui.renderShop(this.shopSystem.getShopState());
        } else {
            alert(result.message);
        }
    }
    
    // 移除卡牌
    removeCard(cardId) {
        const result = this.shopSystem.removeCard(cardId);
        if (result.success) {
            this.ui.renderShop(this.shopSystem.getShopState());
        } else {
            alert(result.message);
        }
    }
    
    // 离开商店
    leaveShop() {
        this.shopSystem.leaveShop();
        this.returnToMap();
    }
    
    // 进入事件
    enterEvent(eventData) {
        this.state = 'event';
        const event = eventData || getRandomEvent();
        this.eventSystem.triggerEvent(event.id);
        this.ui.renderEvent(this.eventSystem.getCurrentEvent());
    }
    
    // 选择事件选项
    makeEventChoice(choiceIndex) {
        const result = this.eventSystem.makeChoice(choiceIndex);
        
        if (result.success) {
            if (result.battle) {
                // 事件触发战斗
                const node = { type: MapNodes.BATTLE, enemies: [result.battle.enemy] };
                this.startBattle(node);
            } else if (result.shop) {
                // 事件进入商店
                this.enterShop();
            } else {
                // 显示奖励
                this.showRewardPanel(result);
            }
        } else {
            alert(result.message);
        }
    }
    
    // 进入休息点
    enterRest() {
        this.state = 'rest';
        this.ui.renderRest(this.player);
    }
    
    // 选择休息选项
    selectRestOption(choice) {
        const result = this.eventSystem.rest(choice);
        if (result.success) {
            this.showRewardPanel(result);
        } else {
            alert(result.message);
        }
    }
    
    // 返回主菜单
    returnToMenu() {
        this.state = 'menu';
        this.player = null;
        this.enemy = null;
        this.battle = null;
        this.deckManager = null;
        this.shopSystem = null;
        this.eventSystem = null;
        this.layer = 1;
        this.currentNode = null;
        this.ui.renderMenu();
    }
}

// 全局游戏实例
let game;

// 页面加载完成后初始化游戏
window.onload = function() {
    game = new Game();
};
