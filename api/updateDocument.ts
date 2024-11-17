"use server"

import { currentUser, User } from "@clerk/nextjs/server"
import { tursoClient } from "../utils/tursoClient"
import { InValue } from "@libsql/client"
import { getTitanEmbeddings } from "@/utils/embeddings"
export default async function updateDocument(id:string,text:string,title?:string,): Promise<string>{
      try {
      const user = await currentUser() as User //~250ms
      
      // TODO text is a quill Delta this means it is json with some extra info which maybe could be ignored
      const vector:number[] = await getTitanEmbeddings(text) //~500ms

      // ~100ms
      let res
      if (title === undefined) {
        res = await tursoClient().execute({sql:"UPDATE document set text = ?,vector = ? where id = ? and user_id = ?",args:[text,JSON.stringify(vector),id,user.id]})
      }
      else {
        res = await tursoClient().execute({sql:"UPDATE document set title = ?, text = ?,vector = ? where id = ? and user_id = ?",args:[title,text,JSON.stringify(vector),id,user.id]})
      }

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

  