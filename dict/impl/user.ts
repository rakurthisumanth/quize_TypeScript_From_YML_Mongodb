import * as t from '../api/user/types'
import { Api } from '../models'

async function userCreate(request: Api.User | undefined): Promise<t.UserCreateResponse> {
	throw 'Unimplemented'
}

async function deleteUser(email: string): Promise<t.DeleteUserResponse> {
	throw 'Unimplemented'
}

async function getUser(): Promise<t.GetUserResponse> {
	throw 'Unimplemented'
}

async function updateUser(email: string, request: Api.User | undefined): Promise<t.UpdateUserResponse> {
	throw 'Unimplemented'
}


const api: t.UserApi = {
	userCreate,
	deleteUser,
	getUser,
	updateUser,
}

export default api
