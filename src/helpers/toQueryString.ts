export default function toQueryString(arr?: Array<any>) {
	if (!arr) return "";
	if (arr.length === 0) return "";
	// console.log("arr", arr);
	
	const temp = arr.map((it) => {
		const obj = Object.entries(it)[0];
		// console.log("OBJ",obj, it);
		return `${obj[0]}=${obj[1]}`; //0 - key, 1 - value
	});

	console.log("JOIN",temp, temp.join("&"));
	
	return "?" + temp.join("&");
}
