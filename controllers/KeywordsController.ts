import {
  validate,
  required,
  isString,
  maxLength,
} from "https://deno.land/x/validasaur/mod.ts";
import db from "../config/databases.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.10.1/mod.ts";

interface keyword {
  _id: {
    $oid: string;
  };

  language: string;
  title: string;
}

const keywordscollection = db.collection<keyword>("keywords");
export default {
  async createKeyword(ctx: any) {
    try {
      const value = await ctx.request.body().value;
      if (!Object.keys(value).length) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request can't be empty" };
        return;
      }
      const [passes, errors] = await validate(value, {
        language: [required, isString, maxLength(2)],
        title: [required, isString],
      });
      if (!passes) {
        ctx.response.body = errors;
        return;
      }
      const { language, title } = value;
      const insertKeyword = await keywordscollection.insertOne({
        language,
        title,
      });
      ctx.response.status = 201;
      ctx.response.body = insertKeyword;
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async fetchAllKeywords(ctx: any) {
    try {
      const fetchedKeywords: keyword[] = await keywordscollection.find();

      if (fetchedKeywords) {
        const fetchedKeywordsList = fetchedKeywords.length
          ? fetchedKeywords.map((keyword) => {
            const {
              _id: { $oid },
              language,
              title,
            } = keyword;
            return { id: $oid, language, title };
          })
          : [];
        ctx.response.status = 200;
        ctx.response.body = fetchedKeywordsList;
        return;
      }
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async fetchOneKeyword(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const fetchedKeyword = await keywordscollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedKeyword) {
        const {
          _id: { $oid },
          language,
          title,
        } = fetchedKeyword;
        ctx.response.status = 200;
        ctx.response.body = { id: $oid, language, title };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "Keyword not found" };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async updateKeyword(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const value = await ctx.request.body().value;
      const [passes, errors] = await validate(value, {
        language: [required, isString, maxLength(2)],
        title: [required, isString],
      });
      if (!passes) {
        ctx.response.body = errors;
        ctx.response.status = 500;
        return;
      }
      const { language, title } = value;

      if (!Object.keys(value).length) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Request can't be empty" };
        return;
      }

      const fetchedKeyword = await keywordscollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedKeyword) {
        const { matchedCount } = await keywordscollection.updateOne(
          { _id: { $oid: id } },
          { $set: { language, title } },
        );
        if (matchedCount) {
          ctx.response.status = 204;
          ctx.response.body = "Keyword updated successfully!";
          return;
        }
        ctx.response.status = 500;
        ctx.response.body = { error: "Unable to update Keyword!" };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "Keyword not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
  async deleteKeyword(ctx: any) {
    try {
      const { id } = ctx.params as { id: string };

      const fetchedKeyword = await keywordscollection.findOne({
        _id: { $oid: id },
      });

      if (fetchedKeyword) {
        const deleteCount = await keywordscollection.deleteOne({
          _id: { $oid: id },
        });

        if (deleteCount) {
          ctx.response.status = 204;
          ctx.response.body = "Keyword deleted successfully!";
          return;
        }
        ctx.response.status = 500;
        ctx.response.body = { error: "Unable to delete Keyword" };
        return;
      }
      ctx.response.status = 404;
      ctx.response.body = { error: "Keyword not found" };
      return;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = error;
    }
  },
};
