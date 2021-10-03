import React from "react";

type setValueOptions = {
	shouldValidate: boolean;
	shouldDirty: boolean;
};
export interface IProps<T> {
	storage?: typeof localStorage | typeof sessionStorage;
	watch: (arr: T[]) => unknown[];
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	setValue: (name: any, key: string, options: setValueOptions) => void;
	storageKey: string;
	fieldsToBeSaved: T[];
	clearStorageOnUnmount?: boolean;
	validate?: boolean | T[];
	dirty?: boolean | T[];
}

export default function <T>({
	watch,
	setValue,
	storageKey,
	storage = localStorage,
	fieldsToBeSaved,
	clearStorageOnUnmount = false,
	dirty = false,
	validate = false,
}: IProps<T>): () => void {
	const target = fieldsToBeSaved;
	React.useEffect(() => {
		const data = JSON.parse(storage.getItem(storageKey) || "[]");
		data.length &&
			data.forEach(
				(val: string, i: number) =>
					val &&
					setValue(target[i], val, {
						shouldValidate:
							validate === true || (validate && validate.includes(target[i])),
						shouldDirty: dirty === true || (dirty && dirty.includes(target[i])),
					})
			);
		return () => {
			if (clearStorageOnUnmount) {
				storage.removeItem(storageKey);
			}
		};
	}, []);
	const values = watch(target);
	React.useEffect(() => {
		storage.setItem(storageKey, JSON.stringify(values));
	}, values);
	return () => storage.removeItem(storageKey);
}
