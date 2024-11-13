import { tursoClient } from "@/utils/tursoClient"
import TextEditor from "./textEditor"
import { StoryDocument } from "@/utils/types"
import { notFound } from 'next/navigation';
import getDocument from "@/api/getDocument";
import updateDocument from "@/api/updateDocument";
import { LoaderCircle } from 'lucide-react';
import TitleEditor from "./titleEditor";
export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const id = (await params).id
    const doc = await getDocument(id) as unknown as StoryDocument
      // Render 404 page if the DB can't find the page
      if (!doc) {
        notFound()
      }

  // TODO this page should be able to split between the page currently being editted and the most similiar ones
    return (
        <div className='mx-auto max-w-[800px]'>
            <TitleEditor id={doc.id} title={doc.title}/>
            <TextEditor id={doc.id} text={doc.text} title={doc.title} />
        </div>
    )
  }
