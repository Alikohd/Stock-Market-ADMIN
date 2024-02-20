import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// рендерим приложение в корневой элемент предоставляя Redux store через Provider
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);