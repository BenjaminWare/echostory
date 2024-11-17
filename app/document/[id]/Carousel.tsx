import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel"
import TextReader from "./textReader"
import { StoryDocument, StoryDocumentMetaData } from "@/utils/types"
import { useEffect, useState } from "react"

export function DocCarousel(props: {setCur:Function,carouselItems:StoryDocument[]}) {
    const {carouselItems,setCur} = props

    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [loading,setLoading] = useState(false)
    const [hasMore,setHasMore] = useState(true)
   

    const loadMore = async () => {
    
    }

    useEffect(() => {
    if (!api) {
        return
            }
    setCur(api.selectedScrollSnap() + 1)
    
      api.on("select",() => {
        setCur(api.selectedScrollSnap() + 1)
      })
    }, [api])

  
  return (
    <Carousel setApi={setApi} className="w-full max-w-xs">
      <CarouselContent>
        {carouselItems.map((doc, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
                <TextReader id={doc.id} title={doc.title} text={doc.text}/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
