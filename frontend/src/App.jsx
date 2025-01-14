import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePagez from './components/Homepagez'
import AddApartment from './components/Addapartment'

function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<HomePagez />} />
            <Route path='/apartments/addapartment' element={<AddApartment />} />
          </Route>
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
