'use client'

import CreateDocumentButton from '@/components/createDocumentButton'
import { StoryDocumentMetaData } from '@/utils/types'
import React, { useState } from 'react'
import Card from './card'
import SortButton from './sortButton'
import getAllDocuments from '@/api/getAllDocuments'

export default function documentManager(props: {docs_res:StoryDocumentMetaData[]}) {

    const {docs_res} = props

    // Bad practice because we are chaning the prop here so if other things rely on it they may miss rerenders
    docs_res.sort((doc1,doc2) => doc1.created_at < doc2.created_at  ? 1 : -1)


    const [docs,setDocs] = useState<StoryDocumentMetaData[]>(docs_res)

    const sortDocs = (sortVal:'title' | 'date',sortDir:'asc' | 'desc') => {

        const val = sortDir == 'asc' ? 1 : -1

        if (sortVal == 'title') {
            setDocs([...docs.sort((doc1,doc2) => doc1.title > doc2.title  ? val : -1 * val)])
        } else {
            setDocs([...docs.sort((doc1,doc2) => doc1.created_at > doc2.created_at  ? val : -1 * val)])
        }
    }
    const reload = async() => {
        const res = await getAllDocuments()
        if (res) {
            setDocs(res)
        }
    }

    return (
        <>
            <SortButton sortDocs={sortDocs}/>
            {docs ? 
            <div className="mx-auto max-w-[1200px] bg-[var(--sec)]p-4 rounded-md mt-4 overflow-hidden border border-[var(--pri)]">
                {docs.map(doc => <Card key={doc.id} title={doc.title} id={doc.id} created_at={doc.created_at} reload={reload}/>)}
            </div>
            : <><div>No documents yet try creating one.</div><CreateDocumentButton/></>}
        </>
    )
  }