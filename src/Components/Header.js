import React from 'react'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'

function Header({loggedIn}){
    return (
        <header>
            <Link to="/" className="font-bold">
                Hauska sivusto
            </Link>

            <Navigation loggedIn={loggedIn} />
        </header>
    )
}

export default Header