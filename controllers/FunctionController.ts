import { validate } from "https://deno.land/x/validasaur/mod.ts";
import db from "../config/databases.ts";
import { functionValidasaur } from "../schemas/functionValidasaur.ts";

interface Function {
  _id: { $oid: string };

  language: string;
  title: string;
  infos: {
    description: string;
  };
  stats: {
    created_at: number;
    number_views: number;
  };
  initial_author: string;
  id_version: string;
  revisions: [
    {
      author: string;
      date: number;
    },
  ];
  functionString: string;
}
const functionCollection = db.collection<Function>("functions");

export default {
  async createFunction(ctx: any) {
    try {
      const value = await ctx.request.body().value;
      if (!Object.keys(value).length) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request can't be empty" };
        return;
      }
      const [passes, errors] = await validate(value, functionValidasaur);
      if (!passes) {
        ctx.response.body = errors;
        return;
      }
      const functions = value;
      const insertFunction = await functionCollection.insertOne(functions);
      ctx.response.status = 201;
      ctx.response.body = insertFunction;
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async fetchAllFunction(ctx: any) {
    try {
      const fetchedFunction: Function[] = await functionCollection.find();

      if (fetchedFunction) {
        const fetchedFunctionList = fetchedFunction.length
          ? fetchedFunction.map((functions) => {
            const {
              _id: { $oid },
              language,
              title,
              infos,
              stats,
              initial_author,
              id_version,
              revisions,
              functionString,
            } = functions;
            return {
              id: $oid,
              language,
              title,
              infos,
              stats,
              initial_author,
              id_version,
              revisions,
              functionString,
            };
          })
          : [];
        ctx.response.status = 200;
        ctx.response.body = fetchedFunctionList;
        return;
      }
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async fetchOneFunction(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const fetchedFunction = await functionCollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedFunction) {
        const {
          _id: { $oid },
          language,
          title,
          infos,
          stats,
          initial_author,
          id_version,
          revisions,
          functionString,
        } = fetchedFunction;
        ctx.response.status = 200;
        ctx.response.body = {
          _id: $oid,
          language,
          title,
          infos,
          stats,
          initial_author,
          id_version,
          revisions,
          functionString,
        };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "Function not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async updateFunction(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const value = await ctx.request.body().value;
      const [passes, errors] = await validate(value, functionValidasaur);
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
      const functions: Function = value;
      const fetchedFunction = await functionCollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedFunction) {
        const { matchedCount } = await functionCollection.updateOne(
          { _id: { $oid: id } },
          { $set: functions },
        );
        if (matchedCount) {
          ctx.response.status = 204;
          ctx.response.body = "Function updated successfully!";
          return;
        }
        ctx.response.status = 500;
        ctx.response.body = { error: "Unable to update Function" };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "Function not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async deleteFunction(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const fetchedFunction = await functionCollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedFunction) {
        const deleteCount = await functionCollection.deleteOne({
          _id: { $oid: id },
        });

        if (deleteCount) {
          ctx.response.status = 204;
          ctx.response.body = "Function deleted successfully!";
          return;
        }
        ctx.response.status = 500;
        ctx.response.body = { error: "Unable to delete Function" };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "Function not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
};
