
import { Route, Routes } from 'react-router-dom'
// componentes
import Navbar from './components/layout/Navbar'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
// "paginas"
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Registro from './pages/Registro'
import QuienesSomos from './pages/QuienesSomos'
import Administrador from './pages/Administrador'

import './css/App.css'
import './css/login.css'
import './css/admin.css'
import './css/quiensomos.css'


function App() {
  // me carga esta identacion
  // <Route path='/' element={<Inicio />} /> :: este es el homepage, el "inicio" de Inicio.jsx
    return (
      <>
        <Header />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/quienes-somos' element={<QuienesSomos />} />
          <Route path='/Inicio' element={<Inicio />} />
          <Route path='/Administrador' element={<Administrador />} />
        </Routes>
        <Footer />          
      </>
    )
}

export default App
