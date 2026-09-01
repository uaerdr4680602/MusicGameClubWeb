import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import IndexPage from './view/pages/IndexPage'
import HomePage from './view/pages/HomePage'
import AboutPage from './view/pages/AboutPage'
import MemberPage from './view/pages/MemberPage'
import ActivityPage from './view/pages/ActivityPage'
import ContactPage from './view/pages/ContactPage'

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
