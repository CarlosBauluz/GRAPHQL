import { MongoClient } from "mongodb"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./typeDefs.ts";
import { resolvers } from "./resolvers.ts";
import { GraphQLError } from "graphql";
import { Ejemplo } from "./type.ts";

const MONGO_URL = Deno.env.get("MONGO_URL")
if(!MONGO_URL) throw new Error("MONGO URL NOT EXISTS")
const API_KEY = Deno.env.get("API_KEY")
if(!API_KEY) throw new Error("API_KEY DOESNT EXIST")

const client = new MongoClient(MONGO_URL)
await client.connect()
console.log("Conectado a la base de datos")

const db = client.db("Ejemplo")
const ejemploCollection = db.collection("ejemplo")

const server = new ApolloServer({typeDefs, resolvers})

const { url } = await startStandaloneServer(server,{
  context: async() => ({ ejemploCollection })
})

console.log(`🚀  Server ready at: ${url}`);