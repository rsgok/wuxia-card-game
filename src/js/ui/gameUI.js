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
    
    // 渲染地图
    renderMap(map, mapState, player) {
        const layerData = getMapLayer(mapState.currentLayer);
        
        let mapHTML = `
            <div class="map-screen">
                <div class="map-header">
                    <h2 class="map-title">第 ${mapState.currentLayer} 层 - ${layerData.name}</h2>
                    <p class="map-subtitle">${layerData.description}</p>
                </div>
                <div class="map-container">
        `;
        
        // 渲染地图节点
        map.forEach(column => {
            mapHTML += `<div class="map-column">`;
            column.forEach(node => {
                let icon = '';
                let nodeClass = node.type;
                
                switch (node.type) {
                    case 'battle': icon = '⚔️'; break;
                    case 'elite': icon = '⭐'; break;
                    case 'boss': icon = '👑'; break;
                    case 'shop': icon = '🏪'; break;
                    case 'event': icon = '❓'; break;
                    case 'rest': icon = '⛺'; break;
                    default: icon = '•';
                }
                
                mapHTML += `
                    <div class="map-node ${nodeClass} ${node.locked ? 'locked' : ''}" 
                         onclick="game.selectNode(${JSON.stringify(node).replace(/"/g, '&quot;')})">
                        ${icon}
                    </div>
                `;
            });
            mapHTML += `</div>`;
        });
        
        mapHTML += `
                </div>
                <div style="text-align: center; padding: 1rem;">
                    <p style="color: #ffd700;">💰 金币: ${player ? (game ? game.shopSystem.gold : 0) : 0}</p>
                    <p style="color: #cd853f;">📊 等级: ${player ? player.level : 1}</p>
                </div>
            </div>
        `;
        
        this.app.innerHTML = mapHTML;
    }
    
    // 渲染商店
    renderShop(shopState) {
        let shopHTML = `
            <div class="shop-screen">
                <div class="shop-header">
                    <h2 style="color: #ffd700;">🏪 江湖客栈</h2>
                    <p class="shop-gold">💰 金币: ${shopState.gold}</p>
                </div>
                <div class="shop-items">
        `;
        
        // 渲染卡牌
        shopState.items.filter(item => item.type === 'card').forEach((item, index) => {
            const card = item.data;
            shopHTML += `
                <div class="shop-item ${item.sold ? 'sold' : ''}">
                    <div class="shop-item-header">
                        <span class="shop-item-name">${card.name}</span>
                        <span class="shop-item-price">${item.price} 💰</span>
                    </div>
                    <div class="shop-item-content">
                        <p class="shop-item-description">${card.description}</p>
                        <div class="shop-item-card">类型: ${card.type} | 稀有度: ${card.rarity}</div>
                    </div>
                    <div class="shop-item-action">
                        <button class="shop-btn" ${item.sold ? 'disabled' : ''} onclick="game.buyItem('card', ${index})">
                            ${item.sold ? '已售出' : '购买'}
                        </button>
                    </div>
                </div>
            `;
        });
        
        // 渲染遗物
        shopState.items.filter(item => item.type === 'relic').forEach((item, index) => {
            const relic = item.data;
            shopHTML += `
                <div class="shop-item ${item.sold ? 'sold' : ''}">
                    <div class="shop-item-header">
                        <span class="shop-item-name">${relic.name}</span>
                        <span class="shop-item-price">${item.price} 💰</span>
                    </div>
                    <div class="shop-item-content">
                        <p class="shop-item-description">${relic.description}</p>
                        <div class="shop-item-relic">稀有度: ${relic.rarity}</div>
                    </div>
                    <div class="shop-item-action">
                        <button class="shop-btn" ${item.sold ? 'disabled' : ''} onclick="game.buyItem('relic', ${index})">
                            ${item.sold ? '已售出' : '购买'}
                        </button>
                    </div>
                </div>
            `;
        });
        
        // 渲染服务
        shopState.items.filter(item => item.type === 'service').forEach((item, index) => {
            const service = item.data;
            shopHTML += `
                <div class="shop-item ${item.sold ? 'sold' : ''}">
                    <div class="shop-item-header">
                        <span class="shop-item-name">${service.name}</span>
                        <span class="shop-item-price">${service.price} 💰</span>
                    </div>
                    <div class="shop-item-content">
                        <p class="shop-item-description">从你的卡组中移除一张卡牌</p>
                    </div>
                    <div class="shop-item-action">
                        <button class="shop-btn" ${item.sold ? 'disabled' : ''} onclick="game.buyItem('service', ${index})">
                            ${item.sold ? '已使用' : '购买'}
                        </button>
                    </div>
                </div>
            `;
        });
        
        shopHTML += `
                </div>
                <div style="text-align: center; padding: 1rem;">
                    <button class="action-btn" onclick="game.leaveShop()">离开商店</button>
                </div>
            </div>
        `;
        
        this.app.innerHTML = shopHTML;
    }
    
    // 显示卡牌移除界面
    showCardRemoval(deck) {
        const modal = document.createElement('div');
        modal.className = 'info-panel';
        modal.innerHTML = `
            <h2>选择要移除的卡牌</h2>
            <div class="reward-cards" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
                ${deck.map(cardId => {
                    const card = getCard(cardId);
                    if (!card) return '';
                    return `
                        <div class="card ${card.rarity.toLowerCase()}" onclick="game.removeCard('${cardId}'); this.parentElement.parentElement.remove();">
                            <div class="card-cost">${card.cost}</div>
                            <div class="card-name">${card.name}</div>
                            <div class="card-type">${card.type}</div>
                            <div class="card-effect">${card.description}</div>
                        </div>
                    `;
                }).join('')}
            </div>
            <button class="menu-btn" onclick="this.parentElement.remove()">取消</button>
        `;
        this.app.appendChild(modal);
    }
    
    // 渲染事件
    renderEvent(event) {
        if (!event) return;
        
        let eventHTML = `
            <div class="event-screen">
                <div class="event-card">
                    <h2 class="event-title">${event.name}</h2>
                    <p class="event-description">${event.description}</p>
                    <div class="event-choices">
        `;
        
        event.choices.forEach((choice, index) => {
            eventHTML += `
                <button class="event-choice" onclick="game.makeEventChoice(${index})">
                    ${choice.text}
                </button>
            `;
        });
        
        eventHTML += `
                    </div>
                </div>
            </div>
        `;
        
        this.app.innerHTML = eventHTML;
    }
    
    // 渲染休息点
    renderRest(player) {
        let restHTML = `
            <div class="event-screen">
                <div class="event-card">
                    <h2 class="event-title">🛏️ 休息一下</h2>
                    <p class="event-description">你找到了一个安全的休息处，可以休息恢复体力，或者修炼武学。</p>
                    <div class="event-choices">
                        <button class="event-choice" onclick="game.selectRestOption('heal')">
                            休息（恢复 30% 生命值）
                        </button>
                        <button class="event-choice" onclick="game.selectRestOption('upgrade')">
                            修炼（升级一张卡牌）
                        </button>
                        <button class="event-choice" onclick="game.selectRestOption('skip')">
                            继续前进
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.app.innerHTML = restHTML;
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
                <button class="menu-btn" onclick="game.returnToMap()">返回地图</button>
            </div>
            
            <div class="reward-panel hidden" id="rewardPanel">
                <h2>选择一张卡牌加入卡组</h2>
                <div class="reward-cards" id="rewardCards">
                    <!-- 奖励卡牌将在这里渲染 -->
                </div>
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
    
    // 显示奖励面板
    showRewardPanel(reward, rewardCards) {
        const panel = document.getElementById('rewardPanel');
        const cardsContainer = document.getElementById('rewardCards');
        const victoryPanel = document.getElementById('victoryPanel');
        
        if (panel && cardsContainer) {
            panel.classList.remove('hidden');
            
            if (rewardCards) {
                // 显示卡牌选择
                cardsContainer.innerHTML = rewardCards.map((card, index) => `
                    <div class="card ${card.rarity.toLowerCase()}" onclick="game.selectRewardCard(${index}, ${JSON.stringify(rewardCards).replace(/"/g, '&quot;')})">
                        <div class="card-cost">${card.cost}</div>
                        <div class="card-name">${card.name}</div>
                        <div class="card-type">${card.type}</div>
                        <div class="card-effect">${card.description}</div>
                    </div>
                `).join('');
            } else {
                // 显示其他奖励
                panel.innerHTML = `
                    <h2>🎉 战斗胜利！</h2>
                    <p>获得经验：${reward.exp || 0}</p>
                    ${reward.gold ? `<p>获得金币：${reward.gold}</p>` : ''}
                    ${reward.heal ? `<p>回复生命：${reward.heal}</p>` : ''}
                    ${reward.relic ? `<p>获得遗物：${reward.relic.name}</p>` : ''}
                    <button class="menu-btn" onclick="game.returnToMap()">继续</button>
                `;
            }
        }
        
        if (victoryPanel) victoryPanel.classList.add('hidden');
    }
    
    // 显示胜利面板（Boss 战）
    showVictoryPanel(reward, hasMoreLayers) {
        const panel = document.getElementById('victoryPanel');
        if (panel) {
            panel.classList.remove('hidden');
            const text = panel.querySelector('#victoryText');
            if (text) {
                text.innerHTML = `
                    获得经验：${reward.exp || 0}<br>
                    获得金币：${reward.gold || 0}<br>
                    ${reward.relic ? `获得遗物：${reward.relic.name}<br>` : ''}
                    ${hasMoreLayers ? '<p style="margin-top: 1rem; color: #ffd700;">准备进入下一层...</p>' : '<p style="margin-top: 1rem; color: #ffd700;">🎉 恭喜通关！</p>'}
                `;
            }
        }
        
        this.hidePanel('rewardPanel');
        this.hidePanel('defeatPanel');
    }
    
    // 显示失败面板
    showDefeatPanel() {
        const panel = document.getElementById('defeatPanel');
        if (panel) panel.classList.remove('hidden');
        
        this.hidePanel('victoryPanel');
        this.hidePanel('rewardPanel');
    }
    
    // 隐藏面板
    hidePanel(panelId) {
        const panel = document.getElementById(panelId);
        if (panel) panel.classList.add('hidden');
    }
    
    // 隐藏所有面板
    hidePanels() {
        this.hidePanel('victoryPanel');
        this.hidePanel('defeatPanel');
        this.hidePanel('rewardPanel');
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
        if (intentDisplay && game && game.battle && game.battle.enemyIntent) {
            intentDisplay.textContent = `💭 ${game.battle.enemyIntent.intent}`;
        }
    }
}
