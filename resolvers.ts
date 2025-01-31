import { Collection, ObjectId } from "mongodb";
import { Restaurante } from "./type.ts";
import { GraphQLError } from "graphql";
import {   geoLocalitation, timeIRL, timezonesObtener } from "./utils.ts";
import { tempIRL } from "./utils.ts";

type MutationArgs ={
    nombre:string,
    direccioncalle:string,
    ciudad: string,
    telefono:string,
    id:string,
}

type Context= {
    restauranteCollection: Collection<Restaurante>
}

export const resolvers = {

    Restaurante: {
        id: (parent: Restaurante) => parent._id?.toString(),
        direccion: async(parent: Restaurante) => parent.direccioncalle+", "+parent.ciudad +", "+ (await timezonesObtener(parent.telefono)).country,
        temperatura: async(parent:Restaurante) => {return await tempIRL((await geoLocalitation(parent.ciudad)).latitude, (await geoLocalitation(parent.ciudad)).longitude)},
        time: async(parent:Restaurante) => (await timeIRL((await timezonesObtener(parent.telefono)).timezones)).hour + " : "+(await timeIRL((await timezonesObtener(parent.telefono)).timezones)).minute
    },

    Query: {
        getRestaurant: async(
            _:unknown,
            args:MutationArgs,
            context:Context
        ):Promise<Restaurante> =>{
            const resultado = await context.restauranteCollection.findOne({_id:new ObjectId(args.id)})
            if(!resultado) throw new GraphQLError("No se ha podido encontrar el restaurante con ese Id")
            return resultado
        },

        getRestaurants:async(
            _:unknown,
            __:unknown,
            context:Context
        ):Promise<Restaurante[]> =>{
            const resultado = await context.restauranteCollection.find().toArray()
            //if(!resultado){throw new GraphQLError("No hay restaurantes en la base de datos")}
            return resultado
        }



    },
    Mutation: {
        addRestaurant: async(
            _:unknown,
            args:MutationArgs,
            context:Context
        ):Promise<Restaurante> =>{
            const valido = (await timezonesObtener(args.telefono)).is_valid
            if(!valido)throw new GraphQLError("El telefono insertado es incorrecto")
            const valido2 = await context.restauranteCollection.findOne({telefono:args.telefono})
            if(valido2)throw new GraphQLError("Ya existe este telefono")
            const {insertedId} = await context.restauranteCollection.insertOne({
                nombre: args.nombre,
                telefono: args.telefono,
                ciudad: args.ciudad,
                direccioncalle: args.direccioncalle
            }) 
            if(!insertedId){ throw new GraphQLError("No se ha podido añadir el restaurante")}
            const resultado = await context.restauranteCollection.findOne({_id: insertedId})
            if(!resultado){throw new GraphQLError("No se ha podido encontrar el restaurante añadido en la base de datos")}
            return resultado
        },

        deleteRestaurant: async(
            _:unknown,
            args:MutationArgs,
            context:Context
        ):Promise<boolean> =>{
            const {deletedCount} = await context.restauranteCollection.deleteOne({_id:new ObjectId(args.id)})
            if(!deletedCount) return false
            return true
        }
    }
}