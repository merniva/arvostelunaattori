import React from 'react'
import NavigationMenu from './NavigationMenu'
import { Link } from 'react-router-dom'

function Header({loggedIn}){
    return (
        <header>
            <NavigationMenu loggedIn={loggedIn} />
        </header>
    )
}

export default Header