import React from 'react'
import HomeNavbar from "../components/nav/HomeNavbar.tsx";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={"flex flex-col"}>
            <HomeNavbar />
            <div className={"flex-grow flex flex-col h-full"}>
                {children}
            </div>
        </div>
    )
}