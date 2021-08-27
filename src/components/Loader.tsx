import React from "react";
interface LoaderProps {
	renderCondition: Boolean;
}
export default function Loader(props:LoaderProps) {
	if (!props.renderCondition) {
		return null;
	}
	return (
		<div id="bowlG">
			<div id="bowl_ringG">
				<div className="ball_holderG">
					<div className="ballG"></div>
				</div>
			</div>
		</div>
	);
}
