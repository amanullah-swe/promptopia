import { Prompt } from "@models/prompt";
import { connectTODB } from "@utils/database";

export const GET = async (req, { params }) => {
  const { id } = await params;
  console.log(id);
  try {
    await connectTODB();
    const data = await Prompt.find({ creator: id }).populate("creator");
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    // console.log(error);
    return new Response("Failed To fetch ", { status: 500 });
  }
};
