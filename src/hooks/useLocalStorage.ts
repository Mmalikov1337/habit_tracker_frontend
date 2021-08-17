import LocalStorageHelper from "@src/helpers/LocalStorageHelper";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function useLocalStorage<T>(
	localStorageKey: string
): [T | null, Dispatch<SetStateAction<T | null>>] {
	const [localStorageValue, setLocalStorageValue] = useState<T | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const ls = isLoaded ? new LocalStorageHelper() : null;

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	useEffect(() => {
		if (isLoaded && ls) {
			const item = ls.getItem<T>(localStorageKey);
			if (!item) return;
			setLocalStorageValue(item);
		}
	}, [isLoaded]);

	useEffect(() => {
		if (!ls) return;
		ls.setItem<T>(localStorageKey, localStorageValue);
	}, [localStorageValue]);
	return [localStorageValue, setLocalStorageValue];
}
