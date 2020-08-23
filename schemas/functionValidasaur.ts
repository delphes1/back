import {
  required,
  isNumber,
  isString,
  validateObject,
  validateArray,
  minNumber,
} from "https://deno.land/x/validasaur/mod.ts";

export const functionValidasaur = {
  language: [required, isString],
  title: [required, isString],
  infos: validateObject(true, {
    description: [required, isString],
  }),
  stats: validateObject(true, {
    created_at: [required, isNumber],
    number_views: [required, isNumber, minNumber(0)],
  }),
  initial_author: [required, isString],
  id_version: [required, isString],
  revisions: validateArray(
    true,
    validateObject(true, {
      author: [required, isString],
      date: [required, isNumber],
    }),
  ),
  functionString: [required, isString],
};
