import getHabits from "@src/api/getHabits";
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import MainLayout from "@src/layouts/mainLayout";
import { HabitDTO, Filter, FilterFields, PaginationData, HabitsResponse } from "@src/types";
import React, { ChangeEvent } from "react";
import MinusSVG from "../SVG/minus";
import PlusSVG from "../SVG/plus";
import Link from "next/link";
import { useDispatch } from "react-redux";
import apiErrorHandler from "@src/api/errorHandler";
import { habitsFilters } from "@src/config";
import DateFilter from "../Filters/DateFilter";
import FiltersField from "../Filters";
import putHabit from "@src/api/putHabit";
import compareObjects from "@src/helpers/compareObjects";
import Loader from "../Loader";
import Pagination from "../UI/Pagination";
import { useRouter } from "next/router";
import verifyPageNumber from "@src/helpers/verifyQuery";
import HabitDetail from "./HabitDetail";
let counter = 0;

export default React.memo(function Habits() {
	console.log("Habits re-render", ++counter);

	const [habits, setHabits] = React.useState<HabitDTO[]>([]);
	const [selectedId, setSelectedId] = React.useState<number>(-1);
	const [activeFilters, setActiveFilters] = React.useState<Filter[]>([]);
	// const [isLoaded, setIsLoaded] = React.useState(false);
	const [fetchingId, setFetchingId] = React.useState(-1);
	// const [isLoaded, setIsLoaded] = React.useState(false);
	const router = useRouter();
	const ls = router.isReady ? new LocalStorageHelper() : null;

	// const [pagination, setPagination] = React.useState<PaginationData>({ limit: 5, offset: 0 });

	const [limit, setLimit] = React.useState<number>(20); //кол-во на странице
	// const [page, setPage] = React.useState<number>(0); //0,1,2,3,...
	const [total, setTotal] = React.useState<number>(0); //0,1,2,3,...

	const dispatch = useDispatch();

	// React.useEffect(() => {
	// 	setIsLoaded(true);
	// }, []);
	React.useEffect(() => {
		console.log("habits", habits);
	}, [habits]);
	React.useEffect(() => {
		console.log("habits undefined", habits);
	}, [habits === undefined]);
	React.useEffect(() => {
		if (router.isReady) {
			fetchHabits().then((fetched) => {
				if (fetched) {
					console.log("habits fetched", fetched);

					setHabits(fetched.habits);
					setTotal(Math.ceil(fetched.total / limit));
				}
			});
		}
	}, [router.isReady, activeFilters, limit, router.query]);

	async function fetchHabits(): Promise<HabitsResponse | undefined> {
		if (ls) {
			const access = ls.getItem<string>("access");
			if (!access) {
				return;
			}
			const pagination = {
				limit: limit,
				offset: (verifyPageNumber(router.query.page, 1, total) - 1) * limit,
			};
			const args: [accessToken: string, pagination: PaginationData, filters?: Filter[]] = [
				access,
				pagination,
			];
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
				async (token: string) => await getHabits(token, pagination, activeFilters)
			);
			if (!succeed) {
				return;
			}
			const data: HabitsResponse = await succeed.json();
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
		const resData = await putHabit(access, id, temp[index]);
		if (!resData) {
			return setFetchingId(-1);
		}
		const succeed = await apiErrorHandler(
			resData,
			dispatch,
			async (token: string) => await putHabit(token, id, temp[index])
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
	React.useEffect(() => {
		console.log(selectedId);

	}, [selectedId])
	const setActiveHabit = (id: number | null) => {
		console.log("setActiveHabit, id", id);

		setSelectedId(id ?? -1)
	}
	return (
		<MainLayout className="habits__container scrollable">
			<h2 className="habits__title">Habits</h2>
			<FiltersField filters={habitsFilters} setActiveFilters={setActiveFilters} />
			<div className="habits__wrapper">
				<div className="habits__list">
					{habits.length > 0 &&
						habits.map((it, index) => {
							return (
								<div className={`habits__list__row hover plate bg-def ${it.id === selectedId ? "active" : ""}`} key={it.id} onClick={() => setActiveHabit(it.id)} >
									<div className="habits__list__text">
										<span className="habits__list__title">{it.title}</span>
										<span className="habits__list__priority">Priority:{it.priority}</span>
									</div>
									<div className="habits__list__buttons" onClick={(e) => e.stopPropagation()}>
										<Loader renderCondition={fetchingId === index} />
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
							);
						})}
				</div>
				{selectedId > 0 && <div className="habits__selected">
					<HabitDetail habitId={selectedId} />
				</div>}
			</div>

			<Pagination
				total={total}
				current={verifyPageNumber(router.query.page, 1, total) - 1}
				displayQuantity={7}
				setter={(nextPage) => router.push(`/habits/?page=${nextPage}`)}
			/>
		</MainLayout>
	);
});
