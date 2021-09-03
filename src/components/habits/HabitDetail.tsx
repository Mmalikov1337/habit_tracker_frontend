import React from "react";
import getHabits from "@src/api/getHabits";
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import { HabitDTO, HabitsResponse, IDynamicsParsed, INotesParsed } from "@src/types";
import { Router, useRouter } from "next/router";
import MainLayout from "@src/layouts/mainLayout";
import apiErrorHandler from "@src/api/errorHandler";
import { useDispatch } from "react-redux";
import getHabit from "@src/api/getHabit";
import dynamic from "next/dynamic";
import Fire from "../SVG/Fire";
import CheckSVG from "../SVG/Check";
import CalendarSVG from "../SVG/Calendar";
import BoldPlusSVG from "../SVG/BoldPlus";
import HabitNotes from "./HabitNotes";
import putHabit from "@src/api/putHabit";
import compareObjects from "@src/helpers/compareObjects";

const ChartNoSSR = dynamic(() => import("react-apexcharts"), { ssr: false });

const counter = { val: 0 };
export default (function HabitDetail() {
	console.log("HabitDetail re-render", ++counter.val);

	const router = useRouter();
	console.log("ROUTER", router);

	// const [isLoaded, setIsLoaded] = React.useState(false);
	const [habitData, setHabitData] = React.useState<HabitDTO>(new HabitDTO({ title: "..." }));
	const [fetching, setFetching] = React.useState(false);
	const ls = router.isReady ? new LocalStorageHelper() : null;
	const dispatch = useDispatch();

	async function setHabitNotes(notes: INotesParsed[]) {
		if (!ls) {
			console.log("(!ls",!ls);
			
			return;
		}
		if (habitData.title === "...") {
			console.log("habitData.title === ",habitData.title === "...");
			
			return;
		}
		// if (notes.length === 0) {
		// 	console.log("notes.length === 0",notes.length === 0);
			
		// 	return;
		// }
		if (compareObjects(notes, habitData.notes)) {
			console.log("compareObjects(notes, habitData.notes)",compareObjects(notes, habitData.notes));
			
			return;
		}
		const access = ls.getItem<string>("access");
		if (!access) {
			return;
		}
		const temp: HabitDTO = Object.assign(habitData);
		temp.notes = notes;
		setFetching(true);
		const resData = await putHabit(access, Number(router.query.habitId), temp);
		if (!resData) {
			return setFetching(false);
		}
		const succeed = await apiErrorHandler(
			resData,
			dispatch,
			async (token: string) => await putHabit(token, Number(router.query.habitId), temp)
		);
		if (!succeed) {
			return setFetching(false);
		}
		const data: HabitDTO = await succeed.json();
		if (!data) {
			return setFetching(false);
		}
		if (compareObjects(temp, data)) {
			//чтобы не было лишнего ре-рендера
			return setFetching(false);
		}
		temp.notes = data.notes;
		setHabitData(temp);
		return setFetching(false);
	}

	React.useEffect(() => {
		// setIsLoaded(true);
		if (router.isReady) {
			console.log("router.query.habitId", router.query, router);
			fetchHabit().then((fetched) => {
				if (fetched && fetched.habits.length > 0) setHabitData(fetched.habits[0]);
			});
		}
	}, [router.isReady]);

	React.useEffect(() => {}, []);

	async function fetchHabit() {
		if (ls) {
			const access = ls.getItem<string>("access");
			if (!access) {
				return;
			}
			const habitsData = await getHabit(access, Number(router.query.habitId));
			if (!habitsData) {
				return;
			}
			const succeed = await apiErrorHandler(
				habitsData,
				dispatch,
				async (token: string) => await getHabit(token, Number(router.query.habitId))
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
	const options: ApexCharts.ApexOptions = {
		chart: {
			id: "basic-bar",
		},
	};
	const series = [
		{
			data: habitData.dynamics.map((it) => {
				return { x: it.date, y: it.value, name: "value" };
			}),
		},
	];
	const streak = React.useMemo(
		function currentStreak() {
			let count = 0;
			const reversed = habitData.dynamics.map((it) => it.date).reverse();
			for (let [index, item] of reversed.entries()) {
				if (
					new Date().setUTCHours(0, 0, 0, 0) - new Date(item).setUTCHours(0, 0, 0, 0) ===
					index * 86400000
				)
					count++;
				else break;
			}
			return count;
		},
		[habitData.dynamics]
	);
	return (
		<MainLayout className="habits__container scrollable">
			<div className="habit_detail__title">
				<h4>{habitData.title}</h4>
			</div>
			<div className="habit_detail__plates_container">
				<div className="habit_detail__streak habit_detail__plate plate bg-pri ">
					<span className="habit_detail__plate__title">Current streak</span>
					<span className="habit_detail__plate__value">{streak} days</span>
					<Fire className="habit_detail__plate__image" />
				</div>
				<div className="habit_detail__streak habit_detail__plate plate bg-pri">
					<span className="habit_detail__plate__title">Submitted</span>
					<span className="habit_detail__plate__value">{habitData.dynamics.length} days</span>
					<CheckSVG className="habit_detail__plate__image" />
				</div>
			</div>

			<ChartNoSSR
				options={options}
				height="50%"
				width="50%"
				series={series}
				xaxis={{ type: "datetime" }}
			/>
			<div className="habit_detail__notes">
				<HabitNotes notes={habitData.notes} onSave={setHabitNotes} />
			</div>
		</MainLayout>
	);
});
