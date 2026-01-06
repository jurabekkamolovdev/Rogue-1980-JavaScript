# 🎮 Rogue Console Game (Clean Architecture)

Bu loyiha **Node.js** va **blessed** kutubxonasi yordamida yozilgan **konsol rogue-like o‘yini** bo‘lib,  
u **Clean Architecture** tamoyillariga asoslangan.

---

## 🧱 Arxitektura Qatlamlari

### 1️⃣ Presentation Layer (Ko‘rinish qatlami)

Bu qatlam foydalanuvchi bilan to‘g‘ridan-to‘g‘ri aloqa qiladi:

- `blessed` kutubxonasi yordamida konsolda UI chizish  
- Klaviatura kiritishlarini qabul qilish  
- O‘yin holatini ekranga chiqarish  

#### Misol:
```js
// GameView.js
class GameView {
  constructor(screen) {
    this.screen = screen;
  }

  render(gameState) {
    // Xarita, o'yinchi, dushmanlarni ekranga chizish
  }

  handleInput(callback) {
    // Klaviatura hodisalarini tinglash
  }
}
