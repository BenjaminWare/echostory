import { StoryDocumentMetaData } from '@/utils/types'
import Link from 'next/link'
import React from 'react'

export default function card(props: {id:string,title:string,created_at:string}) {
    const {title,created_at,id} = props
    let created_at_date = new Date(created_at)
    const offset = created_at_date.getTimezoneOffset()
    created_at_date = new Date(created_at_date.getTime() - (offset*60*1000))
    const created_at_str = created_at_date.toISOString().substring(0,10)

    return <div className='text-black border-b border-[var(--pri)] bg-[var(--linen)] h-12 last:border-b-0' >
        <Link  href={`document/${id}`}>
            <div className="grid grid-cols-1fr-100px-50px items-center">
                <div className='px-4 mt-2 text-lg'>{title.length > 50 ? title.substring(0,50) + "..." : title}</div>
                <div className='px-2 mt-2 text-md'>{created_at_str}</div> 
                <div className='p-2 text-right'>T</div> 
            {/* TODO make delete absolute in the corner */}
            {/* TODO put the created_at right underneath the text */}
            </div>
        </Link>
    </div> 
}
