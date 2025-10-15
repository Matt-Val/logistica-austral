
import { Router, Route, Routes } from 'react-router-dom'
// componentes
import Navbar from './components/layout/Navbar'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
// "paginas"
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Explorar from './pages/Explorar'
import DetalleCamion from './pages/DetalleCamion'

import './css/App.css'

function App() {
  // me carga esta identacion
  // <Route path='/' element={<Inicio />} /> :: este es el homepage, el "inicio" de Inicio.jsx
    return (
      <>
        <Header />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/explorar' element={<Explorar />} />
          <Route path='/login' element={<Login />} />
          <Route path='/detalle/:id' element={<DetalleCamion />}/>
        </Routes>
        <Footer />          
      </>
    )
}

export default App
