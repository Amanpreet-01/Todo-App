import React from 'react'

function Navbar() {
  return (
    <nav>
        <div className="logo">
            <span>iTask</span>
        </div>
        <ul className="flex">
            <li>Home</li>
            <li>Your tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar