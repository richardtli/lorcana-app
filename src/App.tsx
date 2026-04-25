import './App.css'
import LookAtAllCards from './Pages/LookAtAllCards'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import CardPage from './Pages/CardPage'
import SearchPage from './Pages/SearchPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element='' />
          <Route path='/card/:id' element={<CardPage />}/>
          <Route path='/search' element={<SearchPage />}/>
          <Route path='/allcards' element={<LookAtAllCards />}/>
          <></>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
