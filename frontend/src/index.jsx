import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './slices/index.jsx';

createRoot(document.getElementById('root')).render(
  <div className="d-flex flex-column h-100">
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
)
