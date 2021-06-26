import React from "react";
import Sidebar from "@components/Sidebar";

interface IMainLayout {
    className?: string,
    children?: React.ReactNode
}

export default function MainLayout(props: IMainLayout) {
    return (
        <main className={props.className}>
            <Sidebar />
            {props.children}
        </main>
    )
}
