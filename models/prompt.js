const { Schema, models, model } = require("mongoose");

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required "],
  },
  prompt: {
    type: String,
    require: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "tag is required"],
  },
});

export const Prompt = models.Prompt || model("Prompt", promptSchema);
