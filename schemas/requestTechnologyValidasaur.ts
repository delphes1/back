import {
	required,
	isNumber,
	isString,
	validateObject,
	validateArray,
	isBool,
} from "https://deno.land/x/validasaur/mod.ts";

export const requestTechnologyValidasaur = {
	name: [required, isString],
	slug: [required, isString],
	infos: validateObject(true, {
		description: [required, isString],
		image: [isString],
	}),
	author: [required, isString],
	date: validateObject(true, {
		created: [required, isNumber],
		ended: [isNumber],
		deny: [isNumber],
	}),
	bundle: validateObject(true, {
		id: [isString],
		keywords: validateArray(true, [isString]),
	}),
	rating: validateArray(
		true,
		validateObject(true, {
			id_user: [required, isString],
			accept: [required, isBool],
			review: [required, isString],
			date: [required, isNumber],
			comments: validateArray(
				true,
				validateObject(true, {
					// ATTTENTION
					id_user: [isString], // A VOIR AVEC
					comment: [isString], // Aurelien pour les required
					date: [isNumber],
				})
			),
		})
	),
};
