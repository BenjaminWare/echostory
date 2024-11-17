import { DeleteDialog } from '@/components/ui/DeleteDialog'
import { StoryDocumentMetaData } from '@/utils/types'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function card(props: {id:string,title:string,created_at:string,reload:Function}) {
    const {title,created_at,id,reload} = props
    let created_at_date = new Date(created_at)
    const offset = created_at_date.getTimezoneOffset()
    created_at_date = new Date(created_at_date.getTime() - (offset*60*1000))
    const created_at_str = created_at_date.toISOString().substring(0,10)

    return <div className='text-black border-b border-[var(--pri)] bg-[var(--linen)] h-12 last:border-b-0' >
            <div className="grid grid-cols-1fr-100px-50px items-center">
                <Link  href={`document/${id}`}>
                    <div className='cursor-pointer px-4 mt-2 text-lg'>{title.length > 50 ? title.substring(0,50) + "..." : title}</div>
                </Link>
                <Link  href={`document/${id}`}>
                <div className='px-2 mt-2 text-md'>{created_at_str}</div> 
                </Link>
                <DeleteDialog id={id} title={title} reload={reload}/>
            {/* TODO make delete absolute in the corner */}
            {/* TODO put the created_at right underneath the text */}
            </div>
    </div> 
}
