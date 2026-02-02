# Changelog

All notable changes to The Gang Vault Heist Tracker will be documented in this file.

## [1.3.0] - 2026-02-02

### Fixed
- Professional Mode now correctly limits to max 2 Challenge cards (1 locked, 1 rotating)
- Professional Mode now correctly limits to 1 Specialist card at a time (replaces previous)
- Master Thief Mode now correctly implements 3 Challenge cards (2 locked at start, 3rd rotating)
- Quick Access (Challenge Card #1) now properly removed from card library in Professional and Master Thief modes
- Layout no longer jumps when switching between game modes in setup screen

### Changed
- Professional Mode: Single Specialist card replaces previous instead of accumulating
- Master Thief Mode: Correctly starts with 2 locked challenges, adds rotating 3rd
- Game setup UI uses fixed-height container with opacity transitions for smoother mode switching

## [1.2.0] - 2026-01-31

### Added
- Professional Mode game variant
  - One permanent Challenge card locked for entire game
  - Max 2 Challenge cards (1 locked, 1 rotating)
  - Only 1 Specialist card at a time
  - Win at 3 vaults, lose at 3 alarms
  - Quick Access card unavailable
- Master Thief Mode game variant
  - Start with 2 locked Challenge cards
  - Add 3rd rotating Challenge card with each vault
  - No Specialist cards available
  - Win at 3 vaults, lose at only 2 alarms
  - Quick Access card unavailable

### Changed
- Alarm tracker dynamically shows 2 or 3 alarms based on game mode
- Game setup screen displays mode-specific rules
- Card library filters cards based on active game mode

## [1.1.0] - 2026-01-30

### Added
- Card randomization option for Standard Mode
  - Choose between sequential (1, 2, 3...) or random card drawing
  - Toggle switch in game setup with visual indicators

### Changed
- Game setup UI reorganized with mode-specific options
- Enhanced visual feedback for selected options

## [1.0.1] - 2026-01-29

### Fixed
- localStorage SSR (Server-Side Rendering) error for Vercel deployment
- Added proper client-side checks before accessing localStorage
- Improved hydration handling for saved game state

## [1.0.0] - 2026-01-28

### Added
- Initial release of The Gang Vault Heist Tracker
- Standard Mode implementation
  - Track up to 3 vaults and 3 alarms
  - Sequential Challenge and Specialist card drawing
  - Win/lose condition detection
- Never Ending Mode implementation
  - Unlimited vaults
  - Random Challenge card stacking (no duplicates)
  - Random Specialist card stacking (no duplicates)
  - Hard mode option (no Specialist cards)
- Complete card database
  - All 10 Challenge cards with official names and descriptions
  - All 10 Specialist cards with official names and descriptions
- Card Library UI
  - Browse all Challenge and Specialist cards
  - Search functionality
  - Manual card selection
- Game state persistence
  - Automatic localStorage save/restore
  - Preserves vaults, alarms, active cards, and game mode
- Vault tracker with visual progress
- Alarm tracker with visual warnings
- Active card display with remove functionality
- Responsive game controls
- Dark theme with amber/gold aesthetic
- Reset and mode change functionality

### Technical
- Built with Next.js 16.1.6 and React 19
- TypeScript for full type safety
- Tailwind CSS v3 via CDN
- Custom React hooks for game state management
- Turbopack build system

## [0.1.0] - 2026-01-27

### Added
- Project initialized with Create Next App
- Basic Next.js project structure
- Geist font integration
- Initial configuration

---

## Version Number Scheme

- **Major** (X.0.0): Breaking changes or major feature releases
- **Minor** (0.X.0): New features, game modes, or significant enhancements
- **Patch** (0.0.X): Bug fixes, small improvements, and refinements
