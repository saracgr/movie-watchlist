import React, { useContext, useState } from "react";
import { FiSun } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { themeContext } from '../App';

const Header = () => {
    const {theme, toggleTheme} = useContext(themeContext);
    const [toggle, setToggle] = useState(false)

    const toggleMenu = () => {
        setToggle(prev => !prev)
    }

    return (
        <header className="relative flex justify-between items-center gap-5 p-5 bg-black text-white border-b-4 border-black">
            <h1>Movie Search</h1>
            <div className="flex gap-10">
                <button className="theme-btn" onClick={toggleTheme}>
                    {theme === "light" ? <MdDarkMode /> : <FiSun />}
                </button>
                <nav className="relative">
                    <button className="w-40 h-12 rounded-md font-bold desktop-hover  transition" onClick={toggleMenu}><HiMenu /></button>
                    <ul
                className={`absolute top-full right-0 mt-2 w-40 rounded-md bg-white border border-white overflow-hidden transition-all duration-300 ease-in-out
                ${toggle ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                >
                <li>
                    <Link to='/' className="block py-3 px-4 desktop-hover transition" onClick={() => setToggle(false)}>HOME</Link>
                </li>
                <li>
                    <Link to='/search' className="block py-3 px-4 desktop-hover transition" onClick={() => setToggle(false)}>SEARCH</Link>
                </li>
                <li>
                    <Link to='/login' className="block py-3 px-4 desktop-hover transition" onClick={() => setToggle(false)}>LOG IN</Link>
                </li>
                <li>
                    <Link to='/watchlist' className="block py-3 px-4 desktop-hover transition" onClick={() => setToggle(false)}>WATCHLIST</Link>
                </li>
                </ul>
                </nav>
            </div>
        </header>
    )
}
export default React.memo(Header)