import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import AddApartment from './components/Addapartment'
import DetailApartmentPage from './pages/DetailApartamentPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/apartments/:id' element={<DetailApartmentPage />} />
            <Route path='/apartments/addapartment' element={<AddApartment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
