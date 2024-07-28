import { createContext } from "react";

export const ThemeContext = createContext<{
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
  }>({theme: 'dark', setTheme: () => {}});