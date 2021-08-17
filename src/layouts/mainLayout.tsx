import React from "react";
import Sidebar from "@components/Sidebar";

interface IMainLayout {
    className?: string,
    children?: React.ReactNode
}

export default function MainLayout(props: IMainLayout) {
    return (
        <div className="main">
            <Sidebar />
            <main className={props.className}>
                {props.children}
            </main>
        </div>
    )
}
