import './App.css';
import { ConfigProvider, Spin } from 'antd';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN'; // 中文
// import enUS from 'antd/locale/en_US'; // 英文
// import { Button, Flex } from 'antd';
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
                <Suspense fallback={<Spin size="large" />}>
                    <AppRoutes />
                </Suspense>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
