'use client'

import Quill from "quill"
import {useRef,useEffect, MutableRefObject, useState } from "react"
import 'quill/dist/quill.snow.css'
import updateDocument from "@/api/updateDocument"
import { StoryDocument } from "@/utils/types"
import { LoaderCircle } from 'lucide-react';
import { useUser } from "@clerk/nextjs"
export default function TextEditor(props: {id:string,title:string,text?:string}) {
    const {id,title,text} = props
    const wrapperRef:MutableRefObject<null | HTMLDivElement> = useRef(null)

    const [saving,setSaving] = useState(false)
    const [error,setError] = useState(false)
    const user = useUser()
    useEffect(() => {
        if (wrapperRef.current == null) return

        wrapperRef.current.innerHTML = ''
        const editor = document.createElement("div")
        wrapperRef.current.append(editor)
        const quill = new Quill(editor, {theme: 'snow'}) // This line causes a 500 that doesn't seem to do anything, it says the document is not defined though to me it seems like it always is
        quill.setContents(JSON.parse(text ? text : "Loading..."))
        let timeout:any
        quill.on("text-change",(delta,oldContent,source) => {
            if (source === 'user') {
                setError(false)
                setSaving(true)
                
                clearTimeout(timeout)
                let contents  = quill.getContents()

                timeout = setTimeout(async () => {
                    const res = await updateDocument(id,JSON.stringify(contents));
                    if (res != id) {
                        setError(true)
                    } else {
                        setSaving(false)
                    }
                  }, 1000);
            }
        })
    },[wrapperRef])
    return <div>
            <div id="container" className="bg-[var(--bg-card)]" ref={wrapperRef}></div>
            {error ? <div className="w-fit flex items-center text-sm m-1 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-inset ring-red-600/10">Error saving!</div>
            :
            saving ? <div className="w-fit flex items-center text-sm m-1 rounded-md bg-yellow-50 px-3 py-2 text-xs text-yellow-700 ring-1 ring-inset ring-yellow-600/10"><LoaderCircle className="animate-spin w-4 h-4 mr-1"/>Saving...</div> :<div className="w-fit flex items-center text-sm m-1 rounded-md bg-green-50 px-3 py-2 text-xs text-green-700 ring-1 ring-inset ring-green-600/10">Saved.</div>}
    </div>
}
