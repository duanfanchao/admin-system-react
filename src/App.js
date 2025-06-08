import './App.css';
import './utils/day';
import { ConfigProvider, Spin } from 'antd';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN'; // 中文
import routes from './routes/index';
import { Suspense } from 'react';

function AppRoutes() {
    const element = useRoutes(routes);
    return element;
}

function App() {
    return (
        <ConfigProvider locale={zhCN}>
            <BrowserRouter>
                <Suspense fallback={null}>
                    <AppRoutes />
                </Suspense>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
