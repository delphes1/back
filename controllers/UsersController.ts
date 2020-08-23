import { validate } from "https://deno.land/x/validasaur/mod.ts";
import hash from "../util/hash.ts";
import db from "../config/databases.ts";
import { usersValidasaur } from "../schemas/usersValidasaur.ts";
import { uuid } from " https://deno.land/x/uuid/mod.ts";
import resetPassword from "./ResetPassword.ts";

interface User {
  _id: { $oid: string };
  username: string;
  auth: {
    email: string;
    password: string;
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
const userscollection = db.collection<User>("users");
export default {
  async createuser(ctx: any) {
    try {
      const value = await ctx.request.body().value;
      if (!Object.keys(value).length) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request can't be empty" };
        return;
      }
      const query: any = { "auth.email": value.auth.email };
      const fetchedUser: any = await userscollection.findOne(query);
      if (fetchedUser) {
        ctx.response.body = { error: "This email is already used" };
        ctx.response.status = 409;
        return;
      }
      //timestamp
      let time = Date.now();
      let statsinserted = {
        created_at: time,
        last_connexion: time,
        number_connexion: 1,
      };
      value.stats = statsinserted;
      value.trust_points = 100;
      const [passes, errors] = await validate(value, usersValidasaur);
      if (!passes) {
        ctx.response.status = 400;
        ctx.response.body = errors;
        return;
      }
      const user = value;
      user.auth.password = hash.bcrypt(user.auth.password);
      const insertedUser = await userscollection.insertOne(user);
      ctx.response.status = 201;
      ctx.response.body = insertedUser;
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async fetchAllUsers(ctx: any) {
    try {
      const fetchedUsers: User[] = await userscollection.find();

      if (fetchedUsers) {
        const fetchedUsersList = fetchedUsers.length
          ? fetchedUsers.map((User) => {
            const {
              _id: { $oid },
              username,
              auth,
              stats,
              trust_points,
              infos,
            } = User;
            return {
              id: $oid,
              username,
              auth,
              stats,
              trust_points,
              infos,
            };
          })
          : [];
        ctx.response.status = 200;
        ctx.response.body = fetchedUsersList;
        return;
      }
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async fetchOneUser(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const fetchedUser = await userscollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedUser) {
        const {
          _id: { $oid },
          username,
          auth,
          stats,
          trust_points,
          infos,
        } = fetchedUser;
        ctx.response.status = 200;
        ctx.response.body = {
          id: $oid,
          username,
          auth,
          stats,
          trust_points,
          infos,
        };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "User not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },

  async updateUser(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const value = await ctx.request.body().value;
      const [passes, errors] = await validate(value, usersValidasaur);
      if (!passes) {
        ctx.response.body = errors;
        ctx.response.status = 500;
        return;
      }

      if (!Object.keys(value).length) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request can't be empty" };
        return;
      }
      const user: User = value;
      const fetchedUser = await userscollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedUser) {
        const { matchedCount } = await userscollection.updateOne(
          { _id: { $oid: id } },
          { $set: user },
        );
        if (matchedCount) {
          ctx.response.status = 204;
          ctx.response.body = "User updated successfully!";
          return;
        }
        ctx.response.status = 500;
        ctx.response.body = { error: "Unable to update User" };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "User not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async deleteUser(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const fetchedUser = await userscollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedUser) {
        const deleteCount = await userscollection.deleteOne({
          _id: { $oid: id },
        });

        if (deleteCount) {
          ctx.response.status = 204;
          ctx.response.body = "User deleted successfully!";
          return;
        }
        ctx.response.status = 500;
        ctx.response.body = { error: "Unable to delete User" };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "User not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async forgotPassword(ctx: any) {
    try {
      const value = await ctx.request.body().value;
      if (!Object.keys(value).length) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request can't be empty" };
        return;
      }
      const query: any = {
        "auth.email": value.email,
      };
      const fetchedUser: any = await userscollection.findOne(query);
      if (!fetchedUser) {
        ctx.response.status = 404;
        ctx.response.body = { error: "Email not found" };
        return;
      }
      const myUUID = uuid();
      fetchedUser.resetToken = myUUID;
      resetPassword.reset(fetchedUser.auth.email, fetchedUser.username);
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async uploadImage(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };
      const value = await ctx.request.body().value;

      const fetchedUser: any = await userscollection.findOne({
        _id: { $oid: id },
      });
      fetchedUser.avatar = value.image;
      const { matchedCount } = await userscollection.updateOne(
        { _id: { $oid: fetchedUser._id.$oid } },
        { $set: fetchedUser },
      );
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
};
