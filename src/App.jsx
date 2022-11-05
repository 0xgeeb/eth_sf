import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./index.css"
import Home from "./pages/Home.jsx"

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-w-screen min-h-screen m-0 p-0 overflow-x-hidden">
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
    </Router>
  )
}