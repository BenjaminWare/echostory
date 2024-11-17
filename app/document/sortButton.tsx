'use client'
import { StoryDocumentMetaData } from '@/utils/types'
import { ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function SortButton(props: { sortDocs: Function }) {
    const { sortDocs } = props

    const [sortVal,setSortVal] = useState<'title' | 'date'>('date')
    const [sortDir,setSortDir] = useState<'asc' | 'desc'>('desc')

    useEffect(() => {
        sortDocs(sortVal,sortDir)
    },[sortVal,sortDir])

    return (
        <div className='my-4 py-2 mx-auto w-[1200px] border bg-[var(--linen)] rounded-md border-[var(--pri)] grid grid-cols-1fr-100px-50px '>
            <div className={` ${sortVal == 'title' ? 'font-bold' : ''} cursor-pointer flex items-center px-8`} onClick={() => {
                if (sortVal == 'title') {
                    setSortDir(sortDir == 'asc' ? 'desc' : 'asc')
                } else {
                    setSortVal('title')
                }
            }}>
                <div>Title</div> 
                {sortVal =='title' && <div><ChevronUp className={`${sortDir == 'desc' ? 'rotate-180' : ''} transition-all `}/></div>}
            </div>
            <div className={`${sortVal == 'date' ? 'font-bold' : ''} cursor-pointer flex items-center px-8`} onClick={() => {
                if (sortVal == 'date') {
                    setSortDir(sortDir == 'asc' ? 'desc' : 'asc')
                } else {
                    setSortVal('date')
                }
            }}>
                <div>Date</div>
                {sortVal =='date' && <div><ChevronUp className={`${sortDir == 'desc' ? 'rotate-180' : ''} transition-all `}/></div>}
                   </div>
            <div></div>
        </div>
    )
}
