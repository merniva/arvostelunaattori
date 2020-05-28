import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ fixed, loggedIn }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-green-300 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <span className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none">
              {
                <FontAwesomeIcon
                  icon={faBars}
                  onClick={() => setNavbarOpen(!navbarOpen)}
                />
              }
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
                  onClick={() => setNavbarOpen(false)}
                >
                  Etusivu
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="px-3 py-2 ml-3 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline"
                  onClick={() => setNavbarOpen(false)}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                {loggedIn && (
                  <Link
                    to="/profile"
                    className="px-3 py-2 ml-3 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline"
                    onClick={() => setNavbarOpen(false)}
                  >
                    Minun tauluni
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {loggedIn && (
                  <Link
                    to="/logout"
                    className="px-3 py-2 ml-3 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline"
                    onClick={() => setNavbarOpen(false)}
                  >
                    Kirjaudu ulos
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {!loggedIn && (
                  <Link
                    to="/login"
                    className="px-3 py-2 ml-3 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline"
                    onClick={() => setNavbarOpen(false)}
                  >
                    Kirjaudu sisään
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {!loggedIn && (
                  <Link
                    to="/register"
                    className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline ml-3"
                    onClick={() => setNavbarOpen(false)}
                  >
                    Rekisteröidy
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
