
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import React from 'react'
import { Button } from "@/components/ui/button"
import CreateDocumentButton from '@/components/createDocumentButton'
import Link from 'next/link'
import ViewDocumentsButton from '@/components/viewDocumentsButton'
export default function Navbar() {
    return (
        <div className='sticky top-0 z-10 bg-[var(--pri)]'>

            <div className='h-24 w-18 mx-4 md:mx-auto max-w-[1200px] flex justify-between items-center'>

            <Link href='/' className='flex flex-row gap-2 items-center'>
            <svg width="36" height="36" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect x="0.000244141" width="72" height="72" fill="url(#pattern0_36_2328)"/>
            <defs>
            <pattern id="pattern0_36_2328" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_36_2328" transform="scale(0.0138889)"/>
            </pattern>
            <image id="image0_36_2328" width="72" height="72" xlinkHref="data:image/png;base64,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"/>
            </defs>
            </svg>
            <div className="text-white text-2xl">EchoStory</div>
            </Link>

            <div className='h-10 flex gap-4 items-center text-white'>
                <ViewDocumentsButton variant='link'/>
                <CreateDocumentButton variant="link"/>
                <div>
                    <SignedOut>
                        <div className='pointer hover:underline'>
                        <SignInButton  />
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
                </div>
                
            </div>
        </div>
    )
}
