// src/presentation/GameUI.js

import blessed from 'blessed';

export class GameUI {
    constructor() {
        this.screen = null;
        this.mapBox = null;
        this.statsBox = null;
        this.messageBox = null;
        this.initScreen();
    }

    initScreen() {
        // Asosiy ekranni yaratish
        this.screen = blessed.screen({
            smartCSR: true,  // Ekranni samarali yangilash
            title: 'Rogue 1980'
        });

        // ESC tugmasi bosilganda o'yindan chiqish
        this.screen.key(['escape', 'q', 'C-c'], () => {
            return process.exit(0);
        });

        this.createMapBox();
        this.createStatsBox();
        this.createMessageBox();

        this.screen.render();
    }

    createMapBox() {
        // O'yin xaritasi uchun box
        this.mapBox = blessed.box({
            top: 0,
            left: 0,
            width: '70%',
            height: '80%',
            content: '',
            tags: true,
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                bg: 'black',
                border: {
                    fg: '#f0f0f0'
                }
            },
            label: ' Map ',
            scrollable: true,
            alwaysScroll: true,
            scrollbar: {
                ch: ' ',
                track: {
                    bg: 'cyan'
                },
                style: {
                    inverse: true
                }
            }
        });

        this.screen.append(this.mapBox);
    }

    createStatsBox() {
        // O'yinchi statistikasi uchun box
        this.statsBox = blessed.box({
            top: 0,
            left: '70%',
            width: '30%',
            height: '80%',
            content: '',
            tags: true,
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                bg: 'black',
                border: {
                    fg: '#f0f0f0'
                }
            },
            label: ' Stats '
        });

        this.screen.append(this.statsBox);
    }

    createMessageBox() {
        // Xabarlar uchun box (pastda)
        this.messageBox = blessed.box({
            top: '80%',
            left: 0,
            width: '100%',
            height: '20%',
            content: 'Welcome to Rogue!\nUse arrow keys to move, ESC to quit.',
            tags: true,
            border: {
                type: 'line'
            },
            style: {
                fg: 'yellow',
                bg: 'black',
                border: {
                    fg: '#f0f0f0'
                }
            },
            label: ' Messages '
        });

        this.screen.append(this.messageBox);
    }

    renderRoom(room) {
        let roomStr = '';
        
        for (let y = 0; y < room.height_; y++) {
            for (let x = 0; x < room.width_; x++) {
                // Border yaratish
                if (y === 0 || y === room.height_ - 1) {
                    roomStr += '-';
                } else if (x === 0 || x === room.width_ - 1) {
                    roomStr += '|';
                } else {
                    roomStr += '.';  // Bo'sh joy
                }
            }
            roomStr += '\n';
        }

        this.mapBox.setContent(roomStr);
        this.screen.render();
    }

    renderMap(map, player, enemies, weapons) {
        // Hozircha birinchi xonani ko'rsatamiz
        const currentRoom = map.notViewRooms[0];
        let mapStr = '';

        for (let y = 0; y < currentRoom.height_; y++) {
            for (let x = 0; x < currentRoom.width_; x++) {
                let char = '.';

                // Border
                if (y === 0 || y === currentRoom.height_ - 1) {
                    char = '-';
                } else if (x === 0 || x === currentRoom.width_ - 1) {
                    char = '|';
                }

                // Player
                if (player.x === x && player.y === y) {
                    char = '{yellow-fg}@{/yellow-fg}';  // @ - player
                }

                // Enemies
                enemies.forEach(enemy => {
                    if (enemy.x === x && enemy.y === y) {
                        char = `{red-fg}${this.getEnemyChar(enemy.type)}{/red-fg}`;
                    }
                });

                // Weapons
                weapons.forEach(weapon => {
                    if (weapon.x === x && weapon.y === y) {
                        char = '{green-fg}){/green-fg}';  // ) - weapon
                    }
                });

                mapStr += char;
            }
            mapStr += '\n';
        }

        this.mapBox.setContent(mapStr);
        this.screen.render();
    }

    getEnemyChar(type) {
        const chars = {
            'bat': 'B',
            'snake': 'S',
            'emu': 'E',
            'rattlesnake': 'R'
        };
        return chars[type] || 'M';
    }

    renderStats(player) {
        const stats = player.getState();
        const content = `
Player Stats
━━━━━━━━━━━━

Health: ${stats.stats.currentHealth}/${stats.stats.maxHealth}
Strength: ${stats.stats.currentStrength}/${stats.stats.maxStrength}
Gold: ${stats.stats.gold}

Position: (${stats.position.x}, ${stats.position.y})

Weapon: ${player.equippedWeapon ? player.equippedWeapon.type : 'None'}

━━━━━━━━━━━━
Controls:
↑↓←→ - Move
ESC - Quit
        `;

        this.statsBox.setContent(content);
        this.screen.render();
    }

    showMessage(message) {
        const current = this.messageBox.getContent();
        const lines = current.split('\n');
        
        // Faqat oxirgi 5 ta xabarni saqlash
        if (lines.length > 5) {
            lines.shift();
        }
        
        lines.push(message);
        this.messageBox.setContent(lines.join('\n'));
        this.screen.render();
    }

    refresh() {
        this.screen.render();
    }
}