import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

//redux
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider>
          <App />
    </ChakraProvider>
    </Provider>

  </React.StrictMode>
  </BrowserRouter>
,
)
