"use server"

import { StoryDocument, StoryDocumentMetaData } from "@/utils/types"
import { tursoClient } from "../utils/tursoClient"

export default async function getSimilarDocument(id:string,count:number,offset:number): Promise<StoryDocument[] | null>{
      try {
      const res = await tursoClient().execute({sql:
        `   SELECT document.id, title,created_at,user_id,text
            FROM vector_top_k('doc_vec_idx', (select vector from document where id = ?), ?) as idx
            join document on document.rowid = idx.id
            limit ?
            offset ?`
,args:[id,count+offset,count,offset]})

      const obj:StoryDocument[] = []
      res.rows.map((row) => {
        obj.push(Object.assign({},row as unknown as StoryDocument))
      })
      return obj
      }
      catch (e) {
        console.log(e)
        return null
      }

  }

  