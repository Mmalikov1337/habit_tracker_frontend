import { Filter } from "./types";

export const api_address = "http://localhost:3001";

export const habitsFilters: Filter[] = [
	{
		field: "date_of_create",
		value: "",
		name: "date",
		active: false,
	},
	{
		field: "date_of_create_lte",
		value: "",
		name: "before date",
		active: false,
	},
	{
		field: "date_of_create_gte",
		value: "",
		name: "after date",
		active: false,
	},
	{
		field: "is_healfully",
		value: "",
		name: "healful",
		active: false,
	},
];
