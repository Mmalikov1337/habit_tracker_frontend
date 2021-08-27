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
import postHabit from "@src/api/putHabit";
import compareObjects from "@src/helpers/compareObjects";
let counter = 0;

export default React.memo(function Habits() {
	console.log("Habits re-render", ++counter);

	const [habits, setHabits] = React.useState<HabitDTO[]>([]);
	const [activeFilters, setActiveFilters] = React.useState<Filter[]>([]);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [fetchingId, setFetchingId] = React.useState(-1);
	// const [isLoaded, setIsLoaded] = React.useState(false);
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
				async (token: string) => await getHabits(token, activeFilters)
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
	async function setHabitValue(
		id: number | null,
		index: number | null,
		valueHandler: (val: HabitDTO) => HabitDTO
	) {
		if (habits.length === 0 || !id || index === null || !habits[index] || !ls) {
			console.log(habits.length === 0, !id, !index, habits[index!!], !ls, index);
			return;
		}
		const temp = habits.concat();
		if (temp[index].id !== id) {
			console.log("temp[index].id !== id");
		}

		if (temp[index].value !== null) {
			temp[index] = valueHandler(temp[index]);
		}

		setHabits(temp);
		setFetchingId(index);

		const access = ls.getItem<string>("access");
		if (!access) {
			return setFetchingId(-1);
		}
		const resData = await postHabit(access, id, temp[index]);
		if (!resData) {
			return setFetchingId(-1);
		}
		const succeed = await apiErrorHandler(
			resData,
			dispatch,
			async (token: string) => await postHabit(token, id, temp[index])
		);
		if (!succeed) {
			return setFetchingId(-1);
		}
		const data: HabitDTO = await succeed.json();
		if (!data) {
			return setFetchingId(-1);
		}
		if (compareObjects(temp[index], data)) {
			//чтобы не было лишнего ре-рендера
			return setFetchingId(-1);
		}
		console.log("temp[index] !== data, setHabitValue");

		temp[index] = data;
		setHabits(temp);
		return setFetchingId(-1);
	}
	return (
		<MainLayout className="habits__container">
			<h2 className="habits__title">Habits</h2>
			<FiltersField filters={habitsFilters} setActiveFilters={setActiveFilters} />
			<div className="habits__list">
				{habits.length > 0 &&
					habits.map((it, index) => {
						return (
							<Link href={{ pathname: "/habits/[habitId]", query: { habitId: it.id } }} key={it.id}>
								<div className="habits__list__row hover" key={it.id} onClick={() => ""}>
									<div className="habits__list__text">
										<span className="habits__list__title">{it.title}</span>
										<span className="habits__list__priority">{it.priority}</span>
									</div>
									<div className="habits__list__buttons" onClick={(e) => e.stopPropagation()}>
										{
											fetchingId === index && <div id="bowlG">
												<div id="bowl_ringG">
													<div className="ball_holderG">
														<div className="ballG"></div>
													</div>
												</div>
											</div>
										}
										<button
											className="habits__list__button_wrapper"
											onClick={() =>
												setHabitValue(it.id, index, (val) => {
													val.value!!--;
													return val;
												})
											}
										>
											<MinusSVG extraClassName="habits__list__button" />
										</button>
										<span className="habits__list__value">{it.value}</span>
										<button
											className="habits__list__button_wrapper"
											onClick={() =>
												setHabitValue(it.id, index, (val) => {
													val.value!!++;
													return val;
												})
											}
										>
											<PlusSVG extraClassName="habits__list__button" />
										</button>
									</div>
								</div>
							</Link>
						);
					})}
			</div>
		</MainLayout>
	);
});
