import React from "react";
import { ISVG } from "@src/types";
interface IFireSVG {
	className?: string;
}
export default function FireSVG(props: IFireSVG) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.6 54.5" className={props.className} width={50} height={50}>
			<path
				id="flame-f"
				fill="#FF7017"
				d="M21.8,54.5C9.761,54.5,0,45.205,0,33.738q0-6.92,7.941-17.775.952-1.3,2.017-2.662c.368-.463.785-.981,1.259-1.548Q13.493,9.023,21.8,0,43.6,22.273,43.6,33.738C43.6,45.205,33.839,54.5,21.8,54.5Zm0-8.175A10.649,10.649,0,0,0,32.7,35.943q0-5.731-10.9-16.868Q10.9,30.209,10.9,35.943A10.649,10.649,0,0,0,21.8,46.325Z"
			/>
		</svg>
	);
}
