// src/presentation/GameUI.js

import blessed from 'blessed';

export class GameUI {
    constructor() {
        this.screen = null;
        this.messageBox_ = null;
        this.mapBox_ = null;
        this.statsBox_ = null;
        this.statBoxes_ = [];
        this.messages_ = [];

        this.initScreen();
        this.initBoxes();
        this.setupKeyHandlers();
    }

    initScreen() {
        this.screen = blessed.screen({
            smartCSR: true,
            title: 'Rogue 1980',
        });
        process.stdout.write('\x1B[?25l');
    }

    initBoxes() {
        this.messageBox_ = blessed.box({
            top: 0,
            left: 0,
            width: '100%',
            height: 3,
            content: '',
            tags: true,
            style: {
                fg: 'white',
                bg: 'black'
            }
        });
        
        this.mapBox_ = blessed.box({
            top: 6,
            left: 0,
            width: '100%',
            height: '100%-6',
            content: '',
            tags: true,
            style: {
                fg: 'white',
                bg: 'black'
            },
        });

        this.statsBox_ = blessed.box({
            bottom: 0,
            left: 0,
            width: '100%',
            height: 3,
            tags: true,
            content: '',
            style: {
                fg: 'white',
                bg: 'black'
            }
        });

        this.screen.append(this.messageBox_);
        this.screen.append(this.mapBox_);
        this.screen.append(this.statsBox_);

        const statLabels = ['HP', 'Str', 'Exp', 'Wen', 'Gold', 'Level'];
        const statWidth = Math.floor(100 / 6);

        for (let i = 0; i < 6; i++) {
            const statBox = blessed.box({
                parent: this.statsBox_,
                top: 0,
                left: `${i * statWidth}%`,
                width: `${statWidth}%`,
                height: '100%',
                content: `{center}${statLabels[i]}: ---{/center}`,
                tags: true,
                style: {
                    fg: 'white',
                    bg: 'black'
                }
            });
            this.statBoxes_.push(statBox);
        }
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
        this.screen.program.hideCursor();
        this.screen.render();
    }

    renderMessage() {
        if(this.messages_.length === 0) return;
        
        let message = '';
        const totalMessages = this.messages_.length;
        const itemsPerRow = 3;
        let row = '';
        let rowCount = 0;
        
        for(let i = 0; i < totalMessages; i++) {
            const msg = this.messages_.shift();
            rowCount++;
            
            if(rowCount === itemsPerRow || i === totalMessages - 1) {
                row += msg;
                message += `{center}${row}{/center}\n`;
                row = '';
                rowCount = 0;
            } else {
                row += msg + ' | ';
            }
        }
        
        this.messageBox_.setContent(message);
        this.screen.render();
    }

    renderStats(player) {
        const state = player.getState();
        const { stats } = state;
        
        const hpColor = stats.currentHealth < 4 ? 'red' : 'green';
        this.statBoxes_[0].setContent(
            `{center}HP: {${hpColor}-fg}{bold}${stats.currentHealth}{/bold}{/${hpColor}-fg}/{bold}${stats.maxHealth}{/bold}{/center}`
        );

        this.statBoxes_[1].setContent(
            `{center}Str: {bold}${stats.currentStrength}{/bold}/{bold}${stats.maxStrength}{/bold}{/center}`
        );

        this.statBoxes_[2].setContent(
            `{center}Exp: {magenta-fg}{bold}${stats.experience}{/bold}{/magenta-fg}/{bold}${stats.maxExperience}{/bold}{/center}`
        );

        const weaponText = stats.weapon ? stats.weapon : 'None';
        this.statBoxes_[3].setContent(
            `{center}Wen: {yellow-fg}{bold}${weaponText}{/bold}{/yellow-fg}{/center}`
        );

        this.statBoxes_[4].setContent(
            `{center}Gold: {yellow-fg}{bold}${stats.gold}{/bold}{/yellow-fg}{/center}`
        );

        this.statBoxes_[5].setContent(
            `{center}Level: {cyan-fg}{bold}${stats.level}{/bold}{/cyan-fg}{/center}`
        );

        this.screen.render();
    }
}