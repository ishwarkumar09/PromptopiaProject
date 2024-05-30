import { connectTODB } from "@utils/database";
import Prompt from "@models/prompt";


//GET (read)

export const GET = async (req, {params}) => {
    try {
        await connectTODB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt){
            return new Response("Prompt not found" , {status:404})
        }

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (err) {
        console.error("Error in prompt get function:", err);
        return new Response("Failed to get prompts", { status: 500 });
    }
};

//PATCH (update)

export const PATCH = async (req, { params }) => {
    try {
      const { prompt, tag } = await req.json();
  
      await connectTODB();
  
      const existingPrompt = await Prompt.findById(params.id);
  
      if (!existingPrompt) {
        return new Response("Prompt not found", { status: 404 });
      }
  
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
  
      await existingPrompt.save();
  
      return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
      console.error("Error in prompt patch function:", error);
      return new Response("Failed to update prompt", { status: 500 });
    }
  };


  //DELETE
  import { connectTODB } from 'path_to_db_connection';
  import Prompt from 'path_to_prompt_model';
  
  export const DELETE = async (req, { params }) => {
    try {
      await connectTODB();
  
      const existingPrompt = await Prompt.findById(params.id);
  
      if (!existingPrompt) {
        console.log(`Prompt with ID ${params.id} not found`);
        return new Response("Prompt not found", { status: 404 });
      }
  
      await existingPrompt.remove();
  
      console.log(`Prompt with ID ${params.id} deleted successfully`);
      return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error in prompt delete function:", error);
      return new Response("Failed to delete prompt", { status: 500 });
    }
  };
  