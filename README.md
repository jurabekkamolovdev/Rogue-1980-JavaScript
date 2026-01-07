# 🎮 Rogue Game - Classic Dungeon Crawler

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

> Classic 1980 Rogue game implementation in JavaScript ES14 with Clean Architecture

## 📖 Haqida

Bu loyiha 1980-yilda yaratilgan mashhur **Rogue** o'yinining zamonaviy JavaScript implementatsiyasi. O'yin console interfeysi orqali ishlaydi va to'liq klaviatura bilan boshqariladi.

### ✨ Asosiy Xususiyatlar

- 🏰 Procedural dungeon generation - har safar yangi xarita
- ⚔️ Turn-based combat sistema
- 🎒 Inventory management tizimi
- 📊 RPG elementlari (HP, Strength, Experience)
- 💾 O'yin holatini saqlash
- 🎯 Roguelike mexanikalari
- 🏗️ Clean Architecture printsiplari

## 🏛️ Arxitektura

Loyiha uch qatlamli Clean Architecture printsipiga asoslanadi:

```
┌─────────────────────────────────────────────────────┐
│           PRESENTATION LAYER (UI)                   │
│  - Views: Ekranga chizish                          │
│  - Controllers: Input handling                      │
│  - blessed library integration                      │
└────────────────────┬────────────────────────────────┘
                     │ Interface
┌────────────────────▼────────────────────────────────┐
│           DOMAIN LAYER (Business Logic)             │
│  - Entities: Player, Enemy, Item, Level            │
│  - Services: GameEngine, CombatService             │
│  - Pure JavaScript, framework-agnostic             │
└────────────────────┬────────────────────────────────┘
                     │ Repository Interface
┌────────────────────▼────────────────────────────────┐
│           DATA LAYER (Persistence)                  │
│  - GameStateRepository                             │
│  - HistoryRepository                               │
│  - JSON file storage                               │
└─────────────────────────────────────────────────────┘
```

### 📁 Fayl Strukturasi

```
Rogue-1980-JavaScript/
├── src/
│   ├── domain/              # Business Logic Layer
│   │   ├── entities/
│   │   │   ├── Player.js    # O'yinchi klassi
│   │   │   ├── Enemy.js     # Dushman klassi
│   │   │   ├── Item.js      # Predmet klassi
│   │   │   ├── Level.js     # Daraja klassi
│   │   │   └── Map.js       # Xarita klassi
│   │   └── services/
│   │       ├── GameEngine.js      # Asosiy o'yin mantiq
│   │       ├── CombatService.js   # Jang tizimi
│   │       ├── ItemService.js     # Predmetlar tizimi
│   │       └── LevelGenerator.js  # Daraja generator
│   │
│   ├── presentation/        # UI Layer
│   │   ├── views/
│   │   │   ├── GameView.js        # Asosiy o'yin view
│   │   │   ├── MenuView.js        # Menyu view
│   │   │   └── InventoryView.js   # Inventar view
│   │   └── controllers/
│   │       └── InputController.js # Klaviatura input
│   │
│   ├── data/               # Data Access Layer
│   │   ├── repositories/
│   │   │   ├── GameStateRepository.js
│   │   │   └── HistoryRepository.js
│   │   └── storage/
│   │       └── saves/      # Saqlangan o'yinlar
│   │
│   ├── utils/              # Yordamchi funksiyalar
│   │   └── helpers.js
│   │
│   └── index.js           # Entry point
│
├── tests/                 # Test fayllari
├── docs/                  # Dokumentatsiya
├── package.json
├── .gitignore
└── README.md
```

## 🚀 O'rnatish

### Talablar

- Node.js >= 14.0.0
- npm yoki yarn

### Qadamma-qadam

1. **Repository'ni clone qiling:**
```bash
git clone https://github.com/jurabekkamolovdev/Rogue-1980-JavaScript
cd Rogue-1980-JavaScript
```

2. **Dependencies o'rnating:**
```bash
npm install
```

3. **O'yinni ishga tushiring:**
```bash
npm start
```

## 🎮 O'ynash Qoidalari

### Boshqaruv

| Tugma | Harakat |
|-------|---------|
| `↑ ↓ ← →` yoki `W A S D` | Harakat |
| `i` | Inventory ochish |
| `e` | Predmetdan foydalanish |
| `Esc` | Menyu/Orqaga |
| `q` | O'yindan chiqish |

### O'yin Mexanikalari

#### Statistika
- **HP (Health Points)**: Sog'lik ko'rsatkichi
- **Strength**: Kuch darajasi
- **Experience**: Tajriba darajasi

#### Predmetlar
- **Potions**: HP yoki Strength oshiradi
- **Scrolls**: Turli effektlar (ba'zilari cursed)
- **Weapons**: Hujum kuchini oshiradi
- **Armor**: Himoyani oshiradi
- **Food**: Ochlikdan saqlanish

#### Dushmanlar
Har darajada turli xil dushmanlar mavjud. Pastga tushgan sari dushmanlar kuchliroq bo'ladi.

## 🔧 Development

### Yangi feature qo'shish

1. Domain layer'da logic yozing
2. Presentation layer'da UI yarating
3. Data layer'da kerak bo'lsa persistence qo'shing

### Test yozish

```bash
npm test
```

### Kod formatlash

```bash
npm run lint
```

## 📝 Code Style

- ES14 sintaksisidan foydalaning
- Clean Code printsiplarini qo'llang
- SOLID printsiplarini rioya qiling
- Dependency Injection ishlating

## 🤝 Contributing

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. Commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request oching

## 📜 License

MIT License. Batafsil ma'lumot uchun [LICENSE](LICENSE) faylini ko'ring.

## 👥 Muallif

**Sizning Ismingiz**
- GitHub: [@jurabekkamolovdev](https://github.com/jurabekkamolovdev)

## 🙏 Minnatdorchilik

- Original Rogue game creators (1980)
- blessed.js library authors
- Barcha contributors

## 📚 Qo'shimcha Resurslar

- [Original Rogue Documentation](https://docs.freebsd.org/44doc/usd/30.rogue/paper.pdf)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [blessed.js Documentation](https://github.com/chjj/blessed)

---

⭐ Agar loyiha yoqsa, star bering!

🐛 Bug topsangiz, issue oching!

💡 Fikr-mulohazangiz bo'lsa, yozing!