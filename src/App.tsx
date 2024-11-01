
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from './pages/Signin'
import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin/>}/> 
          <Route path='/signup' element={<Signup/>}/> 
          <Route path='/blog/:id' element={<Blog/>}/>


        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App