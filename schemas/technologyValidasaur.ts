import {
	required,
	isNumber,
	isString,
	validateObject,
	minNumber,
	validateArray,
} from "https://deno.land/x/validasaur/mod.ts";

export const technologyValidasaur = {
	name: [required, isString],
	slug: [required, isString],
	infos: validateObject(true, {
		description: [required, isString],
	}),
	versions: validateArray(
		true,
		validateObject(true, {
			name: [required, isString],
			slug: [required, isString],
			date: [required, isNumber],
		})
	),
	parents: validateArray(
		true,
		validateObject(true, {
			order: [required, isNumber, minNumber(1)],
			id: [required, isString],
		})
	),
};
