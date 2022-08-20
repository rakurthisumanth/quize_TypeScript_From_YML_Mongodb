import * as mongoDB from "mongodb"

export const collections:{users?: mongoDB.Collection}={}

export async function connectToDatabase() {
    const client:mongoDB.MongoClient=new mongoDB.MongoClient(
        "mogodb host Url-future wii be updated",
        {
         tlsCAFile: `rds-combined-ca-bundle.pem`
        }
    )

    await client.connect()

    const db:mongoDB.Db=client.db("database_name future will be updated")
    
    const users:mongoDB.Collection=db.collection("collection name add in futuree")

    collections.users=users
}