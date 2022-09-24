import * as t from '../api/task/types'
import { Api } from '../models'

async function taskCreate(request: Api.TaskData | undefined): Promise<t.TaskCreateResponse> {
	throw 'Unimplemented'
}

async function getTask(): Promise<t.GetTaskResponse> {
	throw 'Unimplemented'
}


const api: t.TaskApi = {
	taskCreate,
	getTask,
}

export default api
