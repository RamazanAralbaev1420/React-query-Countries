import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleCountry from './pages/SingleCountry.tsx';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path=":cca3" element={<SingleCountry />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
