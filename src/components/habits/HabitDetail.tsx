import React from "react";
import getHabits from "@src/api/getHabits";
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import { HabitDTO } from "@src/types";
import { Router, useRouter } from "next/router";
import MainLayout from "@src/layouts/mainLayout";
import apiErrorHandler from "@src/api/errorHandler";
import { useDispatch } from "react-redux";
import getHabit from "@src/api/getHabit";
const counter = { val: 0 };
export default (function HabitDetail() {
	console.log("HabitDetail re-render", ++counter.val);

	const router = useRouter();
	console.log("ROUTER", router);

	// const [isLoaded, setIsLoaded] = React.useState(false);
	const [fetched, setFetched] = React.useState<HabitDTO>(new HabitDTO({ title: "WRONG!!!" }));
	const ls = router.isReady ? new LocalStorageHelper() : null;
	const dispatch = useDispatch();

	// React.useEffect(() => {
	// 	setIsLoaded(true);
	// 	console.log("router.query", router.query);
	// }, []);

	React.useEffect(() => {
		// setIsLoaded(true);
		if (router.isReady) {
			console.log("router.query.habitId", router.query, router);
			fetchHabit().then((fetched) => {
				if (fetched && fetched.length > 0) setFetched(fetched[0]);
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
			const data: HabitDTO[] = await succeed.json();
			if (!data) {
				return;
			}
			return data;
		}
	}

	return (
		<MainLayout className="habits__container">
			{fetched.title};{router.query.habitId}
		</MainLayout>
	);
});
