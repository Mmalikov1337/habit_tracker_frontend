import getHabits from "@src/api/getHabits";
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import MainLayout from "@src/layouts/mainLayout";
import { HabitDTO, Filter, FilterFields } from "@src/types";
import React, { ChangeEvent } from "react";
import MinusSVG from "../SVG/minus";
import PlusSVG from "../SVG/plus";
import Link from "next/link";
import { useDispatch } from "react-redux";
import apiErrorHandler from "@src/api/errorHandler";
import { habitsFilters } from "@src/config";
import DateFilter from "../Filters/DateFilter";
import FiltersField from "../Filters";
let counter = 0;

export default React.memo(function Habits() {
	console.log("Habits re-render", ++counter);

	const [habits, setHabits] = React.useState<HabitDTO[]>([]);
	const [activeFilters, setActiveFilters] = React.useState<Filter[]>([]);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const ls = isLoaded ? new LocalStorageHelper() : null;
	const dispatch = useDispatch();

	React.useEffect(() => {
		setIsLoaded(true);
	}, []);
	React.useEffect(() => {
		console.log("habits", habits);
	}, [habits]);
	React.useEffect(() => {
		console.log("habits undefined", habits);
	}, [habits === undefined]);
	React.useEffect(() => {
		if (isLoaded) {
			fetchHabits().then((fetched) => {
				if (fetched) setHabits(fetched);
			});
		}
	}, [isLoaded, activeFilters]);

	async function fetchHabits(): Promise<HabitDTO[] | undefined> {
		if (ls) {
			const access = ls.getItem<string>("access");
			if (!access) {
				return;
			}
			const args: [accessToken: string, filters?: Filter[]] = [access];
			if (activeFilters.length > 0) {
				// Если выбраны фильтры, то они добавятся в массив аргументов
				args.push(activeFilters);
			}
			const habitsData = await getHabits(...args);
			if (!habitsData) {
				return;
			}
			const succeed = await apiErrorHandler(
				habitsData,
				dispatch,
				async (token:string) => await getHabits(token, activeFilters)
			);
			if (!succeed) {
				return;
			}
			const data: HabitDTO[] = await succeed.json();
			if (!data) {
				return;
			}
			return data;
		}
	}

	return (
		<MainLayout className="habits__container">
			<h2 className="habits__title">Habits</h2>
			<FiltersField filters={habitsFilters} setActiveFilters={setActiveFilters} />
			<div className="habits__list">
				{habits.length > 0 &&
					habits.map((it) => {
						return (
							<Link href={{ pathname: "/habits/[habitId]", query: { habitId: it.id } }} key={it.id}>
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
