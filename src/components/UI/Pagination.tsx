import { createPages } from "@src/helpers/createPages";
import rangeArray from "@src/helpers/rangeArray";
import Link from "next/link";
import React from "react";
import ChevronLeft from "../SVG/ChevronLeft";
import ChevronRight from "../SVG/ChevronRight";

interface PaginationProps {
	total: number;
	current: number; // [1,total]
	displayQuantity: number;
	setter: (nextPage: number) => void;
}

export default function Pagination(props: PaginationProps) {
	const offsetOn = 3;
	const pages = createPages(props.total, props.current, props.displayQuantity, offsetOn);
	const setPrevPage = () => {
		if (props.current - 1 >= 0) props.setter(props.current);
	};
	const setNextPage = () => {
		if (props.current + 1 < props.total) props.setter(props.current + 2);
	};
	React.useEffect(() => {
		console.log("props.current", props.current);
	}, [props.current]);
	return (
		<ul className="pagination">
			<li className="pagination__icon" onClick={setPrevPage}>
				<ChevronLeft />
			</li>
			{pages[0] !== 1 && (
				<>
					<li className="pagination__number" onClick={() => props.setter(1)}>
						{1}
					</li>
					{pages[0] !== 2 && <li className="pagination__dots">...</li>}
				</>
			)}

			{pages.map((it) => (
				// <Link href={{ pathname: "?page=[page]", query: { page: it+1 } }} key={it}>
				<li
					className={`pagination__number ${
						it === props.current + 1 ? "pagination__number-active" : ""
					}`}
					onClick={() => props.setter(it)}
				>
					{it}
				</li>
				// </Link>/
			))}
			{pages[pages.length - 1] !== props.total && (
				<>
					<li className="pagination__dots">...</li>
					<li className="pagination__number" onClick={() => props.setter(props.total)}>
						{props.total}
					</li>
				</>
			)}

			<li className="pagination__icon" onClick={setNextPage}>
				<ChevronRight />
			</li>
		</ul>
	);
}
