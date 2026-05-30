import { createRoot } from 'react-dom/client'
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import PollPage from './PollPage.jsx'
import WidgetDemoPage from './WidgetDemoPage.jsx'
import './styles.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/poll" replace />} />
        <Route path="/poll" element={<PollPage />} />
        <Route path="/widget-demo" element={<WidgetDemoPage />} />
        <Route path="*" element={<Navigate to="/poll" replace />} />
      </Routes>
    </HashRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
