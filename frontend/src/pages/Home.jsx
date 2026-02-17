import Header from "../components/Header";
import ErrorInput from "../components/ErrorInput";
import ResponseDisplay from "../components/ResponseDisplay";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-cyan-200 via-violet-400 to-purple-500 p-6">

      <Header />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mt-8">

        {/* Left side */}
        <ErrorInput />

        {/* Right side */}
        <ResponseDisplay />

      </div>

    </div>
  );
};

export default Home;
