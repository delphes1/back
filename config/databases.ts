import { MongoClient } from "https://deno.land/x/mongo@v0.9.2/mod.ts";

const client = new MongoClient();

client.connectWithUri("mongodb://admin:SamiAurelien@ipiteam.site:27017");

const db = client.database("code_survive");

export default db;
