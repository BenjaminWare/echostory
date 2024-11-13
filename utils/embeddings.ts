import { BedrockRuntime } from '@aws-sdk/client-bedrock-runtime';

// Create Bedrock Runtime client
const bedrockRuntime = new BedrockRuntime({
  region: 'us-west-2'
});

export async function getTitanEmbeddings(inputText:string):Promise<number[]> {
    try {
        // Prepare the request body
        const body = {
            "inputText": inputText,
            "dimensions": 256
        };

        // Set up the parameters for the invoke model
        const params = {
            body: JSON.stringify(body),
            modelId: 'amazon.titan-embed-text-v2:0',
            contentType: 'application/json',
            accept: 'application/json'
        };

        // Call the Titan embedding model
        const response = await bedrockRuntime.invokeModel(params);
        
        // Parse the response - note that with the new SDK we don't need to handle Buffer conversion
        const decoder = new TextDecoder();
        const jsonString = decoder.decode(response.body);
        const embeddings = JSON.parse(jsonString);
        
        return embeddings.embedding;
    } catch (error) {
        console.log("Error getting embeddings")
        return []
    }
}