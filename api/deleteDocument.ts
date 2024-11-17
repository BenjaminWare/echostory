"use server"

import { tursoClient } from "../utils/tursoClient"
import { currentUser,User} from "@clerk/nextjs/server"

export default async function deleteDocument(id:string): Promise<string>{
      try {
      // If user is null it fails
      const {id:user_id} = await currentUser() as User
      const res = await tursoClient().execute({sql:"DELETE FROM document where id = ? and user_id = ?",args:[id,user_id]})
      if (res.rowsAffected == 1) {
        return id
      }
      else {
        return ""
      }
      }
      catch (e) {
        return "Error Creating Document"
      }

  }

  