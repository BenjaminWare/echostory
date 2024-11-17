'use client'

import Quill from "quill"
import {useRef,useEffect, MutableRefObject, useState } from "react"
import 'quill/dist/quill.snow.css'
import updateDocument from "@/api/updateDocument"
import { StoryDocument } from "@/utils/types"
import { LoaderCircle } from 'lucide-react';
import { useUser } from "@clerk/nextjs"
export default function textReader(props: {id:string,title:string,text:string}) {
    const {id,title,text} = props
    const wrapperRef:MutableRefObject<null | HTMLDivElement> = useRef(null)

    useEffect(() => {
        if (wrapperRef.current == null) return

        wrapperRef.current.innerHTML = ''
        const editor = document.createElement("div")
        wrapperRef.current.append(editor)
        const quill = new Quill(editor, {theme: 'snow',readOnly:true}) // This line causes a 500 that doesn't seem to do anything, it says the document is not defined though to me it seems like it always is
        if (text) {
            quill.setContents(JSON.parse(text))
        }
    },[wrapperRef])
    return <div>
            <div id="container" className="bg-[var(--bg-card)]" ref={wrapperRef}></div>
            
            </div>
}
