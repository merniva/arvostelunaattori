import React from 'react'
import { Link } from "react-router-dom"

function NavigationMenu(props){
    const { loggedIn } = props;
    return (
        <div>
            <div className="font-bold py-3">
                Hauska sivusto
            </div>
            <ul>
                <li>
                    <Link 
                        to="/"
                        onClick={props.closeMenu}
                    >
                        Etusivu
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/about"
                        onClick={props.closeMenu}
                    >
                        About
                    </Link>
                </li>
                {loggedIn && <li>
                    <Link 
                        to="/profile"
                        onClick={props.closeMenu}
                    >
                        Profiili
                    </Link>
                </li>}
                {loggedIn && <li>
                    <Link 
                        to="/logout"
                        onClick={props.closeMenu}
                    >
                        Kirjaudu ulos
                    </Link>
                </li>}
                {!loggedIn && <li>
                    <Link 
                        to="/login" 
                        onClick={props.closeMenu}
                    >
                        Kirjaudu sisään
                    </Link>
                </li>
                }
                {!loggedIn && <li>
                    <Link 
                        to="/register" 
                        onClick={props.closeMenu}
                    >
                        Rekisteröidy
                    </Link>
                </li>
                }
            </ul>
        </div>
    )
}

export default NavigationMenu