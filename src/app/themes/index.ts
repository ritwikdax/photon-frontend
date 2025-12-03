import { ThemeOptions } from "@mui/material";
import { ColorTheme } from "../context/ThemeContext";
import { NEON_DARK, NEON_LIGHT } from "./neon";
import { MINIMALIST_DARK, MINIMALIST_LIGHT } from "./minimalist";
import { SLACK_DARK, SLACK_LIGHT } from "./slack";
import { BLUE_THEME } from "./blue";
import { APPLE_DARK, APPLE_LIGHT } from "./apple";

export const THEME : Record<ColorTheme, ThemeOptions>= {
    'mini_dark': MINIMALIST_DARK,
    'mini_light': MINIMALIST_LIGHT,
    'neon_dark': NEON_DARK,
    'neon_light': NEON_LIGHT,
    'slack_light': SLACK_LIGHT,
    'slack_dark': SLACK_DARK,
    'blue': BLUE_THEME,
    'apple_light': APPLE_LIGHT,
    'apple_dark': APPLE_DARK
}