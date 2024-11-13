'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { tursoClient } from "@/utils/tursoClient"
import {v4 as uuidv4} from 'uuid'
import createDocument from '@/api/createDocument'
import { LoadingButton } from '@/components/LoadingButton'
import { useUser } from '@clerk/nextjs'
 

export default function ViewDocumentsButton(props:{variant?:"outline" | "link" | "default" | "destructive" | "secondary" | "ghost" | null | undefined}) {

    let {variant} = props
    if (variant === undefined) {
      variant = 'link'
    }

    const params = useParams()
    const searchParams = useSearchParams()
    
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const router = useRouter()
    const user = useUser()

    const handleClick = async (e:any) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        if (!user.isSignedIn) {
          setError("Error: Must be signed in.")
          setLoading(false)

        }
        else {
          router.push(`/document/`)
          // Loading is set to false when the push succeeds resulting in a change of params or search params
      }
    }

    useEffect(() => { 
      setLoading(false)
    },[params,searchParams])

  return (
    <div className='relative flex flex-col items-center'>
    <LoadingButton className={`${variant==='link' ? ' text-white' : '' } w-48 ${error ? 'error-jiggle' : ''}`}  variant={variant} loading={loading} onClick={handleClick}>View Documents</LoadingButton>
    {error && <div className='absolute bottom-[-6px] translate-y-full w-48  m-1 text-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>{error}</div>}
    </div>
  )
}
