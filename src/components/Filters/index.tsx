import { Filter, FilterFields } from "@src/types";
import React, { ChangeEvent } from "react";
import DateFilter from "./DateFilter";
import formatDate from "@src/helpers/formatDate";
interface FiltersFieldProps {
	filters: Filter[];
	setActiveFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
	containerClass?: string;
}

export default function FiltersField(props: FiltersFieldProps) {
	// const [filtersActive, setFiltersActive] = React.useState<Filter[]>([]);
	const [filters, setFilters] = React.useState<Filter[]>(props.filters);

	const addFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// e.target.value === field
		const index = filters.findIndex((it) => it.field === e.target.value);
		const temp = filters.concat();
		temp[index].active = true;
		setFilters(temp);
	};
	const setDateFilter = (field: FilterFields): React.ChangeEventHandler<HTMLInputElement> => {
		// e.target.value === field
		const index = filters.findIndex((it) => it.field === field);
		const temp = filters.concat();
		return (e) => {
			temp[index].value = formatDate(new Date(e.target.value), "-");
			setFilters(temp);
		};
	};
	const applyFilters = () => {
		props.setActiveFilters(filters.filter((it) => it.active && it.value));
		// console.log(
		// 	"filters active",
		// 	filters.filter((it) => it.active && it.value)
		// );
	};
	const removeFilter = (field: string) => {
		const index = filters.findIndex((it) => it.field === field);
		const temp = filters.concat();
		temp[index].active = false;
		setFilters(temp);
		applyFilters();
	};
	const filterFields = {
		date_of_create: (onChange: React.ChangeEventHandler<HTMLInputElement>) => (
			<DateFilter onChange={onChange} />
		),
		date_of_create_lte: (onChange: React.ChangeEventHandler<HTMLInputElement>) => (
			<DateFilter onChange={onChange} />
		),
		date_of_create_gte: (onChange: React.ChangeEventHandler<HTMLInputElement>) => (
			<DateFilter onChange={onChange} />
		),
	};
	return (
		<div /*className="habits__filters"*/ className={props.containerClass ?? "filters"}>
			<div className="filters__field">
				Add filter: <button onClick={() => console.log(filters)}>zxc</button>
				<label className="select_wrapper" htmlFor="filter_select">
					<select
						id="filter_select"
						required={true}
						className={"select select_active"}
						onChange={addFilter}
						defaultValue=""
					>
						<option value="" disabled={true}>
							Select option
						</option>
						{filters
							.filter((it) => !it.active)
							.map((it) => {
								return (
									<option value={it.field} key={it.field}>
										{it.name}
									</option>
								);
							})}
					</select>
				</label>
			</div>
			<div className="filters__active">
				{filters
					.filter((it) => it.active)
					.map((it, index) => {
						return (
							<div className="filters__wrapper" key={it.name}>
								<span className="filters__name">{it.name}</span>
								{
									filterFields[
										it.field as "date_of_create" | "date_of_create_lte" | "date_of_create_gte"
									](setDateFilter(it.field)) //TODO: Сменить "date_of_create" на
								}
								<svg
									viewBox="0 0 512 512"
									xmlns="http://www.w3.org/2000/svg"
									className="filters__del"
									onClick={() => removeFilter(it.field)}
								>
									<path
										d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm0 0"
										className="filters__del_out"
									/>
									<path
										d="M350.273 320.105c8.34 8.344 8.34 21.825 0 30.168a21.275 21.275 0 0 1-15.086 6.25c-5.46 0-10.921-2.09-15.082-6.25L256 286.164l-64.105 64.11a21.273 21.273 0 0 1-15.083 6.25 21.275 21.275 0 0 1-15.085-6.25c-8.34-8.344-8.34-21.825 0-30.169L225.836 256l-64.11-64.105c-8.34-8.344-8.34-21.825 0-30.168 8.344-8.34 21.825-8.34 30.169 0L256 225.836l64.105-64.11c8.344-8.34 21.825-8.34 30.168 0 8.34 8.344 8.34 21.825 0 30.169L286.164 256zm0 0"
										className="filters__del_in"
									/>
								</svg>
							</div>
						);
					})}
			</div>
			<div className="filters__apply">
				<button className="btn btn-md" onClick={applyFilters}>
					Apply
				</button>
			</div>
		</div>
	);
}
