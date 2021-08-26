import { Filter } from "@src/types";
import React from "react";
interface DateFilterProps {
	onChange: React.ChangeEventHandler<HTMLElement>;
}
export default function SelectFilter(props: DateFilterProps) {
	return (
		<label className="select_wrapper" htmlFor="filter_select">
			<select
				id="filter_select"
				required={true}
				className={"select select_active"}
				onChange={props.onChange}
				defaultValue=""
			>
				<option value="" disabled={true}>
					Select option
				</option>
				<option value="false">harmful</option>
				<option value="true">healful</option>
				{/* {filters
					.filter((it) => !it.active)
					.map((it) => {
						return (
							<option value={it.field} key={it.field}>
								{it.name}
							</option>
						);
					})} */}
			</select>
		</label>
	);
}
