"use server"

import { tursoClient } from "../utils/tursoClient"
import { currentUser,User} from "@clerk/nextjs/server"

export default async function createDocument(id:string,title:string,text:string,created_at:string): Promise<string>{
      try {
      // If user is null it fails
      const vector:number[] = new Array(256).fill(0)
      const {id:user_id} = await currentUser() as User
      const res = await tursoClient().execute({sql:"INSERT INTO document (id,title,text,created_at,vector,user_id) values (?,?,?,?,?,?)",args:[id,title,text,created_at,JSON.stringify(vector),user_id]})
      if (res.rowsAffected == 1) {
        return id
      }
      else {
        return ""
      }
      }
      catch (e) {
        console.log(e)
        return "Error Creating Document"
      }

  }

  