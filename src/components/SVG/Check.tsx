import React from "react";
interface ICheckSVG {
	className?: string;
}
export default function CheckSVG(props: ICheckSVG) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={50}
			height={50}
			viewBox="0 0 27 27"
			className={props.className}
		>
			<g id="Group_1571" data-name="Group 1571" transform="translate(0 -10)">
				<rect
					id="Rectangle_67"
					data-name="Rectangle 67"
					width={27}
					height={27}
					rx="13.5"
					transform="translate(0 10)"
					fill="#FF7017"
				/>
				<path
					id="check"
					d="M5.486,9.73a1,1,0,0,1-.707-.292L.537,5.2A1,1,0,1,1,1.95,3.78L5.485,7.315,11.85.952a1,1,0,0,1,1.415,1.414L6.193,9.438A1,1,0,0,1,5.486,9.73Z"
					transform="translate(6.756 18.341)"
					fill="#fff"
				/>
			</g>
		</svg>
	);
}
