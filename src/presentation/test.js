// src/presentation/GameUI.js

import blessed from 'blessed';

export class GameUI {
    constructor() {
        this.screen = null;
        this.messageBox_ = null;
        this.mapBox_ = null;
        this.statsBox_ = null;
        this.statBoxes_ = [];
        
        this.initScreen();
        this.initBoxes();
        this.setupKeyHandlers();
    }

    initScreen() {
        this.screen = blessed.screen({
            smartCSR: true,
            title: 'Rogue 1980'
        });
    }

    initBoxes() {
        this.messageBox_ = blessed.box({
            top: 0,
            left: 0,
            width: '100%',
            height: '10%',
            content: '',
            tags: true,
            // border: {
            //     type: 'line'
            // },
            style: {
                fg: 'white',
                bg: 'black',
                border: {
                    fg: 'cyan'
                }
            }
        });

        this.mapBox_ = blessed.box({
            top: '10%',
            left: 0,
            width: '100%',
            height: '80%',
            content: '',
            tags: true,
            // border: {
            //     type: 'line'
            // },
            // style: {
            //     fg: 'black',
            //     bg: 'white',
            //     border: {
            //         fg: 'green'
            //     }
            // },
            // label: ' Xarita ',
            // scrollable: false
        });
        this.statsBox_ = blessed.box({
            top: '90%',
            left: 0,
            width: '100%',
            height: '10%',
            style: {
                fg: 'white',
                bg: 'black',
                border: {
                    fg: 'yellow'
                }
            },
        });

        // Stats ichida 5 ta box (row layout)
        const statLabels = ['HP', 'Str', 'Wen', 'Gold', 'Level'];
        const statWidth = Math.floor(100 / 5);

        for (let i = 0; i < 5; i++) {
            const statBox = blessed.box({
                parent: this.statsBox_,
                top: 0,
                left: `${i * statWidth}%`,
                width: `${statWidth}%`,
                height: '100%',
                content: `{center}${statLabels[i]}\n---{/center}`,
                tags: true,
                style: {
                    fg: 'white',
                    bg: 'black'
                },
                border: {
                    type: 'line',
                    fg: 'gray'
                }
            });
            this.statBoxes_.push(statBox);
        }

        // Add all boxes to screen
        this.screen.append(this.messageBox_);
        this.screen.append(this.mapBox_);
        this.screen.append(this.statsBox_);
    }

    setupKeyHandlers() {
        // Quit on Escape, q, or Control-C
        this.screen.key(['escape', 'q', 'C-c'], () => {
            return process.exit(0);
        });
    }

    /**
     * Message box'ga yangi xabar qo'yish
     * @param {string} message 
     */
    showMessage(message) {
        this.messageBox_.setContent(`{center}${message}{/center}`);
        this.screen.render();
    }

    /**
     * Map'ni render qilish
     * @param {Object} map - Map obyekti
     * @param {Object} player - Player obyekti
     * @param {Array} enemies - Enemies array
     * @param {Array} weapons - Weapons array
     */
    renderMap(map, player, enemies, weapons) {
        const room = map.notViewRooms[0];
        let mapContent = '';

        for (let y = 0; y < room.height; y++) {
            let line = '';
            for (let x = 0; x < room.width; x++) {
                if(y === 0 || y === room.height - 1) {
                    line += '{white-fg}-{/white-fg}';
                } else if(x === 0 || x === room.width - 1) {
                    line += '{white-fg}|{/white-fg}';
                }
                else if (player.x === x && player.y === y) {
                    line += '{green-fg}{bold}@{/bold}{/green-fg}';
                }
                else if (enemies.some(e => e.x === x && e.y === y)) {
                    const enemy = enemies.find(e => e.x === x && e.y === y);
                    line += this.getEnemySymbol(enemy.type);
                }
                else if (weapons.some(w => w.x === x && w.y === y)) {
                    line += '{yellow-fg}){/yellow-fg}';
                }
                else {
                    line += '.';
                }
            }
            mapContent += line + '\n';
        }

        this.mapBox_.setContent(mapContent);
        this.screen.render();
    }

    /**
     * Enemy turini belgilaydi
     * @param {string} enemyType 
     * @returns {string}
     */
    getEnemySymbol(enemyType) {
        const symbols = {
            'zombie': '{red-fg}Z{/red-fg}',
            'vampire': '{magenta-fg}V{/magenta-fg}',
            'ghost': '{white-fg}G{/white-fg}',
            'ogre': '{red-fg}{bold}O{/bold}{/red-fg}',
            'snake': '{green-fg}S{/green-fg}'
        };
        return symbols[enemyType] || '{red-fg}E{/red-fg}';
    }

    /**
     * Player statistikasini yangilash
     * @param {Object} player 
     */
    renderStats(player) {
        const state = player.getState();
        const { stats } = state;
        
        // HP
        const hpColor = stats.currentHealth < 4 ? 'red' : 'green';
        this.statBoxes_[0].setContent(
            `{center}HP\n{${hpColor}-fg}{bold}${stats.currentHealth}{/bold}{/${hpColor}-fg}/{bold}${stats.maxHealth}{/bold}{/center}`
        );

        // Kuch
        this.statBoxes_[1].setContent(
            `{center}Str\n{bold}${stats.currentStrength}{/bold}/{bold}${stats.maxStrength}{/bold}{/center}`
        );

        // Qurol (equipped weapon)
        const weaponText = player.equippedWeapon ? player.equippedWeapon.type : 'Yo\'q';
        this.statBoxes_[2].setContent(
            `{center}Weapon\n{yellow-fg}{bold}${weaponText}{/bold}{/yellow-fg}{/center}`
        );

        // Oltin
        this.statBoxes_[3].setContent(
            `{center}Gold\n{yellow-fg}{bold}${stats.gold}{/bold}{/yellow-fg}{/center}`
        );

        // Daraja (level) - hozircha 1
        this.statBoxes_[4].setContent(
            `{center}Level\n{cyan-fg}{bold}1{/bold}{/cyan-fg}{/center}`
        );

        this.screen.render();
    }

    /**
     * Ekranni yangilash
     */
    render() {
        this.screen.render();
    }

    /**
     * UI'ni to'xtatish
     */
    destroy() {
        if (this.screen) {
            this.screen.destroy();
        }
    }
}