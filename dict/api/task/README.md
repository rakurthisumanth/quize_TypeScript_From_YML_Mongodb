# Task

## Operations

### getAnswer

```http
GET /Answer/{QuestionId}
```

Get Answer

### createQuestions

```http
POST /CreateQuestions
```

CreateQuestions

### taskCreate

```http
POST /createTask
```

Task Create

### getGetAnswers

```http
GET /GetAnswers
```

Get Answer

### getGetQuestions

```http
GET /GetQuestions/{topicid}
```


### getTask

```http
GET /getTasks
```

GetTask

### answerCreate

```http
POST /PostAnswer
```

Answer Create

## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
async function getAnswer(questionId: string): Promise<t.GetAnswerResponse> {
	throw 'Unimplemented'
}

async function createQuestions(request: Api.QuestionData | undefined): Promise<t.CreateQuestionsResponse> {
	throw 'Unimplemented'
}

async function taskCreate(request: Api.TaskData | undefined): Promise<t.TaskCreateResponse> {
	throw 'Unimplemented'
}

async function getGetAnswers(): Promise<t.GetGetAnswersResponse> {
	throw 'Unimplemented'
}

async function getGetQuestions(topicid: string): Promise<t.GetGetQuestionsResponse> {
	throw 'Unimplemented'
}

async function getTask(): Promise<t.GetTaskResponse> {
	throw 'Unimplemented'
}

async function answerCreate(request: Api.AnswerData | undefined): Promise<t.AnswerCreateResponse> {
	throw 'Unimplemented'
}


const api: t.TaskApi = {
	getAnswer,
	createQuestions,
	taskCreate,
	getGetAnswers,
	getGetQuestions,
	getTask,
	answerCreate,
}

export default api
```
