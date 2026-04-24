import type { JSX } from "react";
import { NavLink } from "react-router-dom";


export default function Navigation(): JSX.Element {
    return (
        <nav>
            <NavLink to= '/'></NavLink>
            <NavLink to= '/allcards'>Look at all cards</NavLink>
            <NavLink to= '/search'>Search Page</NavLink>
            <NavLink to= '/Related'>Related Cards</NavLink>
            <NavLink to= '/Settings'>Settings</NavLink>
            <NavLink to= '/Help'>Help</NavLink>
        </nav>
    )
}