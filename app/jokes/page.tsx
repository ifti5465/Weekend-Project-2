"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Define types for our joke parameters
type JokeCategory = "random" | "programming" | "dad" | "pun";
type JokeTopic = "general" | "work" | "animals" | "food" | "technology" | "sports";
type JokeTone = "witty" | "sarcastic" | "silly" | "dark" | "goofy";
type JokeType = "any" | "pun" | "knockknock" | "story" | "oneliners";

// Define types for joke evaluation
type HumorRating = "Not Funny" | "Slightly Funny" | "Moderately Funny" | "Very Funny" | "Hilarious";
type AppropriatenessRating = "Appropriate" | "Questionable" | "Inappropriate";
type OffensivenessRating = "Not Offensive" | "Mildly Offensive" | "Offensive";

interface JokeEvaluation {
  humor: HumorRating;
  appropriateness: AppropriatenessRating;
  offensiveness: OffensivenessRating;
  explanation: string;
}

export default function JokesPage() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [jokeCategory, setJokeCategory] = useState<JokeCategory>("random");
  const [jokeTopic, setJokeTopic] = useState<JokeTopic>("general");
  const [jokeTone, setJokeTone] = useState<JokeTone>("witty");
  const [jokeType, setJokeType] = useState<JokeType>("any");
  const [creativity, setCreativity] = useState(50);
  const [evaluation, setEvaluation] = useState<JokeEvaluation | null>(null);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const categories = [
    { id: "random" as JokeCategory, name: "Random" },
    { id: "programming" as JokeCategory, name: "Programming" },
    { id: "dad" as JokeCategory, name: "Dad Jokes" },
    { id: "pun" as JokeCategory, name: "Puns" },
  ];

  const topics = [
    { id: "general" as JokeTopic, name: "General" },
    { id: "work" as JokeTopic, name: "Work" },
    { id: "animals" as JokeTopic, name: "Animals" },
    { id: "food" as JokeTopic, name: "Food" },
    { id: "technology" as JokeTopic, name: "Technology" },
    { id: "sports" as JokeTopic, name: "Sports" },
  ];

  const tones = [
    { id: "witty" as JokeTone, name: "Witty" },
    { id: "sarcastic" as JokeTone, name: "Sarcastic" },
    { id: "silly" as JokeTone, name: "Silly" },
    { id: "dark" as JokeTone, name: "Dark" },
    { id: "goofy" as JokeTone, name: "Goofy" },
  ];

  const types = [
    { id: "any" as JokeType, name: "Any Type" },
    { id: "pun" as JokeType, name: "Pun" },
    { id: "knockknock" as JokeType, name: "Knock-Knock" },
    { id: "story" as JokeType, name: "Story" },
    { id: "oneliners" as JokeType, name: "One-Liners" },
  ];

  // Function to evaluate a joke
  const evaluateJoke = (jokeText: string): JokeEvaluation => {
    // This is a simplified evaluation that would be replaced by a real AI model in production
    
    // Check for potentially offensive content
    const potentiallyOffensiveTerms = ['stupid', 'idiot', 'dumb', 'fat', 'ugly'];
    const containsOffensiveTerms = potentiallyOffensiveTerms.some(term => 
      jokeText.toLowerCase().includes(term)
    );
    
    // Check for dark humor
    const isDarkHumor = jokeTone === "dark" || 
      jokeText.toLowerCase().includes("death") || 
      jokeText.toLowerCase().includes("die");
    
    // Determine humor level based on joke type and length
    let humorRating: HumorRating;
    if (jokeText.length < 30) {
      humorRating = "Slightly Funny";
    } else if (jokeText.length < 60) {
      humorRating = "Moderately Funny";
    } else {
      humorRating = "Very Funny";
    }
    
    // Puns are always at least moderately funny
    if (jokeType === "pun" && humorRating === "Slightly Funny") {
      humorRating = "Moderately Funny";
    }
    
    // Dad jokes are either hilarious or not funny, depending on your perspective
    if (jokeCategory === "dad") {
      humorRating = Math.random() > 0.5 ? "Hilarious" : "Not Funny";
    }
    
    // Determine appropriateness
    let appropriatenessRating: AppropriatenessRating;
    if (containsOffensiveTerms || isDarkHumor) {
      appropriatenessRating = "Questionable";
    } else {
      appropriatenessRating = "Appropriate";
    }
    
    // Determine offensiveness
    let offensivenessRating: OffensivenessRating;
    if (containsOffensiveTerms) {
      offensivenessRating = "Mildly Offensive";
    } else {
      offensivenessRating = "Not Offensive";
    }
    
    // Generate explanation
    let explanation = "";
    if (humorRating === "Hilarious" || humorRating === "Very Funny") {
      explanation = "This joke has good structure and a surprising punchline.";
    } else if (humorRating === "Moderately Funny") {
      explanation = "This joke is decent but could use a stronger punchline.";
    } else {
      explanation = "This joke might need some work on its delivery or punchline.";
    }
    
    if (appropriatenessRating !== "Appropriate") {
      explanation += " The content may be questionable in some contexts.";
    }
    
    if (offensivenessRating !== "Not Offensive") {
      explanation += " Some terms used might be considered offensive by some audiences.";
    }
    
    return {
      humor: humorRating,
      appropriateness: appropriatenessRating,
      offensiveness: offensivenessRating,
      explanation
    };
  };

  const generateJoke = () => {
    setLoading(true);
    setShowEvaluation(false);
    setEvaluation(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Base jokes by category
      const jokes: Record<JokeCategory, string[]> = {
        random: [
          "Why don't scientists trust atoms? Because they make up everything!",
          "What do you call a fake noodle? An impasta!",
          "Why did the scarecrow win an award? Because he was outstanding in his field!",
        ],
        programming: [
          "Why do programmers prefer dark mode? Because light attracts bugs!",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
          "Why do Java developers wear glasses? Because they don't C#!",
        ],
        dad: [
          "I'm reading a book about anti-gravity. It's impossible to put down!",
          "Did you hear about the restaurant on the moon? Great food, no atmosphere!",
          "What do you call a fish with no eyes? Fsh!",
        ],
        pun: [
          "I told my wife she was drawing her eyebrows too high. She looked surprised.",
          "I'm on a seafood diet. Every time I see food, I eat it!",
          "What's the best time to go to the dentist? Tooth-hurty!",
        ],
      };

      // Topic-specific jokes
      const topicJokes: Record<JokeTopic, string> = {
        work: "My boss told me to have a good day... so I went home.",
        animals: "What do you call a parade of rabbits hopping backwards? A receding hare-line.",
        food: "I'm on a seafood diet. Every time I see food, I eat it!",
        technology: "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
        sports: "I used to be a banker, but I lost interest.",
        general: "I'm not lazy, I'm just on energy-saving mode.",
      };

      // Tone-specific jokes
      const toneJokes: Record<JokeTone, string> = {
        witty: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        sarcastic: "I love when people tell me the rules right after I've broken them.",
        silly: "What's orange and sounds like a parrot? A carrot!",
        dark: "I was wondering why the ball was getting bigger. Then it hit me.",
        goofy: "Why don't eggs tell jokes? They'd crack each other up!",
      };

      // Type-specific jokes
      const typeJokes: Record<JokeType, string> = {
        pun: "I'm reading a book on anti-gravity. It's impossible to put down!",
        knockknock: "Knock knock. Who's there? Interrupting cow. Interrupting cow w-MOOOOO!",
        story: "I bought some shoes from a drug dealer. I don't know what he laced them with, but I've been tripping all day.",
        oneliners: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        any: "Why don't scientists trust atoms? Because they make up everything!",
      };

      // Combine parameters to select a joke
      let selectedJoke = "";
      
      // Higher creativity means more randomness in selection
      if (Math.random() * 100 < creativity) {
        // More creative/random selection
        const allJokes = [
          ...Object.values(jokes).flat(),
          ...Object.values(topicJokes),
          ...Object.values(toneJokes),
          ...Object.values(typeJokes)
        ];
        const randomIndex = Math.floor(Math.random() * allJokes.length);
        selectedJoke = allJokes[randomIndex];
      } else {
        // More targeted selection based on parameters
        if (jokeTopic !== "general" && Math.random() > 0.5) {
          selectedJoke = topicJokes[jokeTopic];
        } else if (jokeType !== "any" && Math.random() > 0.5) {
          selectedJoke = typeJokes[jokeType];
        } else if (Math.random() > 0.5) {
          selectedJoke = toneJokes[jokeTone];
        } else {
          const randomIndex = Math.floor(Math.random() * 3);
          selectedJoke = jokes[jokeCategory][randomIndex];
        }
      }

      // Add tone modifiers based on selected tone
      const toneModifiers: Record<JokeTone, string> = {
        witty: "Actually, ",
        sarcastic: "Oh sure, ",
        silly: "Teehee! ",
        dark: "Prepare yourself: ",
        goofy: "Golly gee! ",
      };

      // Apply tone modifier with some randomness
      if (Math.random() > 0.7) {
        selectedJoke = toneModifiers[jokeTone] + selectedJoke;
      }

      setJoke(selectedJoke);
      
      // Evaluate the joke
      const jokeEval = evaluateJoke(selectedJoke);
      setEvaluation(jokeEval);
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full max-w-3xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/joke.svg"
            alt="Joke icon"
            width={32}
            height={32}
            className="text-blue-500"
          />
          <h1 className="text-3xl font-bold">Joke Generator</h1>
        </div>
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
      </header>

      <main className="flex flex-col items-center w-full max-w-3xl gap-8">
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Customize Your Joke</h2>
          
          {/* Category Selection */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setJokeCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    jokeCategory === category.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Topic Selection */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Topic</h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setJokeTopic(topic.id)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    jokeTopic === topic.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tone Selection */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Tone</h3>
            <div className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setJokeTone(tone.id)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    jokeTone === tone.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {tone.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Joke Type Selection */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Joke Type</h3>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setJokeType(type.id)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    jokeType === type.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Creativity Slider */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Creativity Level: {creativity}%</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={creativity}
              onChange={(e) => setCreativity(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Predictable</span>
              <span>Creative</span>
            </div>
          </div>

          <button
            onClick={generateJoke}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate Joke"}
          </button>
        </div>

        {joke && (
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3">Your Joke</h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <p className="text-lg">{joke}</p>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Generated with: Category: {jokeCategory}, Topic: {jokeTopic}, Tone: {jokeTone}, Type: {jokeType}, Creativity: {creativity}%</p>
            </div>
            
            {evaluation && (
              <div className="mt-4">
                <button
                  onClick={() => setShowEvaluation(!showEvaluation)}
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  <span>{showEvaluation ? "Hide" : "Show"} AI Evaluation</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`transition-transform ${showEvaluation ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                
                {showEvaluation && (
                  <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                    <h3 className="font-medium mb-2">AI Joke Evaluation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Humor Rating</p>
                        <p className={`font-medium ${
                          evaluation.humor === "Hilarious" || evaluation.humor === "Very Funny" 
                            ? "text-green-600 dark:text-green-400" 
                            : evaluation.humor === "Not Funny" 
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                        }`}>
                          {evaluation.humor}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Appropriateness</p>
                        <p className={`font-medium ${
                          evaluation.appropriateness === "Appropriate" 
                            ? "text-green-600 dark:text-green-400" 
                            : evaluation.appropriateness === "Inappropriate" 
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                        }`}>
                          {evaluation.appropriateness}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Offensiveness</p>
                        <p className={`font-medium ${
                          evaluation.offensiveness === "Not Offensive" 
                            ? "text-green-600 dark:text-green-400" 
                            : evaluation.offensiveness === "Offensive" 
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                        }`}>
                          {evaluation.offensiveness}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">{evaluation.explanation}</p>
                    <p className="text-xs text-gray-500 mt-2 italic">Note: This is a simulated AI evaluation.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">About This App</h2>
          <p className="mb-3">
            This joke generator provides you with customized jokes based on your preferences:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li><strong>Category:</strong> The general category of joke</li>
            <li><strong>Topic:</strong> What the joke is about</li>
            <li><strong>Tone:</strong> The style or attitude of the joke</li>
            <li><strong>Type:</strong> The joke format</li>
            <li><strong>Creativity:</strong> How random or unexpected the joke should be</li>
          </ul>
          <p className="mb-3">
            The AI evaluation feature analyzes each joke for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Humor:</strong> How funny the joke is likely to be</li>
            <li><strong>Appropriateness:</strong> Whether the joke is suitable for general audiences</li>
            <li><strong>Offensiveness:</strong> Whether the joke might be considered offensive</li>
          </ul>
        </div>
      </main>
    </div>
  );
} 