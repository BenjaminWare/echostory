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
export default async function Page() {
    const {id:user_id} = await currentUser() as User

    const docs = await getAllDocuments(user_id) as unknown as StoryDocumentMetaData[]
    

    return (
        <>
            <CreateDocumentButton/>
            {docs.map(doc => {
                return <div key={doc.id}><Link href={`document/${doc.id}`}>{doc.title} {doc.created_at} </Link></div>
            })}
        </>
    )
  }