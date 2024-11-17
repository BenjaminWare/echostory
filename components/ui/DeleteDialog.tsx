'use client'

import deleteDocument from "@/api/deleteDocument"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"
import { useState } from "react"

export function DeleteDialog(props:{title:string,id:string,reload?:Function}) {
    const {id,title,reload} = props

    const [error,setError] = useState("")
    
    const handleClick = async (e:any) => {
       const res =  await deleteDocument(id)

    if (res == id) {
        if (reload) {
            reload()
        }
    }
    else {
        setError("Couldn't delete pleae try again")
    }
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
      <div className='p-2 mt-1 text-right text-red-700'><Trash2 width={24}/></div> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {title}</DialogTitle>
          <DialogDescription>
            {error ? <div className='text-red-700'>error</div> : `This will delete ${title} and cannot be undone.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleClick} variant='outline' type="submit">Delete</Button>
          {error}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
