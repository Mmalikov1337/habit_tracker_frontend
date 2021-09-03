export default function parseJson<T>(str: string, defaultValue:any = []): T | any {
	try {
		return JSON.parse(str);
	} catch (e) {
		return defaultValue;
	}
}
