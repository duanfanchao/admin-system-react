import { createContext } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {}, // 默认空函数
});

export default ThemeContext;
