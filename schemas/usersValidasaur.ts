import {
  required,
  isNumber,
  isString,
  validateObject,
  isEmail,
  minNumber,
  maxNumber,
} from "https://deno.land/x/validasaur/mod.ts";
export const usersValidasaur = {
  username: [required, isString],
  auth: validateObject(true, {
    email: [required, isEmail],
    password: [required, isString],
  }),
  stats: validateObject(true, {
    created_at: [required, isNumber],
    last_connexion: [required, isNumber],
    number_connexion: isNumber,
  }),
  trust_points: [required, isNumber, minNumber(0), maxNumber(200)],
  infos: validateObject(false, {
    avatar: [isString],
    bio: [isString],
    birthday: [isNumber],
    sexe: [isNumber, minNumber(0), maxNumber(2)],
    company: [isString],
    location: [isString],
    network: validateObject(false, {
      facebook: [isString],
      twitter: [isString],
      github: [isString],
      gitlab: [isString],
      linkedin: [isString],
      perso: validateObject(false, {
        nom: [isString],
        url: [isString],
      }),
    }),
    contact: validateObject(false, {
      mail: [isEmail],
      microsoft: [isString],
      discord: [isString],
    }),
  }),
};
