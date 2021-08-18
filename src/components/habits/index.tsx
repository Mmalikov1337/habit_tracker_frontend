import getHabits from "@src/api/getHabits";
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import MainLayout from "@src/layouts/mainLayout";
import { HabitDTO} from "@src/types";
import React from "react";
import MinusSVG from "../SVG/minus";
import PlusSVG from "../SVG/plus";
import Link from "next/link";
import { useDispatch } from "react-redux";
import apiErrorHandler from "@src/api/errorHandler";
const counter = {val:0}
export default React.memo(function Habits() {
	console.log("Habits re-render", ++counter.val);
	
	const [habits, setHabits] = React.useState<HabitDTO[]>([]);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const ls = isLoaded ? new LocalStorageHelper() : null;
	const dispatch = useDispatch();

	React.useEffect(() => {
		setIsLoaded(true);
	}, []);

	React.useEffect(() => {
		if (isLoaded) {
			fetchHabits().then((fetched) => {
				if (fetched) setHabits(fetched);
			});
		}
	}, [isLoaded]);

	async function fetchHabits(): Promise<HabitDTO[] | undefined> {
		if (ls) {
			const access = ls.getItem<string>("access");
			if (!access) {
				// console.log("access not found");
				return;
			}
			const habitsData = await getHabits(access);
			if (!habitsData) return;
			const succeed = await apiErrorHandler(habitsData, dispatch);
			if (!succeed) return;
			const data: HabitDTO[] = await habitsData.json();
			if (!data) {
				// console.log("Failed to await habitsData.json()");
				return;
			}
			// console.log("data", data);

			return data;
		}
		// getHabits();
	}

	return (
		<MainLayout className="habits__container">
			<div className="habits__list">
				{habits.map((it) => {
					return (
						<Link href="/habits/[habitId]" as={`/habits/${it.id}`}>
							<div className="habits__list__row hover" key={it.id} onClick={() => ""}>
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
						</Link>
					);
				})}
			</div>
		</MainLayout>
	);
});
