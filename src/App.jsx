import { useState, useEffect } from "react";

function App() {
  const [joke, setJoke] = useState("Click the button to load a joke!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch joke
  const fetchJoke = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("https://official-joke-api.appspot.com/random_joke");

      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data = await response.json();
      setJoke(`${data.setup} 🤔 ... ${data.punchline} 😂`);
    } catch (err) {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // Load one joke when app starts
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-8">🎭 Random Joke Generator</h1>

      <div className="bg-white text-black rounded-2xl shadow-lg p-6 max-w-xl text-center">
        {loading ? (
          <p className="text-lg animate-pulse">Loading joke...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-lg">{joke}</p>
        )}
      </div>

      <button
        onClick={fetchJoke}
        className="mt-6 px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
      >
        Get Another Joke 😂
      </button>
      <footer>Developed by Kushal</footer>
    </div>
  );
}

export default App;
