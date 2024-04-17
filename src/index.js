import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, } from "react-router-dom";
import { Provider } from 'react-redux';
import reduxStore from './store/redux';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={viVN}>
      <Provider store={reduxStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
