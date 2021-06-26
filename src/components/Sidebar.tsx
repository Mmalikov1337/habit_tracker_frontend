import React from 'react';
import Link from "next/link";
import closeClassName from "@helpers/classNames";


export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
               <Link href="/auth/login"><a >LOGIN</a></Link> 
            </div>
            <div className="sidebar__links">
                <div className="sidebar__link __link-active">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="black" fillOpacity="0.51" />
                    </svg>
                    <span>
                        Dashboard
                    </span>
                </div>
                <div className="sidebar__link">
                    <svg enableBackground="new 0 0 478 478" version="1.1" viewBox="0 0 478 478" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
                        <path d="m119.5 187.75h-102.4c-9.4 0-17 7.6-17.1 17.1v256c0 9.5 7.7 17.1 17.1 17.1h102.4c9.5 0 17.1-7.7 17.1-17.1v-256c0-9.5-7.7-17.1-17.1-17.1z" fillOpacity="0.51" />
                        <path d="m290.2 0.05h-102.4c-9.4 0-17.1 7.6-17.1 17v443.8c0 9.5 7.7 17.1 17.1 17.1h102.4c9.5 0 17.1-7.7 17.1-17.1v-443.7c0-9.5-7.7-17.1-17.1-17.1z" fillOpacity="0.51" />
                        <path d="m460.9 136.55h-102.4c-9.5 0-17.1 7.6-17.1 17.1v307.2c0 9.5 7.7 17.1 17.1 17.1h102.4c9.5 0 17.1-7.7 17.1-17.1v-307.2c0-9.5-7.7-17.1-17.1-17.1z" fillOpacity="0.51" />
                    </svg>
                    <span>
                        Stats
                    </span>
                </div>
                <div className="sidebar__link">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 2H11.82C11.4 0.84 10.3 0 9 0C7.7 0 6.6 0.84 6.18 2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM9 2C9.55 2 10 2.45 10 3C10 3.55 9.55 4 9 4C8.45 4 8 3.55 8 3C8 2.45 8.45 2 9 2ZM11 16H4V14H11V16ZM14 12H4V10H14V12ZM14 8H4V6H14V8Z" fill="black" fillOpacity="0.54" />
                    </svg>
                    <span>
                        Profile
                    </span>
                </div>
            </div>
            <div className="sidebar__settings">
                <div className="sidebar__settings__head">
                    Settings
                </div>
                <div className="sidebar__link">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4301 10.98C17.4701 10.66 17.5001 10.34 17.5001 10C17.5001 9.66 17.4701 9.34 17.4301 9.02L19.5401 7.37C19.7301 7.22 19.7801 6.95 19.6601 6.73L17.6601 3.27C17.5401 3.05 17.2701 2.97 17.0501 3.05L14.5601 4.05C14.0401 3.65 13.4801 3.32 12.8701 3.07L12.4901 0.42C12.4601 0.18 12.2501 0 12.0001 0H8.00008C7.75008 0 7.54008 0.18 7.51008 0.42L7.13008 3.07C6.52008 3.32 5.96008 3.66 5.44008 4.05L2.95008 3.05C2.72008 2.96 2.46008 3.05 2.34008 3.27L0.340084 6.73C0.210084 6.95 0.270084 7.22 0.460084 7.37L2.57008 9.02C2.53008 9.34 2.50008 9.67 2.50008 10C2.50008 10.33 2.53008 10.66 2.57008 10.98L0.460084 12.63C0.270084 12.78 0.220084 13.05 0.340084 13.27L2.34008 16.73C2.46008 16.95 2.73008 17.03 2.95008 16.95L5.44008 15.95C5.96008 16.35 6.52008 16.68 7.13008 16.93L7.51008 19.58C7.54008 19.82 7.75008 20 8.00008 20H12.0001C12.2501 20 12.4601 19.82 12.4901 19.58L12.8701 16.93C13.4801 16.68 14.0401 16.34 14.5601 15.95L17.0501 16.95C17.2801 17.04 17.5401 16.95 17.6601 16.73L19.6601 13.27C19.7801 13.05 19.7301 12.78 19.5401 12.63L17.4301 10.98ZM10.0001 13.5C8.07008 13.5 6.50008 11.93 6.50008 10C6.50008 8.07 8.07008 6.5 10.0001 6.5C11.9301 6.5 13.5001 8.07 13.5001 10C13.5001 11.93 11.9301 13.5 10.0001 13.5Z" fill="black" fill-opacity="0.54" />
                    </svg>
                    <span>
                        Main Settings
                    </span>
                </div>
                <div className="sidebar__link">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.89 20 8 20ZM14 14V9C14 5.93 12.36 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.63 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14Z" fill="black" fill-opacity="0.54" />
                    </svg>
                    <span>
                        Notifications
                    </span>
                </div>
            </div>
        </div>
    )
}