import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import AddApartment from './components/Addapartment'
import DetailApartmentPage from './pages/DetailApartmentPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import SearchPage from './pages/SearchPage'
import TrendingCityPage from './pages/TrendingCityPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/apartments/:id' element={<DetailApartmentPage />} />
            <Route path='/apartments/addapartment' element={<AddApartment />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/search/:search' element={<TrendingCityPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
