// src/presentation/GameUI.js

import blessed from 'blessed'

export class GameUI {
    constructor() {
        this.screen = null;
        this.messageBox_ = null;
        this.mapBox_ = null;
        this.statsBox_ = null;
        this.statBoxes_ = [];
        // this.startBox_ = null;

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
        })

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
        })

        this.statsBox_ = blessed.box({
            top: '90%',
            left: 0,
            width: '100%',
            height: '10%',
            tags: true,
            style: {
                fg: 'white',
                bg: 'black',
                border: {
                    fg: 'yellow'
                }
            },
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

    renderMessage() {
        this.messageBox_.setContent(`{cem}Hello`);
        this.screen.render();
    }
}