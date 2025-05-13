import Header from './Header.jsx'
import React from 'react'
import { Outlet} from 'react-router-dom'

const Layout = () =>{

 return(
   <main>
    <Header/>
    <Outlet/>
   </main>
   )         
}

export default React.memo(Layout)