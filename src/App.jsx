import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './Pages/Dashboard'
import DigitalTwin from './Pages/DigitalTwin'
import Analytics from './Pages/Analytics'
import Simulator from './Pages/Simulator'
import Reports from './Pages/Reports'
import Settings from './Pages/Settings'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/digital-twin" element={<Layout><DigitalTwin /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/simulator" element={<Layout><Simulator /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </div>
  )
}

export default App
