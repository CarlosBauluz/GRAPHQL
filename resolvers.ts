import { Collection, ObjectId } from "mongodb";
import { Ejemplo } from "./type.ts";
import { GraphQLError } from "graphql";



export const resolvers = {

    Query: {
        test: async(
            _:unknown,
            __:unknown,
            ___:unknown
        ):Promise<string> => {
            return "Hola"
        }
    },
    Mutation: {
        
    }
}