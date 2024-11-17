'use client'
import getSimilarDocument from '@/api/getSimilarMetaData'
import { LoadingButton } from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import { StoryDocument, StoryDocumentMetaData } from '@/utils/types'
import React, { useEffect, useState } from 'react'
import TextReader from './textReader'
import { DocCarousel } from './Carousel'

export default function SimilarReader(props: {id:string}) {

    const {id} = props

    const [loading,setLoading] = useState(false)
    // Holds the data needed for the carousel as it comes down. We will only hold a couple of the texts
    const [carouselMetaData,setCarouselMetaData] = useState<StoryDocument[]>([])

    // Offset into the sql this include a value for the current document and repeats
    const [dataOffset,setDataOffset] = useState(0)
    // Offset into the carousel excludes current document
    const [offset,setOffset] = useState(0)
    // Cur is set by the carousel and it is which card we are at when it gets close to offset we get more data
    const [cur, setCur] = useState(0)
    const [buttonPressed,setButtonPressed] = useState(false)
    const limit = 4



    useEffect(() => {   

        async function asyncWrapper() {
            console.log(cur)
            console.log(offset)
            if (buttonPressed && !loading && cur+ 1 >= offset) {
            setLoading(true)
            console.log("get batch")
            const newData = await getBatchOfSimilarDocuments(dataOffset,limit)
            console.log(dataOffset)
            console.log(newData.length)
            setDataOffset(oldOffset => oldOffset + newData.length)
            const newUniqueData = newData.filter(doc => (doc.id != id) && (carouselMetaData.every(carDoc => carDoc.id != doc.id)))
            setOffset(prev => prev + newUniqueData.length)
            console.log(newUniqueData.length)
            setCarouselMetaData((old) => [...old,...newUniqueData])
            setLoading(false)

            }
        }
        asyncWrapper()

    },[cur,buttonPressed])
    useEffect(() => {
        console.log(carouselMetaData)
        console.log("offset " + offset)
    },[carouselMetaData,offset])
    // On button press we restart from offset 0 and start over
    const handleClick = async (e:any) => {
        setCarouselMetaData([])
        setOffset(0)
        setDataOffset(0)
        setCur(0)
        setButtonPressed(old => !old)

    }

    // Try to get more carousel data
    const getBatchOfSimilarDocuments = async (offset:number,limit:number) => {
        console.log("limit: " + limit + " offset: " + offset)
        const res = await getSimilarDocument(id,limit,offset)


        // Append new stories excluding the current one.
        if (res) {
            return res
        }
        return []
    }

    useEffect(() => {
        console.log(carouselMetaData)
    },[carouselMetaData])

  return (
    <div>
        <LoadingButton className="bg-[var(--pri)] fixed right-12 bottom-12" onClick={handleClick} variant='default'>{!buttonPressed ? "Find Similar" : "Close Similar"} </LoadingButton>
        {buttonPressed && carouselMetaData.length > 0 && <DocCarousel setCur={setCur} carouselItems={carouselMetaData} />}
    </div>
  )
}
