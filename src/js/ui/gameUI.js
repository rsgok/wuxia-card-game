// 游戏UI渲染
class GameUI {
    constructor() {
        this.app = document.getElementById('app');
    }
    
    // 渲染主菜单
    renderMenu() {
        this.app.innerHTML = `
            <div class="menu-screen">
                <h1 class="game-title">江湖行</h1>
                <div class="menu-buttons">
                    <button class="menu-btn" onclick="game.startGame('剑客')">剑客</button>
                    <button class="menu-btn" onclick="game.startGame('拳师')">拳师</button>
                    <button class="menu-btn" onclick="game.startGame('医师')">医师</button>
                </div>
                <p style="margin-top: 2rem; color: #888;">选择你的武学门派</p>
            </div>
        `;
    }
    
    // 渲染战斗界面
    renderBattle(player, enemy, battle) {
        this.app.innerHTML = `
            <div class="battle-screen">
                <div class="status-bar">
                    <div class="status-group">
                        <div class="status-item">
                            <span class="status-label">生命值</span>
                            <span class="status-value">${player.currentHp}/${player.maxHp}</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">等级</span>
                            <span class="status-value">${player.level}</span>
                        </div>
                    </div>
                    <div class="status-group">
                        <div class="status-item">
                            <span class="status-label">内力</span>
                            <span class="status-value">${player.currentEnergy}/${player.maxEnergy}</span>
                        </div>
                        <div class="status-item">
                            <span class="status-label">护甲</span>
                            <span class="status-value">${player.block}</span>
                        </div>
                    </div>
                </div>
                
                <div class="battle-area">
                    <div class="character player">
                        <div class="character-avatar">⚔️</div>
                        <div class="character-name">${player.characterClass}</div>
                        <div class="hp-bar">
                            <div class="hp-fill" style="width: ${(player.currentHp / player.maxHp) * 100}%"></div>
                        </div>
                        <div class="hp-text">${player.currentHp}/${player.maxHp}</div>
                        ${player.block > 0 ? `<div style="margin-top: 0.5rem; color: #4169e1;">🛡️ ${player.block}</div>` : ''}
                    </div>
                    
                    <div class="character enemy">
                        ${enemy.isBoss ? '<div style="position: absolute; top: 10px; left: 10px; font-size: 1.5rem;">👑</div>' : ''}
                        ${enemy.isElite ? '<div style="position: absolute; top: 10px; left: 10px; font-size: 1.5rem;">⭐</div>' : ''}
                        <div class="character-avatar">👤</div>
                        <div class="character-name">${enemy.name}</div>
                        <div class="hp-bar">
                            <div class="hp-fill" style="width: ${(enemy.hp / enemy.maxHp) * 100}%"></div>
                        </div>
                        <div class="hp-text">${enemy.hp}/${enemy.maxHp}</div>
                        ${enemy.block > 0 ? `<div style="margin-top: 0.5rem; color: #dc143c;">🛡️ ${enemy.block}</div>` : ''}
                        <div class="intent-display">
                            💭 ${battle.enemyIntent?.intent || '准备中'}
                        </div>
                    </div>
                </div>
                
                <div class="hand-area">
                    <div class="energy-display">⚡ ${player.currentEnergy}/${player.maxEnergy}</div>
                    <div class="hand-cards" id="handCards">
                        <!-- 卡牌将在这里渲染 -->
                    </div>
                    <div class="action-buttons">
                        <button class="action-btn" id="endTurnBtn" onclick="game.endPlayerTurn()">结束回合</button>
                    </div>
                </div>
            </div>
            
            <div class="info-panel hidden" id="victoryPanel">
                <h2>🎉 战斗胜利！</h2>
                <p id="victoryText"></p>
                <button class="menu-btn" onclick="game.continueAfterBattle()">继续</button>
            </div>
            
            <div class="info-panel hidden" id="defeatPanel">
                <h2>💀 战斗失败</h2>
                <p>你被击败了...</p>
                <button class="menu-btn" onclick="game.returnToMenu()">返回主菜单</button>
            </div>
        `;
        
        this.renderHand(player);
    }
    
    // 渲染手牌
    renderHand(player) {
        const handCardsEl = document.getElementById('handCards');
        if (!handCardsEl) return;
        
        handCardsEl.innerHTML = player.hand.map((card, index) => {
            const cardData = getCard(card.id);
            const cost = Math.max(0, card.cost - player.costReduction);
            const canPlay = player.currentEnergy >= cost;
            
            return `
                <div class="card ${cardData.rarity.toLowerCase()} ${canPlay ? '' : 'disabled'}" 
                     onclick="game.playCard(${index})">
                    <div class="card-cost">${cost}</div>
                    <div class="card-name">${card.name}</div>
                    <div class="card-type">${cardData.type}</div>
                    <div class="card-effect">${cardData.description}</div>
                </div>
            `;
        }).join('');
    }
    
    // 更新状态显示
    updateStatus(player, enemy) {
        // 更新生命值
        const playerHpBars = document.querySelectorAll('.player .hp-fill');
        playerHpBars.forEach(bar => {
            bar.style.width = `${(player.currentHp / player.maxHp) * 100}%`;
        });
        
        const enemyHpBars = document.querySelectorAll('.enemy .hp-fill');
        enemyHpBars.forEach(bar => {
            bar.style.width = `${(enemy.hp / enemy.maxHp) * 100}%`;
        });
        
        // 更新文本
        const playerHpTexts = document.querySelectorAll('.player .hp-text');
        playerHpTexts.forEach(text => {
            text.textContent = `${player.currentHp}/${player.maxHp}`;
        });
        
        const enemyHpTexts = document.querySelectorAll('.enemy .hp-text');
        enemyHpTexts.forEach(text => {
            text.textContent = `${enemy.hp}/${enemy.maxHp}`;
        });
        
        // 更新内力和护甲
        const statusValues = document.querySelectorAll('.status-value');
        if (statusValues.length >= 4) {
            statusValues[0].textContent = `${player.currentHp}/${player.maxHp}`;
            statusValues[1].textContent = player.level;
            statusValues[2].textContent = `${player.currentEnergy}/${player.maxEnergy}`;
            statusValues[3].textContent = player.block;
        }
        
        const energyDisplay = document.querySelector('.energy-display');
        if (energyDisplay) {
            energyDisplay.textContent = `⚡ ${player.currentEnergy}/${player.maxEnergy}`;
        }
        
        // 更新意图
        const intentDisplay = document.querySelector('.intent-display');
        if (intentDisplay && game.battle && game.battle.enemyIntent) {
            intentDisplay.textContent = `💭 ${game.battle.enemyIntent.intent}`;
        }
    }
    
    // 显示胜利面板
    showVictoryPanel(reward) {
        const panel = document.getElementById('victoryPanel');
        const text = document.getElementById('victoryText');
        if (panel && text) {
            text.innerHTML = `
                获得经验：${reward.exp}<br>
                获得金币：${reward.gold}<br>
                ${reward.card ? '获得卡牌奖励！<br>' : ''}
                ${reward.relic ? '获得遗物！' : ''}
            `;
            panel.classList.remove('hidden');
        }
    }
    
    // 显示失败面板
    showDefeatPanel() {
        const panel = document.getElementById('defeatPanel');
        if (panel) {
            panel.classList.remove('hidden');
        }
    }
    
    // 隐藏面板
    hidePanels() {
        const victoryPanel = document.getElementById('victoryPanel');
        const defeatPanel = document.getElementById('defeatPanel');
        if (victoryPanel) victoryPanel.classList.add('hidden');
        if (defeatPanel) defeatPanel.classList.add('hidden');
    }
}
