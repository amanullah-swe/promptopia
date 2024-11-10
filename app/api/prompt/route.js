import { Prompt } from "@models/prompt";
import User from "@models/user";
import { connectTODB } from "@utils/database";

export const GET = async (request, { params }) => {
  const searchParams = request?.nextUrl?.searchParams;
  const search = searchParams?.get("search") || "";
  try {
    await connectTODB();
    let data = await Prompt.find({
      $or: [
        { prompt: { $regex: search, $options: "i" } },
        { tag: { $regex: search, $options: "i" } },
      ],
    }).populate({
      path: "creator",
    });
    if (data.length) {
      return new Response(JSON.stringify(data), { status: 200 });
    }
    const newData = await User.find({ username: { $regex: search } });
    const posts = await Prompt.find({ creator: { $in: newData } }).populate(
      "creator"
    );
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed To fetch ", { status: 500 });
  }
};
