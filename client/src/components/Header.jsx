import React, { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { BsSearchHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { themeContext } from '../App';

const Header = () => {
    const {theme, toggleTheme} = useContext(themeContext);
    return (
        <header>
        <h1>Movie Search</h1>
        <nav>
            <li><Link to='/'><AiOutlineHome/></Link></li>
            <li><button className="theme-btn" onClick={toggleTheme}>
            {theme === 'light' ?(
            <MdDarkMode/> ):( 
            <FiSun/>
            )}
            </button></li>
            <li><Link to='/search'><BsSearchHeart/></Link></li>
             <li id="watchlist-link"><Link to='login'>LOG IN</Link></li>
            <li id="watchlist-link"><Link to='watchlist'>WATCHLIST</Link></li>
        </nav>
        </header>
    )
}
export default React.memo(Header)