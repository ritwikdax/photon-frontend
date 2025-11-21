# Theme System Documentation

## Overview
The application now supports multiple color themes and dark/light mode switching with persistent preferences.

## Features

### 1. **Multiple Color Themes**
Choose from 5 different color themes:
- **Blue** - Professional and classic (default)
- **Purple** - Creative and modern
- **Green** - Natural and calming
- **Orange** - Energetic and warm
- **Teal** - Balanced and sophisticated

### 2. **Dark/Light Mode**
Toggle between light and dark mode for comfortable viewing in any environment.

### 3. **Persistent Preferences**
Your theme selection and mode preference are saved to localStorage and will be remembered across sessions.

## Usage

### Accessing Theme Settings
Click the palette icon (🎨) in the app header to open the theme settings menu.

### Changing Theme Mode
In the theme settings menu, click "Dark Mode" or "Light Mode" to toggle between modes.

### Selecting a Color Theme
In the theme settings menu, click on any of the color theme options. The currently selected theme will be marked with a checkmark.

## Technical Implementation

### Components Created
1. **ThemeContext.tsx** - Context provider managing theme state
2. **ThemeSwitcher.tsx** - UI component for theme selection
3. **Updated AppHeader.tsx** - Integrated theme switcher

### Key Files Modified
- `src/app/context/ThemeContext.tsx` (NEW)
- `src/app/context/all.tsx` (Updated)
- `src/app/components/navigation/ThemeSwitcher.tsx` (NEW)
- `src/app/components/navigation/AppHeader.tsx` (Updated)
- `src/app/components/CustomLayout.tsx` (Updated)

### Theme Context API
```typescript
import { useThemeContext } from "@/app/context/ThemeContext";

const { mode, colorTheme, toggleMode, setColorTheme } = useThemeContext();
```

### Available Methods
- `mode` - Current theme mode ("light" | "dark")
- `colorTheme` - Current color theme ("blue" | "purple" | "green" | "orange" | "teal")
- `toggleMode()` - Switch between light and dark mode
- `setColorTheme(theme)` - Set a specific color theme

## Customization

### Adding New Color Themes
To add a new color theme, edit `src/app/context/ThemeContext.tsx`:

1. Add the theme name to the `ColorTheme` type
2. Add color definitions to the `colorThemes` object
3. Add the theme option to `ThemeSwitcher.tsx`

### Modifying Theme Colors
Edit the color definitions in the `colorThemes` object in `ThemeContext.tsx`.

## Browser Compatibility
The theme system uses localStorage which is supported in all modern browsers. The theme will default to light mode with blue theme if localStorage is not available.
