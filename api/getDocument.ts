"use server"

import { StoryDocument } from "@/utils/types"
import { tursoClient } from "../utils/tursoClient"

export default async function getDocument(id:string): Promise<StoryDocument | null>{
      try {
      const res = await tursoClient().execute({sql:"SELECT * FROM document where id = ?",args:[id]})
      return res.rows[0] as unknown as StoryDocument
      }
      catch (e) {
        console.log(e)
        return null
      }

  }

  