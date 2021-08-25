import { Filter } from "./types";

export const api_address = "http://localhost:3001";

export const habitsFilters: Filter[] = [
	{
		field: "date_of_create",
		value: "",
		name: "date",
		active: false,
	},
];
