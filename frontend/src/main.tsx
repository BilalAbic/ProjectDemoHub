import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// StrictMode removed to prevent double useEffect calls in development
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)

