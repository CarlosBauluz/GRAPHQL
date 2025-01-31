import { GraphQLError } from "graphql"
import { Double } from "mongodb";

export const geoLocalitation = async(ciudad: string) =>{
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY)throw new GraphQLError("Falta la key o está incorrecta")
    const url = `https://api.api-ninjas.com/v1/city?name=${ciudad}`

    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })

    if(data.status !== 200)throw new GraphQLError("No se ha podido acceder al dato")
    const resultado = await data.json()

    return {
        latitude: resultado.at(0).latitude,
        longitude: resultado.at(0).longitude
    }

} 

export const timezonesObtener = async(telefono: string) =>{
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY)throw new GraphQLError("Falta la key o está incorrecta")
    const url = `https://api.api-ninjas.com/v1/validatephone?number=${telefono}`

    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })

    if(data.status !== 200)throw new GraphQLError("No se ha podido acceder al dato")
    const resultado= await data.json()

    return {
        timezones: resultado.timezones[0],
        is_valid:resultado.is_valid,
        country: resultado.country
    }

} 

export const timeIRL = async(timezones: string) =>{
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY)throw new GraphQLError("Falta la key o está incorrecta")
    const url = `https://api.api-ninjas.com/v1/worldtime?timezone=${timezones}`

    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })

    if(data.status !== 200)throw new GraphQLError("No se ha podido acceder al dato")
    const resultado= await data.json()

    return {
        hour: resultado.hour,
        minute: resultado.minute
    }
} 

export const tempIRL = async(lat: Double, lon:Double) =>{
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY)throw new GraphQLError("Falta la key o está incorrecta")
    const url = `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`
    

    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })



    if(data.status !== 200)throw new GraphQLError("No se ha podido acceder al dato temperatura")
    const resultado= await data.json()

    return resultado.temp
}