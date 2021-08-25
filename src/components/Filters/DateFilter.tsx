import { Filter } from "@src/types";
import React from "react";
interface DateFilterProps {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export default function DateFilter(props: DateFilterProps) {
	return (
		<div className="filters__date">
			<input type="date" className="date_input" onChange={props.onChange} />
		</div>
	);
}
