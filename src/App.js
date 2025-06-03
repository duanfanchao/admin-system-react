import './App.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'; // 中文
// import enUS from 'antd/locale/en_US'; // 英文
import { Button, Flex } from 'antd';
// import axios from 'axios';

function App() {
    return (
        <ConfigProvider locale={zhCN}>
            <div className="App">
                <header className="App-header">
                    <Flex gap="small" wrap>
                        <Button type="primary">Primary Button</Button>
                        <Button>Default Button</Button>
                        <Button type="dashed">Dashed Button</Button>
                        <Button type="text">Text Button</Button>
                        <Button type="link">Link Button</Button>
                    </Flex>
                </header>
            </div>
        </ConfigProvider>
    );
}

export default App;
