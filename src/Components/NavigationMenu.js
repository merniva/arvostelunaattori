import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


export default function Navbar({ fixed, loggedIn }) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
      <>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-green-300 mb-3">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <a
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
                href="#pablo"
              >
                Pablo
              </a>
              <span 
                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none">
                {<FontAwesomeIcon 
                    icon={faBars}
                    onClick={() => setNavbarOpen(!navbarOpen)}
                />}
            </span>
            </div>
            <div
              className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                <Link 
                to="/" 
                className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline"
                onClick={() => setNavbarOpen(false) }
                >
                    Etusivu
                </Link>
                </li>
                <li className="nav-item">
                <Link 
                to="/about" 
                className="px-3 py-2 ml-3 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline"
                onClick={() => setNavbarOpen(false) }
                >
                    About
                </Link>
                </li>
                <li className="nav-item">
                {loggedIn &&
                <Link 
                to="/profile" 
                className="px-3 py-2 ml-3 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline"
                onClick={() => setNavbarOpen(false) }
                >
                    Profiili
                </Link>
                }
                </li>
                <li className="nav-item">
                {loggedIn &&
                <Link 
                to="/logout" 
                className="px-3 py-2 ml-3 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline"
                onClick={() => setNavbarOpen(false) }
                >
                    Kirjaudu ulos
                </Link>
                }
                </li>
                <li className="nav-item">
                {!loggedIn &&
                <Link 
                to="/login" 
                className="px-3 py-2 ml-3 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline"
                onClick={() => setNavbarOpen(false) }
                >
                    Kirjaudu sisään
                </Link>
                }
                </li>
                <li className="nav-item">
                {!loggedIn &&
                <Link 
                to="/register" 
                className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline ml-3"
                onClick={() => setNavbarOpen(false) }
                >
                    Rekisteröidy
                </Link>
                }
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }





/*function NavigationMenu(props){
    const { loggedIn } = props;
    const [showMenu, setMenu] = useState(false)
    return (
        
<nav className="flex items-center justify-between flex-wrap bg-green-400 p-6">
  <div className="flex items-center flex-shrink-0 text-white mr-6">
    <span className="font-semibold text-xl tracking-tight">Hauska sivusto</span>
  </div>
  <div className="block lg:hidden">
    <span className="text-xl">
        {<FontAwesomeIcon 
            icon={faBars}
           onClick={() => setMenu(!showMenu)}
        />}
    </span>
  </div>
  <div className="block sm:hidden xs:hidden">
        { <Menu /> }
  </div>
  <div className="block lg:hidden">
        { showMenu && <Menu /> }
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
      <Link 
        to="/" 
        className="block mt-4 lg:inline-block lg:mt-0 text-green-100 mr-4 hover:text-green-600 mr-4"
        onClick={props.closeMenu}
    >
        Etusivu
    </Link>
    <Link 
        to="/about" 
        className="block mt-4 lg:inline-block lg:mt-0 text-green-100 mr-4 hover:text-green-600 mr-4"
        onClick={props.closeMenu}
    >
        About
    </Link>
    {loggedIn &&
        <Link 
            to="/profile" 
            className="block mt-4 lg:inline-block lg:mt-0 text-green-100 mr-4 hover:text-green-600 mr-4"
            onClick={props.closeMenu}
        >
            Profiili
        </Link>
    }
    {loggedIn &&
        <Link 
            to="/logout" 
            className="block mt-4 lg:inline-block lg:mt-0 text-green-100 mr-4 hover:text-green-600 mr-4"
            onClick={props.closeMenu}
        >
            Kirjaudu ulos
        </Link>
    }
    {!loggedIn &&
        <Link 
            to="/login" 
            className="block mt-4 lg:inline-block lg:mt-0 text-green-100 mr-4 hover:text-green-600 mr-4"
            onClick={props.closeMenu}
        >
            Kirjaudu sisään
        </Link>
    }
    {!loggedIn &&
        <Link 
            to="/register" 
            className="block mt-4 lg:inline-block lg:mt-0 text-green-100 mr-4 hover:text-green-600 mr-4"
            onClick={props.closeMenu}
        >
            Rekisteröidy
        </Link>
    }
    </div>
  </div>
</nav>
    )
}

export default NavigationMenu*/