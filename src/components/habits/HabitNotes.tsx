import { INotesParsed } from "@src/types";
import React from "react";
import BoldPlusSVG from "../SVG/BoldPlus";
interface IHabitNotes {
	notes: INotesParsed[];
	onSave: (notes: INotesParsed[]) => void;
}
const counter = { val: 0 };
export default React.memo(function HabitNotes(props: IHabitNotes) {
	console.log("HabitNotes re-render", ++counter.val);

	const [title, setTitle] = React.useState("");
	const [text, setText] = React.useState("");
	const [selected, setSelected] = React.useState(-1);
	// const tempNotes = props.notes;

	const save = async () => {
		const temp = props.notes.concat();
		if (!title || !text) return;
		if (selected === -1) {
			temp.push({ title, text });
			setTitle(temp[selected+1].title);
			setText(temp[selected+1].text);
			setSelected(selected + 1);
		} else {
			if (!temp[selected]) {
				return;
			}
			temp[selected] = { title, text };
		}
		await props.onSave(temp);
	};
	const del = async () => {
		const temp = props.notes.concat();
		if (selected === -1 || !temp[selected]) return;

		temp[selected] = { title, text };
		temp.splice(selected, 1);
		await props.onSave(temp);
		const nextIndex = selected === -1 ? selected : selected - 1;
		const nextText = temp[selected] ? temp[selected].text : "";
		const nextTitle = temp[selected] ? temp[selected].title : "";
		setTitle(nextTitle);
		setText(nextText);
		setSelected(nextIndex);
	};

	return (
		<div className="habit_detail__notes__container">
			<div className="habit_detail__notes__input">
				<p>Title</p>
				<input
					type="text"
					className="text_input"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<p>Text</p>
				<textarea
					className="text_input textarea"
					value={text}
					onChange={(e) => setText(e.target.value)}
				></textarea>
				<div className="habit_detail__notes__buttons">
					<button className="btn btn-md" onClick={async () => await save()}>
						Save
					</button>
					<button className="btn btn-md btn-red" onClick={async () => await del()}>
						Delete
					</button>
				</div>
			</div>
			{props.notes.length !== 0 && (
				<div className="habit_detail__notes__list">
					{props.notes.map((it, index) => (
						<div
							className={`habit_detail__notes__row ${index === selected ? "active" : ""}`}
							onClick={() => {
								setSelected(index);
								setTitle(it.title);
								setText(it.text);
							}}
							key={`${index}${it.title}`}
						>
							<span>{index + 1}.</span> <p>{it.title}</p>
						</div>
					))}

					<div className="habit_detail__notes__row add">
						<BoldPlusSVG />
					</div>
				</div>
			)}
		</div>
	);
});
