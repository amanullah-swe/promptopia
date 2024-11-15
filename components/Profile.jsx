import React from "react";
import PromptCard from "./PromptCard";

function Profile({
  name,
  desc,
  data,
  handleDelete,
  handleEdit,
  handleTagClick,
}) {
  return (
    <section className="w-full ">
      <h1 className="head_text text-left">
        {" "}
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className=" desc text-left"> {desc}</p>

      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;
