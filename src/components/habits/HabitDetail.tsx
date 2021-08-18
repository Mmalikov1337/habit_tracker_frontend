import React from "react";
import getHabits from "@src/api/getHabits";
import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import { HabitDTO } from "@src/types";
import { Router, useRouter } from "next/router";
import MainLayout from "@src/layouts/mainLayout";
import apiErrorHandler from "@src/api/errorHandler";
import { useDispatch } from "react-redux";

export default React.memo(function HabitDetail() {
	const router = useRouter();

	const [isLoaded, setIsLoaded] = React.useState(false);
	const [fetched, setFetched] = React.useState<HabitDTO>(new HabitDTO({ title: "WRONG!!!" }));
	const ls = isLoaded ? new LocalStorageHelper() : null;
	const dispatch = useDispatch();

	React.useEffect(() => {
		setIsLoaded(true);
		// console.log("router.query", router.query);
	}, []);

	React.useEffect(() => {
		if (isLoaded) {
			fetchHabit().then((fetched) => {
				if (fetched && fetched.length > 0) setFetched(fetched[0]);
			});
			// console.log("router.query2", router.query);
		}
	}, [isLoaded]);

	async function fetchHabit() {
		if (ls) {
			const access = ls.getItem<string>("access");
			if (!access) {
				// console.log("access not found");
				return;
			}
			const habitsData = await getHabits(access, Number(router.query));
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

	return <MainLayout className="habits__container">{fetched.title}</MainLayout>;
});
