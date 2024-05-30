import { connectTODB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req,res)=>{
    
    try {
        const { userId, prompt, tag } = await req.json();

        await connectTODB ();
        
        const newPrompt = new Prompt({
            creator: userId,
            tag: tag,
            prompt: prompt
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
 
        
    } catch (err) {
        console.error("Error in post method of prompt and tags:", err);
        return new Response("Failed to create new prompt", {status:500})
    }
}