import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BingoBoard from './components/bingoBoard'

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<BingoBoard/>}/>
      </Routes>
    </div>
  )
}

export default App