import Feed from "@components/Feed";
function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & share
        <br className="mx-md:hidden" />
        <span className="orange_gradient">AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for morden world to
        discover, create and share creative prompts
      </p>

      {/* feed */}
      <Feed />
    </section>
  );
}

export default Home;
