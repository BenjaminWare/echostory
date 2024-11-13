"use server"

import { currentUser, User } from "@clerk/nextjs/server"
import { tursoClient } from "../utils/tursoClient"

export default async function updateDocument(id:string,title:string): Promise<string>{
      try {
      const user = await currentUser() as User
      const res = await tursoClient().execute({sql:"UPDATE document set title = ? where id = ? and user_id = ?",args:[title,id,user.id]})
      if (res.rowsAffected == 1) {
        return id
      }
      else {
        return ""
      }
      }
      catch (e) {
        console.log(e)
        return "Error Updating Document"
      }

  }

  