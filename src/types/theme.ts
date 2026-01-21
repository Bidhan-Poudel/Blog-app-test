export type ThemeState={
    theme:"light"|"dark",
    setTheme:(newTheme:"light"|"dark")=>void,
    toggleTheme:()=>void
}