import db from "../config/databases.ts";
import hash from "../util/hash.ts";
import { validateJwt } from "https://deno.land/x/djwt@v0.9.0/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt@v0.9.0/create.ts";

import {
  validate,
  required,
  isEmail,
  isString,
} from "https://deno.land/x/validasaur/mod.ts";

const key = "your-secret";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};
// Defining schema interface
interface User {
  _id: { $oid: string };
  username: string;
  auth: {
    email?: string;
    password?: string;
  };
  stats: {
    created_at: Date;
    last_connexion: Date;
    number_connexion: number;
  };
  trust_points: number;
  infos: {
    avatar: string;
    bio: string;
    birthday: Date;
    sexe: number;
    company: string;
    location: string;
    network: {
      facebook: string;
      twitter: string;
      github: string;
      gitlab: string;
      linkedin: string;
      perso: [
        {
          nom: string;
          url: string;
        },
      ];
    };
    contact: {
      mail: string;
      microsoft: string;
      discord: string;
    };
  };
}

const usersCollection = db.collection<User>("users");

export default {
  async login(ctx: any) {
    // validation
    const value = await ctx.request.body().value;
    if (!Object.keys(value).length) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Please provide the required data!" };
      return;
    }
    const [passes, errors] = await validate(value, {
      email: [required, isEmail],
      password: [required, isString],
    });
    if (!passes) {
      ctx.response.body = errors;
      return;
    }

    if (value) {
      //fetch user
      const query: any = {
        "auth.email": value.email,
      };
      const userBeforeUpdate: any = await usersCollection.findOne(query);
      if (!userBeforeUpdate) {
        ctx.response.status = 422;
        ctx.response.body = { error: "Credentials doesn't match out" };
        return;
      }

      //verify password
      const passwordMatched: Boolean = hash.verify(
        userBeforeUpdate.auth.password,
        value.password,
      );
      if (!passwordMatched) {
        ctx.response.body = { error: "Password is incorrect" };
        return;
      }
      userBeforeUpdate.stats.number_connexion =
        userBeforeUpdate.stats.number_connexion + 1;
      const { matchedCount } = await usersCollection.updateOne(
        { _id: { $oid: userBeforeUpdate._id.$oid } },
        { $set: userBeforeUpdate },
      );
      const thmail = value.email;
      const payload: Payload = {
        thmail,
        exp: setExpiration(
          new Date().getTime() + 60 * 60 * 1000 * 24 * 30,
        ),
      };
      const tokenGenerated = await makeJwt({ header, payload, key });
      ctx.response.body = { token: tokenGenerated };
    }
  },
  async fetchUser(ctx: any) {
    try {
      const authorization = ctx.request.headers.get("Authorization");
      if (!authorization) {
        return;
      }
      const headerToken = authorization.replace("Bearer ", "");
      const isTokenValid = await validateJwt(headerToken, key, {
        isThrowing: false,
      });
      if (!isTokenValid) {
        ctx.response.status = 401; // unauthorized
        ctx.response.body = { error: "Unauthorized" };
        return;
      }
      //const user: any = isTokenValid.payload?.thmail;
      const email: any = isTokenValid.payload?.thmail;
      const query: any = {
        "auth.email": email,
      };
      const newUser = await usersCollection.findOne(query);
      console.log(newUser);
      ctx.response.body = { user: newUser };
      ctx.response.status = 200;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
};
