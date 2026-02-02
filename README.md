# The Gang - Vault Heist Tracker

A digital companion app for [The Gang](https://boardgamegeek.com/boardgame/278951/gang) cooperative poker board game. Track vaults, alarms, and challenge cards as you plan the perfect heist.

## Features

- **Multiple Game Modes**: Standard, Never Ending, Professional, and Master Thief
- **Card Management**: Browse and select from all 10 Challenge and 10 Specialist cards
- **Game State Tracking**: Automatically tracks vaults opened, alarms triggered, and active cards
- **Card Randomization**: Optional random or sequential card drawing
- **Responsive Design**: Beautiful dark theme with amber accents
- **Persistent State**: Game state saves automatically (localStorage)

## Game Modes

### Standard Mode
The classic experience from the rulebook.
- **Win condition**: Open 3 vaults
- **Lose condition**: Trigger 3 alarms
- **On success**: Draw one Challenge card (sequential or random)
- **On failure**: Draw one Specialist card (sequential or random)

### Never Ending Mode
Keep playing until you lose!
- **No vault limit**: Play indefinitely
- **Lose condition**: Trigger 3 alarms
- **On success**: Add a random Challenge card (no duplicates)
- **On failure**: Add a random Specialist card (no duplicates)
- **Hard mode option**: Disable Specialist cards for increased difficulty

### Professional Mode
For experienced crews ready for a tougher challenge.
- **Win condition**: Open 3 vaults
- **Lose condition**: Trigger 3 alarms
- **Permanent Challenge**: One Challenge card is locked in place for the entire game
- **Rotating Challenge**: Second Challenge card rotates with each vault opened
- **Specialist limit**: Only 1 Specialist card active at a time (replaces previous)
- **Restricted card**: Quick Access (Card #1) is unavailable

### Master Thief Mode
The ultimate test of skill.
- **Win condition**: Open 3 vaults
- **Lose condition**: Trigger only 2 alarms (stricter!)
- **3 Active Challenges**: Start with 2 locked Challenge cards, add a 3rd that rotates
- **No Specialists**: No Specialist cards available
- **Restricted card**: Quick Access (Card #1) is unavailable

## Installation

```bash
# Clone the repository
git clone https://github.com/davotronic5000/gang-app.git
cd gang-app

# Install dependencies
npm install
# or
pnpm install

# Run the development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Play

1. **Select Game Mode**: Choose from Standard, Never Ending, Professional, or Master Thief
2. **Configure Options**: Set card randomization (Standard) or difficulty (Never Ending)
3. **Start Game**: Click "Start Game" to begin tracking your heist
4. **Track Progress**:
   - Click **"Open Vault"** when the crew successfully completes a heist
   - Click **"Trigger Alarm"** when the crew fails and raises suspicion
5. **Manage Cards**:
   - View active Challenge cards (amber/yellow) and Specialist cards (green)
   - Click **"View Card Library"** to browse all available cards
   - Manually select cards from the library if needed
   - Remove cards by clicking the X button
6. **Win or Lose**: The game automatically detects victory or defeat conditions
7. **Reset**: Click "Reset Game" to start over or "Change Mode" to try a different mode

## Card Types

### Challenge Cards (10 total)
Yellow/amber cards that make heists more difficult:
1. Quick Access
2. Hasty Getaway
3. Bad Reputation
4. Inside Job
5. Poker Pro
6. Against Time
7. Expert Eyes
8. All In
9. Ruthless
10. Crowd of Onlookers

### Specialist Cards (10 total)
Green cards that provide special abilities to help the crew:
1. Informant
2. Hacker
3. Lookout
4. Pickpocket
5. Explosives Expert
6. Impersonator
7. Burglar
8. Conman
9. Safecracker
10. Inside Man

## Technical Details

- **Framework**: Next.js 16.1.6 with React 19
- **Styling**: Tailwind CSS v3 (via CDN)
- **TypeScript**: Full type safety
- **State Management**: React hooks with localStorage persistence
- **Build Tool**: Turbopack

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Known Issues

- Using Tailwind CDN instead of PostCSS build due to Turbopack compatibility issues with Tailwind v4

## Credits

Based on [The Gang](https://boardgamegeek.com/boardgame/278951/gang) board game by Yeon-Min Jung, published by KOSMOS.

## License

This is a fan-made companion app for personal use. The Gang is a trademark of KOSMOS.
