import { UserApiImpl } from "./user/types";
import { UserApi } from "../../dict/api/user/types";
import { ApiImplementation } from "../../dict/types";
export class serviceApiimpl implements ApiImplementation {
    user: UserApiImpl=new UserApiImpl 
}