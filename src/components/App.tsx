import React from "react";
import Sidebar from "@components/Sidebar";
import Dashboard from "@components/Dashboard"
import MainLayout from "@layouts/mainLayout";

export default function App() {
    return (
        <MainLayout className="main">
            <Dashboard />
        </MainLayout>
    )
}
