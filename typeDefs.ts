export const typeDefs = `#graphql
    type Restaurante {
        id: ID!
        nombre:String!
        direccion:String!
        telefono:String!
        temperatura:Int!
        time:String!
    }
    
    type Query {
        getRestaurant(id:ID!):Restaurante!
        getRestaurants:[Restaurante]!
    }

    type Mutation {
        addRestaurant(nombre:String!, direccioncalle:String!, ciudad:String!, telefono:String!):Restaurante!
        deleteRestaurant(id:ID!):Boolean!
    }
`