import { validate } from "https://deno.land/x/validasaur/mod.ts";
import db from "../config/databases.ts";
import { technologyValidasaur } from "../schemas/technologyValidasaur.ts";

interface Technology {
  _id: { $oid: string };
  name: string;
  slug: string;
  infos: {
    description: string;
  };
  versions: [
    {
      name: string;
      slug: string;
      date: number;
    },
  ];
  parents: [
    {
      order: number;
      id: string;
    },
  ];
}

const technologyCollection = db.collection<Technology>("technology");

export default {
  async createTechnology(ctx: any) {
    try {
      const value = await ctx.request.body().value;
      if (!Object.keys(value).length) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request can't be empty" };
        return;
      }
      const [passes, errors] = await validate(
        value,
        technologyValidasaur,
      );
      if (!passes) {
        ctx.response.body = errors;
        return;
      }
      const technology = value;
      const insertTechnology = await technologyCollection.insertOne(
        technology,
      );
      ctx.response.status = 201;
      ctx.response.body = insertTechnology;
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async fetchAllTechnology(ctx: any) {
    try {
      const fetchedTechnology: Technology[] = await technologyCollection.find();

      if (fetchedTechnology) {
        const fetchedTechnologyList = fetchedTechnology.length
          ? fetchedTechnology.map((technology) => {
            const {
              _id: { $oid },
              name,
              slug,
              infos,
              versions,
              parents,
            } = technology;
            return {
              id: $oid,
              name,
              slug,
              infos,
              versions,
              parents,
            };
          })
          : [];
        ctx.response.status = 200;
        ctx.response.body = fetchedTechnologyList;
        return;
      }
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async fetchOneTechnology(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const fetchedTechnology = await technologyCollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedTechnology) {
        const {
          _id: { $oid },
          name,
          slug,
          infos,
          versions,
          parents,
        } = fetchedTechnology;
        ctx.response.status = 200;
        ctx.response.body = {
          _id: $oid,
          name,
          slug,
          infos,
          versions,
          parents,
        };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "Technology not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async updateTechnology(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const value = await ctx.request.body().value;
      const [passes, errors] = await validate(
        value,
        technologyValidasaur,
      );
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
      const technology: Technology = value;
      const fetchedTechnology = await technologyCollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedTechnology) {
        const { matchedCount } = await technologyCollection.updateOne(
          { _id: { $oid: id } },
          { $set: technology },
        );
        if (matchedCount) {
          ctx.response.status = 204;
          ctx.response.body = "Technology updated successfully!";
          return;
        }
        ctx.response.status = 500;
        ctx.response.body = { error: "Unable to update Technology" };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "Technology not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async deleteTechnology(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const fetchedTechnology = await technologyCollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedTechnology) {
        const deleteCount = await technologyCollection.deleteOne({
          _id: { $oid: id },
        });

        if (deleteCount) {
          ctx.response.status = 204;
          ctx.response.body = "Technology deleted successfully!";
          return;
        }
        ctx.response.status = 500;
        ctx.response.body = { error: "Unable to delete Technology" };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "Technology not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
};
