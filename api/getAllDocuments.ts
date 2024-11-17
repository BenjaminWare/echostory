"use server"

import { StoryDocument, StoryDocumentMetaData } from "@/utils/types"
import { tursoClient } from "../utils/tursoClient"
import { currentUser, User } from "@clerk/nextjs/server"

export default async function getAllDocuments(): Promise<StoryDocumentMetaData[] | null>{

      try {
    const {id:user_id} = await currentUser() as User

      let {rows} = await tursoClient().execute({sql:"SELECT id,title,created_at,user_id FROM document where user_id = ?",args:[user_id]})
      
      const obj:  StoryDocumentMetaData[] = []
      rows.map(row => {
        obj.push(Object.assign({},row) as unknown as StoryDocument)
      })
    
      return obj

      }
      catch (e) {
        return null 
      }

  }

  