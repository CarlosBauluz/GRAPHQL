import { Double, OptionalId } from "mongodb";

export type Restaurante = OptionalId<{
    nombre:string,
    direccioncalle:string,
    ciudad: string,
    telefono:string
}>

export type geoLocalitation = {
    latitude: Double,
    longitude: Double
}

export type ValidatePhone = {
    timezones: string[],
    is_valid:boolean,
    country:string
}

export type timeIRLT = {
    hour: string,
    minute:string
}

export type Clima = {
    temp: Double
}