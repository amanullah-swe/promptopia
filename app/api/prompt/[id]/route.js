import { Prompt } from "@models/prompt";
import { connectTODB } from "@utils/database";

// get
export const GET = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectTODB();
    const data = await Prompt.findById(id).populate("creator");
    if (!data) return new Response("prompt not found", { status: 404 });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    // console.log(error);
    return new Response("Failed To fetch ", { status: 500 });
  }
};

// patch
export const PATCH = async (req, { params }) => {
  try {
    const { id } = await params;
    const { prompt, tag } = await req.json();
    console.log(prompt, tag);
    await connectTODB();
    const data = await Prompt.findByIdAndUpdate(id, { prompt, tag }).populate(
      "creator"
    );
    if (!data) return new Response("prompt not found", { status: 404 });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed To update ", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    await connectTODB();
    const data = await Prompt.findByIdAndDelete(id).populate("creator");
    if (!data) return new Response("prompt not found", { status: 404 });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed To update ", { status: 500 });
  }
};
