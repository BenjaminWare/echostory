'use client'
import { StoryDocumentMetaData } from '@/utils/types'
import React from 'react'

export default function SortButton(props: {docs:StoryDocumentMetaData[]}) {
    const {docs} = props
    console.log(docs)
  return (
    <div>sortButton</div>
  )
}
