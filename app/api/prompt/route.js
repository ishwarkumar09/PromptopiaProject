import { connectTODB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, res) => {
    try {
        await connectTODB();

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (err) {
        console.error("Error in prompt get function:", err);
        return new Response("Failed to get prompts", { status: 500 });
    }
};
