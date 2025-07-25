import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "@/components/ui/provider.jsx";
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider>
      <App />
      <Toaster/>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
