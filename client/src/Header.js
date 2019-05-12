import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header>
    <div className="header">Header </div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <ul className="navbar-nav mr-auto">
        <li><Link to={'/'} className="nav-link"> Events </Link></li>
        <li><Link to={'/processes'} className="nav-link">Processing Techniques</Link></li>
    </ul>
    </nav>
  </header>
)
export default Header
