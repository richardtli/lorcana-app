import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import LookAtAllCards from './Pages/LookAtAllCards'
import Navigation from './Components/Navigation'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Layout from './Components/Layout'
import Related from './Pages/Related'
import SearchPage from './Pages/SearchPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element='' />
          <Route path='/related' element={<Related />}/>
          <Route path='/allcards' element={<LookAtAllCards />}/>
          <Route path='/search' element={<SearchPage />}/>
          <Route path='/allcards' element={<LookAtAllCards />}/>
          <></>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
