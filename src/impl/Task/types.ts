import { AnswerCreateResponse, CreateQuestionsResponse, GetAnswerResponse,  GetGetAnswersResponse, GetGetQuestionsResponse, GetTaskResponse, TaskApi, TaskCreateResponse } from "../../../dict/api/task/types";
import { Api } from "../../../dict/models";
import { answers, collections, Questions } from "../../admin/types";




export class TaskApiImpl implements TaskApi{
    taskCreate(request: Api.TaskData | undefined):Promise<TaskCreateResponse>{
        return new Promise<TaskCreateResponse>((resolve,reject)=>{
              try{
                collections.users?.findOne({topic:request?.topic},function(err:any,res:any){
                    if(res){
                        const response=<TaskCreateResponse>{
                            status:201,
                            body:{message:"Already Task Exist"}

                        }
                        resolve(response)
                    }
                    else{
                        collections.users?.insertOne({id:request?.id,topic:request?.topic},function(err:any,res:any){
                            if(err){
                                const response=<TaskCreateResponse>{
                                    status:400,
                                    body:{message:"Task Create Failure"}
                                }
                                resolve(response)
                            }
                            else{
                                const response=<TaskCreateResponse>{
                                    status:201,
                                    body:{message:"Task Create Sucessss"}
                                }
                                resolve(response)
                            }
                        })
                    }
                })
              }
              catch(err){
                const response=<TaskCreateResponse>{
                    status:400,
                    body:{message:"Something went Wrong"}
                }
                resolve(response)
              }
        })
    }

    getTask():Promise<GetTaskResponse>{
        return new Promise<GetTaskResponse>((resolve,reject)=>{
            try{
                collections.users?.find({}).toArray(function(err:any,res:any){
                    if(err){
                        const response=<GetTaskResponse>{
                            status:400,
                            body:{message:"Get User Failure"}

                        }
                        resolve(response)
                    }
                    const response=<GetTaskResponse>{
                        status:201,
                        body:res
                    }
                    resolve(response)
                })
            }
            catch(err){
                const response=<GetTaskResponse>{
                    status:400,
                    body:{message:"Somethig Went Wrong"}
                }
            }
        })
    }

    createQuestions(request: Api.QuestionData | undefined):Promise<CreateQuestionsResponse>{
        return new Promise<CreateQuestionsResponse>((resolve,reject)=>{
            Questions?.ques?.findOne({QuestionId:request?.QuestionId},function(err:any,res:any){
                if(res){
                    const response=<CreateQuestionsResponse>{
                        status:400,
                        body:{message:"Already Question Exist"}
                    }
                    resolve(response)
                }
                else{
                    Questions.ques?.insertOne({topicid:request?.topicid,question:request?.question,optionA:request?.optionA,optionB:request?.optionB,optionC:request?.optionC,optionD:request?.optionD,QuestionId:request?.QuestionId},
                        
                    function(err:any,res:any){
                        if(err){
                            const response=<CreateQuestionsResponse>{
                                status:400,
                                body:{message:"ques Create Failure"}
                            }
                            resolve(response)
                        }
                        else{
                            const response=<CreateQuestionsResponse>{
                                status:201,
                                body:{message:"questions Create Sucessss"}
                            }
                            resolve(response)
                        }
                    })
                }
            })
        })
    }
    getGetQuestions(topicid: string):Promise<GetGetQuestionsResponse>{
        return new Promise<GetGetQuestionsResponse>((resolve,reject)=>{
            Questions.ques?.find({topicid:topicid}).toArray(function(err:any,res:any){
                if(err){
                    const response=<GetGetQuestionsResponse>{
                        status:400,
                        body:{message:"ques Create Failure"}
                    }
                    resolve(response)
                }
                else{
                    const response=<GetGetQuestionsResponse>{
                        status:201,
                        body:res
                    }
                    resolve(response)
                }

            })
        })
    }

    answerCreate(request: Api.AnswerData | undefined):Promise<AnswerCreateResponse>{
        return new Promise<AnswerCreateResponse>((resolve,reject)=>{
            try{
                answers.ans?.findOne({QuestionId:request?.QuestionId},function(err:any,res:any){
                    if(res){
                        const response=<AnswerCreateResponse>{
                            status:400,
                            body:{message:"Already Question Exist"}

                        }
                        resolve(response)
                    }
                    else{
                        answers.ans?.insertOne({QuestionId:request?.QuestionId,answer:request?.answer},function(err:any,res:any){
                            if(err){
                                const response=<AnswerCreateResponse>{
                                    status:400,
                                    body:{message:"Answer Create Failure"}
                                }
                                resolve(response)
                            }
                            else{
                                const response=<AnswerCreateResponse>{
                                    status:201,
                                    body:{message:"Answer Create Sucessss"}
                                }
                                resolve(response)
                            }
                        })
                    }
                })
              }
              catch(err){
                const response=<AnswerCreateResponse>{
                    status:400,
                    body:{message:"Something went Wrong"}
                }
                resolve(response)
              }
            

        })
    }

    getGetAnswers():Promise<GetGetAnswersResponse>{
        return new Promise<GetGetAnswersResponse>((resolve,reject)=>{
            answers.ans?.find({}).toArray(function(err:any,res:any){
              if(err){
                const response=<GetGetAnswersResponse>{
                    status:400,
                    body:{message:"GetAnswer Failure"}
                }
                resolve(response)
              }
              else{
                const response=<GetGetAnswersResponse>{
                    status:200,
                    body:res
                }
                resolve(response)
              }
            })
        })

    }


    getAnswer(QuestionId: string | undefined):Promise<GetAnswerResponse>{
        return new Promise<GetAnswerResponse>((resolve,reject)=>{
            answers.ans?.find({QuestionId:QuestionId}).toArray(function(err:any,res:any){
                if(err){
                    const response=<GetAnswerResponse>{
                        status:400,
                        body:{message:"Get Answer Failure"}
                    }
                    resolve(response)
                }
                const response=<GetAnswerResponse>{
                    status:200,
                    body:res
                }
                resolve(response)
            })
        })
    }

    
}