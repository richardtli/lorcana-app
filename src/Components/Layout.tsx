import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"
import type { JSX } from "react"

export default function Layout(): JSX.Element{
    return(
        <div className="app-layout">
            <Navigation />
            <main className='page-content'>
                < Outlet />
           </main>
        </div>
    )
}