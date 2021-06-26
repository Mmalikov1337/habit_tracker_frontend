import React from 'react'

interface IDashboardButton {
    topClassName: string,
    children: React.ReactNode,
    count: number,
    description: string
}

export default function DashboardButton(props: IDashboardButton) {
    return (
        <div className="dashboard__top__left__buttons__button">
            <div className="dashboard__top__left__buttons__button__icon">
                {props.children}
            </div>
            <div className="dashboard__top__left__buttons__button__number">
                {props.count}
            </div>
            <div className="dashboard__top__left__buttons__button__description">
                {props.description}
            </div>
        </div>
    )
}
