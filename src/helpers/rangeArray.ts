export default function rangeArray(size: number, start: number = 0) {
	return [...Array(size).keys()].map((i) => i + start);
}
