// src/domain/services/SaveSystem.js

import fs from 'fs';
import path from 'path';

export class SaveSystem {
    constructor() {
        this.saveFilePath_ = path.join(process.cwd(), 'game_save.json');
        this.scoresFilePath_ = path.join(process.cwd(), 'high_scores.json');
    }

    /**
     * O'yin holatini saqlash
     * @param {Object} gameState - O'yin holati
     */
    saveGame(gameEngine) {
        try {
            const saveData = {
                gameLevel: gameEngine.level_,
                player: gameEngine.player_.getState()
            };

            fs.writeFileSync(
                this.saveFilePath_,
                JSON.stringify(saveData, null, 2),
                'utf8'
            );
            return true;
        } catch (e) {
            console.error('Save error:', e);
            return false;
        }
    }


    /**
     * Saqlangan o'yinni yuklash
     * @returns {Object|null} - Saqlangan holat yoki null
     */
    loadGame() {
        try {
            if (!fs.existsSync(this.saveFilePath_)) {
                return null;
            }

            const data = fs.readFileSync(this.saveFilePath_, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading game:', error);
            return null;
        }
    }

    /**
     * Saqlangan o'yinni o'chirish (player o'lganda)
     */
    deleteSave() {
        try {
            if (fs.existsSync(this.saveFilePath_)) {
                fs.unlinkSync(this.saveFilePath_);
            }
        } catch (error) {
            console.error('Error deleting save:', error);
        }
    }

    /**
     * O'yin natijasini saqlash
     * @param {Object} result - O'yin natijasi
     */
    saveScore(result) {
        try {
            let scores = [];
            
            if (fs.existsSync(this.scoresFilePath_)) {
                const data = fs.readFileSync(this.scoresFilePath_, 'utf8');
                scores = JSON.parse(data);
            }

            scores.push({
                timestamp: new Date().toISOString(),
                level: result.level,
                gold: result.gold,
                isVictory: result.isVictory
            });

            // Gold bo'yicha saralash
            scores.sort((a, b) => b.gold - a.gold);

            // Faqat eng yaxshi 10 natijani saqlash
            scores = scores.slice(0, 10);

            fs.writeFileSync(
                this.scoresFilePath_,
                JSON.stringify(scores, null, 2),
                'utf8'
            );
        } catch (error) {
            console.error('Error saving score:', error);
        }
    }

    /**
     * Eng yaxshi natijalarni olish
     * @returns {Array} - Natijalar ro'yxati
     */
    getHighScores() {
        try {
            if (!fs.existsSync(this.scoresFilePath_)) {
                return [];
            }

            const data = fs.readFileSync(this.scoresFilePath_, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading scores:', error);
            return [];
        }
    }

    /**
     * Saqlangan o'yin bor-yo'qligini tekshirish
     * @returns {boolean}
     */
    hasSavedGame() {
        return fs.existsSync(this.saveFilePath_);
    }
}