import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, } from "react-router-dom";
import { Provider } from 'react-redux';
import reduxStore from './store/redux';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
