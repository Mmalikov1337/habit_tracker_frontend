export default class LocalStorageHelper {
	setItem<T>(key: string, object: T | null) {
		if (!object) {
			console.log("LocalStorageHelper setItem wrong object.", object, key);
			return;
		}
		const stringifyed = JSON.stringify(object);
		window.localStorage.setItem(key, stringifyed);
	}
	getItem<T>(key: string) {
		const item = window.localStorage.getItem(key);
		if (!item) {
			console.log("LocalStorageHelper item wrong.", item, key);
			return;
		}
		const parsed: T = JSON.parse(item);
		return parsed;
	}
	removeItem(key: string){
		window.localStorage.removeItem(key)
	}
}
