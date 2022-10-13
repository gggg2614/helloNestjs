import { Connection } from "mongoose";
import { userSchema } from "../server/user/user.schema";

export const userProviders=[
    {
        provide:'USER_MODEL',
        useFactory:(connection:Connection)=>connection.model('User',userSchema),
        Inject:['DATABASE_CONNECTION']
    }
]