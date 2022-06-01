import React from "react";
import { Link } from "react-router-dom";

const NavLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Articles", link: "/articles-list" },
];

const NavBar = () => (
    <nav>
        <ul>
            { NavLinks.map( ( navlink, id ) => ( <li key={ id }><Link to={ navlink.link } >{ navlink.name }</Link></li> ) ) }
        </ul>
    </nav>

);

export default NavBar