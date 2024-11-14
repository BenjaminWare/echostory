import { tursoClient } from "@/utils/tursoClient"
import { StoryDocument, StoryDocumentMetaData } from "@/utils/types"
import { notFound } from 'next/navigation';
import getDocument from "@/api/getDocument";
import updateDocument from "@/api/updateDocument";
import { LoaderCircle } from 'lucide-react';
import { currentUser, User } from "@clerk/nextjs/server";
import getAllDocuments from "@/api/getAllDocuments";
import Link from "next/link";
import CreateDocumentButton from "@/components/createDocumentButton";
import Card from "./card";
import SortButton from "./sortButton";
export default async function Page() {
    const {id:user_id} = await currentUser() as User

    const docs = await getAllDocuments(user_id) as unknown as StoryDocumentMetaData[]
    


    return (
        <>
            <SortButton docs={docs}/>
            {docs ? 
            <div className="mx-auto max-w-[1200px] bg-[var(--sec)]p-4 rounded-md mt-4 overflow-hidden border border-[var(--pri)]">
                {docs.map(doc => <Card key={doc.id} title={doc.title} id={doc.id} created_at={doc.created_at}/>)}
            </div>
            : <><div>No documents yet try creating one.</div><CreateDocumentButton/></>}
        </>
    )
  }