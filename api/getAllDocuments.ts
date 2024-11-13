"use server"

import { StoryDocument, StoryDocumentMetaData } from "@/utils/types"
import { tursoClient } from "../utils/tursoClient"

export default async function getDocument(user_id:string): Promise<StoryDocumentMetaData[] | null>{
      try {
      const res = await tursoClient().execute({sql:"SELECT id,title,created_at,user_id FROM document where user_id = ?",args:[user_id]})
      return res.rows as unknown as StoryDocumentMetaData[]
      }
      catch (e) {
        return null
      }

  }

  