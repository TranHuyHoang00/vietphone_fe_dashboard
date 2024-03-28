import './App.css';
import Index from './apps/index';
import { ConfigProvider } from 'antd';
import { theme } from './assets/themes/theme'
function App() {
  return (
    <ConfigProvider theme={theme}>
      <Index />
    </ConfigProvider>
  );
}

export default App;

