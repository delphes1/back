import {
	required,
	isNumber,
	isString,
	isEmail,
	validateObject,
	validateArray,
	minNumber,
	maxNumber,
} from "https://deno.land/x/validasaur/mod.ts";

export const bundleValidasaur = {
	name: validateArray(
		true,
		validateObject(true, {
			language: [required, isString],
			title: [required, isString],
		})
	),
	keywords: validateArray(true, [isString]),
	folder: [required, isString],
	infos: validateObject(true, {
		description: [required, isString],
	}),
	stats: validateObject(true, {
		created_at: [required, isNumber],
		number_views: [required, isNumber, minNumber(0)],
	}),
	functions: validateArray(
		true,
		validateObject(true, {
			id_version: [required, isString],
			revisions: validateArray(
				true,
				validateObject(true, {
					author: [required, isString],
					date: [required, isNumber],
				})
			),
		})
	),
};
