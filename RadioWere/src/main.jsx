import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loguin from './Loguin/Loguin.jsx'
import Player from './Player/Player.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Player />
  </StrictMode>,
)
