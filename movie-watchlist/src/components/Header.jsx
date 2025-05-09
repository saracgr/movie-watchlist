import { Link } from "react-router-dom"
export default function Header(){
    return (
        <header>
        <h1>Movie Search</h1>
        <nav>
            <li><Link to='/'>HOME</Link></li>
            <li><Link to='/watchlist'>WATCHLIST</Link></li>
        </nav>
        </header>
    )
}