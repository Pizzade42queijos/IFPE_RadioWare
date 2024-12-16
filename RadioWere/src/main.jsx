import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loguin from './Loguin/Loguin.jsx'
import Player from './Player/Player.jsx'
import Songlist from './List/List.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Songlist />
  </StrictMode>,
)


