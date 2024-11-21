import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <div className="d-flex flex-column h-100">
    <App />
  </div>,
)
