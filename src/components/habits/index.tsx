import getHabits from "@src/api/getHabits";
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import MainLayout from "@src/layouts/mainLayout";
import { HabitDTO } from "@src/types";
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

export default React.memo(function Habits() {
	const [habits, setHabits] = React.useState<HabitDTO[]>([]);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const ls = isLoaded ? new LocalStorageHelper() : null;

	React.useEffect(() => {
		setIsLoaded(true);
	}, []);

	React.useEffect(() => {
		if (isLoaded) {
			fetchHabits().then((fetched) => {
				if(fetched)
					setHabits(fetched);
			});
		}
	}, [isLoaded]);

	async function fetchHabits() {
		if (ls) {
			const access = ls.getItem<string>("access");
			if (!access) {
				console.log("access not found");
				return;
			}
			const habitsData = await getHabits(access);
			if (!habitsData) return;
			if (habitsData.status.toString()[0] === "4") {
				console.log("Failed to fetch habits");
				return;
			}
			const data: HabitDTO[] = await habitsData.json();
			if (!data) {
				console.log("Failed to await habitsData.json()");
				return;
			}
			console.log("data",data);
			
			return data;
		}
		// getHabits();
	}
	return (
		<MainLayout className="habits__container">
			<div className="habits__list">
				{habits.map((it, index) => {
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
});
