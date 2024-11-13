"use client"
import updateDocumentMetaData from '@/api/updateDocumentMetaData'
import React, { useState } from 'react'

export default function titleEditor(props: {title:string,id:string}) {
  const {id} = props
  const [title,setTitle] = useState(props.title)

  let timeout:any;
  const onChange = (e:any) => {
    setTitle(e.target.value)
    clearTimeout(timeout)
    
    timeout = setTimeout(() => {
      updateDocumentMetaData(id,e.target.value)
    },1000)
  } 

  return (
    <input className="text-2xl" type="text" value={title} onChange={onChange}/>
  )
}
