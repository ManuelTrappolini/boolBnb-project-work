import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePagez from './components/Homepagez'


function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<HomePagez />} />
          </Route>
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
