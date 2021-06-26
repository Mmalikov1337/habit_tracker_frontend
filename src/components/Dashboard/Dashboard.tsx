import React from 'react';

import DashboardButton from "@src/components/Dashboard/DashboardButton"

import closeClassName from "@helpers/classNames";

const getClassName = closeClassName("dashboard");

export default function Dashboard() {
    let habitsCount = 128;
    let habitsDesc = "habits";

    let dTasksCount = 32;
    let dTasksDesc = "daily tasks";

    let lTasksCount = 2;
    let dTasksDescl = "long tasks";

    let repsCount = 4;
    let repsDesc = "Reports";

    return (
        <div className="dashboard">
            <div className="dashboard__top">
                <div className="dashboard__top__left">
                    <div className="dashboard__top__left__buttons">
                        <DashboardButton topClassName="dashboard" count={habitsCount} description={habitsDesc}>
                            <svg width="44" height="28" viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="svgg">
                                <path d="M30 12C33.32 12 35.98 9.32 35.98 6C35.98 2.68 33.32 0 30 0C26.68 0 24 2.68 24 6C24 9.32 26.68 12 30 12ZM14 12C17.32 12 19.98 9.32 19.98 6C19.98 2.68 17.32 0 14 0C10.68 0 8 2.68 8 6C8 9.32 10.68 12 14 12ZM14 16C9.34 16 0 18.34 0 23V28H28V23C28 18.34 18.66 16 14 16ZM30 16C29.42 16 28.76 16.04 28.06 16.1C30.38 17.78 32 20.04 32 23V28H44V23C44 18.34 34.66 16 30 16Z" fill="black" fillOpacity="0.24" />
                            </svg>
                        </DashboardButton>

                        <DashboardButton topClassName="dashboard" count={dTasksCount} description={dTasksDesc}>
                            <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="svgg">
                                <path d="M32 4H23.64C22.8 1.68 20.6 0 18 0C15.4 0 13.2 1.68 12.36 4H4C1.8 4 0 5.8 0 8V36C0 38.2 1.8 40 4 40H32C34.2 40 36 38.2 36 36V8C36 5.8 34.2 4 32 4ZM18 4C19.1 4 20 4.9 20 6C20 7.1 19.1 8 18 8C16.9 8 16 7.1 16 6C16 4.9 16.9 4 18 4ZM14 32L6 24L8.82 21.18L14 26.34L27.18 13.16L30 16L14 32Z" fill="black" fillOpacity="0.24" />
                            </svg>
                        </DashboardButton>

                        <DashboardButton topClassName="dashboard" count={lTasksCount} description={dTasksDescl}>
                            <svg width="32" height="39" viewBox="0 0 32 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="svgg">
                                <path d="M16 39C18.2 39 20 37.2 20 35H12C12 37.2 13.78 39 16 39ZM28 27V17C28 10.86 24.72 5.72 19 4.36V3C19 1.34 17.66 0 16 0C14.34 0 13 1.34 13 3V4.36C7.26 5.72 4 10.84 4 17V27L0 31V33H32V31L28 27Z" fill="black" fillOpacity="0.24" />
                            </svg>
                        </DashboardButton>

                        <DashboardButton topClassName="dashboard" count={repsCount} description={repsDesc}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="svgg">
                                <path d="M25.46 0H10.54L0 10.54V25.46L10.54 36H25.46L36 25.46V10.54L25.46 0ZM18 28.6C16.56 28.6 15.4 27.44 15.4 26C15.4 24.56 16.56 23.4 18 23.4C19.44 23.4 20.6 24.56 20.6 26C20.6 27.44 19.44 28.6 18 28.6ZM20 20H16V8H20V20Z" fill="black" fillOpacity="0.24" />
                            </svg>
                        </DashboardButton>
                    </div>
                    <div className="dashboard__top__left__content">
                        <div className="dashboard__habits">
                            <h3>Habits</h3>
                            <div className="dashboard__habits__content">
                                <div className="dashboard__habits__item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm12.5 28h-25a2 2 0 1 1 0-4h25a2 2 0 1 1 0 4z" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm12.5 28H28v11a2 2 0 1 1-4 0V28H13.5a2 2 0 1 1 0-4H24V14a2 2 0 1 1 4 0v10h10.5a2 2 0 1 1 0 4z" /></svg>
                                </div>
                                <div className="dashboard__habits__item">
                                    
                                </div>
                                <div className="dashboard__habits__item">

                                </div>
                                <div className="dashboard__habits__item">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard__top__right">

                </div>
            </div>
            <div className="dashboard__bottom">

            </div>
        </div>
    )
}
