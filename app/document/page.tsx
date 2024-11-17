import getAllDocuments from "@/api/getAllDocuments";
import DocumentManager from "./documentManager";
export default async function Page() {

    const docs = await getAllDocuments()
    return (
        <>
          {!docs ? "Can't get your stories please try again..." : <DocumentManager docs_res={docs}/>}
        </>
    )
  }