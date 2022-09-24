import * as mongoDB from "mongodb"

export const collections:{users?: mongoDB.Collection}={}

export const Questions:{ques?:mongoDB.Collection}={}

export const answers:{ans?:mongoDB.Collection}={}

export async function connectToDatabase() {
    const client:mongoDB.MongoClient=new mongoDB.MongoClient(
        "mongodb+srv://satya:8zDEWcY7NwEXKerR@cluster0.cdu8w6s.mongodb.net/?retryWrites=true&w=majority"
   
    )
    await client.connect()

    const db:mongoDB.Db=client.db("mydb")
    
    const users:mongoDB.Collection=db.collection("first")

    const ques:mongoDB.Collection=db.collection("second")
  
    const ans:mongoDB.Collection=db.collection("third")
    collections.users=users
    Questions.ques=ques
    answers.ans=ans
    
}

