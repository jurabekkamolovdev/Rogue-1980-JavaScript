// src/presentation/GameUI.js

import blessed from 'blessed'

export class GameUI {
    constructor() {
        this.screen = null;
        this.messageBox_ = null;
        this.mapBox_ = null;
        this.statsBox_ = null;

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
            style: {
                fg: 'white',
                bg: 'black',
                border: {
                    fg: 'cyan'
                }
            }
        });

        this.statsBox_ = blessed.box({
            top: '90%',
            left: 0,
            width: '100%',
            height: '10%',
            tags: true,
            content: '',
            style: {
                fg: 'white',
                bg: 'black',
                border: {
                    fg: 'yellow'
                }
            }
        });

        this.screen.append(this.messageBox_);
        this.screen.append(this.mapBox_);
        this.screen.append(this.statsBox_);
    }

    setupKeyHandlers() {
        this.screen.key(['escape', 'q', 'C-c'], () => {
            return process.exit(0);
        });
    }

    renderMap(map) {
        let mapContent = '';
        for(let i = 0; i < map.length; i++) {
            let line = '';
            const array = map[i];
            for(let j = 0; j < array.length; j++) {
                line += array[j];
            }
            mapContent += line + '\n';
        }
        this.mapBox_.setContent(mapContent);
        this.screen.render();
    }

    renderMessage(message) {
        this.messageBox_.setContent(`{center}${message}{/center}`);
        this.screen.render();
    }

    renderStats(player) {
        const state = player.getState();
        const { stats } = state;
        
        // HP
        const hpColor = stats.currentHealth < 4 ? 'red' : 'green';
        const hpText = `HP: {${hpColor}-fg}{bold}${stats.currentHealth}{/bold}{/${hpColor}-fg}/{bold}${stats.maxHealth}{/bold}`;

        // Kuch
        const strText = `Str: {bold}${stats.currentStrength}{/bold}/{bold}${stats.maxStrength}{/bold}`;

        // Qurol
        const weaponText = stats.weapon ? stats.weapon : 'Yo\'q';
        const weaponDisplay = `Weapon: {yellow-fg}{bold}${weaponText}{/bold}{/yellow-fg}`;

        // Oltin
        const goldDisplay = `Gold: {yellow-fg}{bold}${stats.gold}{/bold}{/yellow-fg}`;

        // Daraja
        const levelDisplay = `Level: {cyan-fg}{bold}${stats.level}{/bold}{/cyan-fg}`;

        // Tajriba
        const expDisplay = `Exp: {magenta-fg}{bold}${stats.experience}{/bold}{/magenta-fg}/{bold}${stats.maxExperience}{/bold}`;

        // Barcha ma'lumotlarni bitta qatorda ko'rsatish
        const statsContent = `  ${hpText}  |  ${strText}  |  ${weaponDisplay}  |  ${goldDisplay}  |  ${levelDisplay}  |  ${expDisplay}  `;

        this.statsBox_.setContent(statsContent);
        this.screen.render();
    }
}