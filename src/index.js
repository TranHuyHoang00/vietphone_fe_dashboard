import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, } from "react-router-dom";
import { Provider } from 'react-redux';
import reduxStore from './stores/redux';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={viVN}>
      <Provider stores={reduxStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
