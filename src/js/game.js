// 游戏主类
class Game {
    constructor() {
        this.ui = new GameUI();
        this.player = null;
        this.enemy = null;
        this.battle = null;
        this.deckManager = null;
        
        // 初始化显示主菜单
        this.ui.renderMenu();
    }
    
    // 开始游戏
    startGame(characterClass) {
        this.player = new Player(characterClass);
        this.deckManager = new DeckManager(this.player);
        
        // 给玩家初始遗物
        this.player.addRelic('剑谱残卷');
        
        // 开始第一场战斗
        this.startBattle();
    }
    
    // 开始战斗
    startBattle() {
        // 随机选择敌人
        const enemyData = getRandomEnemy('normal');
        this.enemy = new Enemy(enemyData);
        
        // 创建战斗系统
        this.battle = new BattleSystem(this.player, this.enemy);
        
        // 渲染战斗界面
        this.ui.renderBattle(this.player, this.enemy, this.battle);
        
        // 开始玩家回合
        this.battle.startPlayerTurn();
        this.ui.renderHand(this.player);
    }
    
    // 玩家使用卡牌
    playCard(cardIndex) {
        const result = this.battle.playerPlayCard(cardIndex, this.enemy);
        
        if (!result.success) {
            // 播放错误动画或提示
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
        // 检查是否是玩家回合
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
            this.ui.showVictoryPanel(result);
        } else {
            // 失败
            this.ui.showDefeatPanel();
        }
    }
    
    // 战斗后继续
    continueAfterBattle() {
        this.ui.hidePanels();
        
        // 开始下一场战斗
        setTimeout(() => {
            this.startBattle();
        }, 500);
    }
    
    // 返回主菜单
    returnToMenu() {
        this.player = null;
        this.enemy = null;
        this.battle = null;
        this.deckManager = null;
        this.ui.renderMenu();
    }
}

// 全局游戏实例
let game;

// 页面加载完成后初始化游戏
window.onload = function() {
    game = new Game();
};
