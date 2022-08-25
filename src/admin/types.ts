import * as mongoDB from "mongodb"

export const collections:{users?: mongoDB.Collection}={}

export async function connectToDatabase() {
    const client:mongoDB.MongoClient=new mongoDB.MongoClient(
        "mongodb+srv://satya:8zDEWcY7NwEXKerR@cluster0.cdu8w6s.mongodb.net/?retryWrites=true&w=majority"
    )

    await client.connect()

    const db:mongoDB.Db=client.db("db")
    
    const users:mongoDB.Collection=db.collection("user")

    collections.users=users
}