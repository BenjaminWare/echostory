import Image from "next/image";
import Link from "next/link"
import CreateDocumentButton from "../components/createDocumentButton";
import { tursoClient } from "@/utils/tursoClient";
import { ResultSet } from "@libsql/client";
import Hero from "./Hero";

export default async function Home() {


  return (
    <>
      <svg className="mt-[-50px] ml-[-10px] absolute" width="calc(100% + 11px)" viewBox="0 0 2306 457" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M633.5 245C283 292 499.5 457.5 1 456V1H2305.5V75.5C2068.17 89.8333 1544.2 143.8 1347 245C1100.5 371.5 984 198 633.5 245Z" fill="var(--pri)" />
        </svg>
    <div className="bg-[var(--bg)] py-8 md:py-32 overflow-x-hidden">
      <div className="mx-auto max-w-[1200px] flex md:flex-row flex-col-reverse">
      <div className="p-2 md:w-[550px] h-[800px] md:h-[500px] flex flex-col justify-end md:justify-center align-center">
        <h1 className='font-bold text-[var(--pri)] md:text-6xl text-2xl'>
          Write Alone, Resonate Together</h1>
          <h2 className="my-4 md:text-2xl text-black text-lg text-[var(--bistre)]">Find your narrative neighbors. Write down
your own experiences and find out whose in your global community.</h2>
        <CreateDocumentButton />
      </div>
      <div className='relative left-[-200px]'>
        <Hero />
      </div>
    </div>


    </div>
        <svg className="mt-[-10px]" width="100%" viewBox="0 0 2306 457" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M633.5 245C283 292 499.5 457.5 1 456V1H2305.5V75.5C2068.17 89.8333 1544.2 143.8 1347 245C1100.5 371.5 984 198 633.5 245Z" fill="var(--bg)" stroke="none" />
        </svg>
        </>
  );
}
