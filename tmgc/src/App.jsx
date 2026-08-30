import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MemberPage from './pages/MemberPage'
import ActivityPage from './pages/ActivityPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
