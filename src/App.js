import './App.css';
import Index from './apps/index';
import { ConfigProvider } from 'antd';
import { theme } from './assets/themes/theme';
function App() {
  return (
    <ConfigProvider theme={theme}>
      <div>
        <Index />
        {/* <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        /> */}
      </div>

    </ConfigProvider>
  );
}

export default App;

