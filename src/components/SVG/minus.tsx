import React from "react";
import { ISVG } from "@src/types";

export default function MinusSVG(props: ISVG) {
	const className = "svg" + " " + props.extraClassName ?? "";
	return (
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
			<path d="M21.25 0H2.75A2.752 2.752 0 0 0 0 2.75v18.5A2.752 2.752 0 0 0 2.75 24h18.5A2.752 2.752 0 0 0 24 21.25V2.75A2.752 2.752 0 0 0 21.25 0zm-4 13H6.75a1 1 0 1 1 0-2h10.5a1 1 0 1 1 0 2z" />
		</svg>
	);
}
