import React from "react";
import Link from "next/link";
function Form({ type, post, submitting, handleSubmit, setPost }) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompt with the world, and let your imagination
        run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, prompt: e.target.value }))
            }
            required
            placeholder="Write your prompt here"
            className="form_textarea"
          ></textarea>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopmenet, #idea)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, tag: e.target.value }))
            }
            required
            placeholder="#tag"
            className="form_input"
          />
        </label>

        <div className=" flex-end max-3 mb-5 gap-4">
          <Link
            href={"/"}
            className="tex-gray-500 text-sm "
          >
            Cencel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
