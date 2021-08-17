import MainLayout from "@src/layouts/mainLayout";
import React from "react";
import MinusSVG from "../SVG/minus";
import PlusSVG from "../SVG/plus";

const tempHabits = [
	{
		id: 1,
		userId: 1,
		title: "habit1",
		description: "",
		notes: "",
		priority: "lowest",
		isHealfully: true,
		value: 1,
		photo: "",
		dateOfCreate: "",
	},
	{
		id: 2,
		userId: 1,
		title: "habit2",
		description: "",
		notes: "",
		priority: "lowest",
		isHealfully: true,
		value: 1,
		photo: "",
		dateOfCreate: "",
	},
	{
		id: 3,
		userId: 1,
		title: "habit3",
		description: "",
		notes: "",
		priority: "lowest",
		isHealfully: true,
		value: 1,
		photo: "",
		dateOfCreate: "",
	},
];

export default function Habits() {
	return (
		<MainLayout className="habits__container">
			<div className="habits__list">
				{tempHabits.map((it, index) => {
					return (
						<div className="habits__list__row hover" key={it.id}>
							<div className="habits__list__text">
								<span className="habits__list__title">{it.title}</span>
								<span className="habits__list__priority">{it.priority}</span>
							</div>
							<div className="habits__list__buttons">
								<MinusSVG extraClassName="habits__list__button" />
								<span className="habits__list__value">{it.value}</span>
								<PlusSVG extraClassName="habits__list__button" />
							</div>
						</div>
					);
				})}
			</div>
		</MainLayout>
	);
}
