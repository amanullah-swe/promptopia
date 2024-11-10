import { Prompt } from "@models/prompt";
import { connectTODB } from "@utils/database";

export const GET = async (req, res) => {
  try {
    await connectTODB();
    const data = await Prompt.find({}).populate("creator").limit(10);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed To fetch ", { status: 500 });
  }
};
