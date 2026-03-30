import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Login from './pages/Login.tsx';
import About from './pages/About.tsx';
import Services from './pages/Services.tsx';
import Signup from './pages/Signup.tsx';
import RootLayout from './pages/RootLayout.tsx';
import UserLayout from './pages/users/UserLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout/>}>
      <Route index element={<App />}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/dashboard' element={<UserLayout/>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
)
