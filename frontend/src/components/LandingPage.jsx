import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";
import { ThemeContext } from "../App";

const TypewriterEffectSmooth = ({ words, className, cursorClassName }) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const renderWords = () => (
    <div className="inline-flex justify-center">
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-flex">
          {word.text.map((char, index) => (
            <span
              key={`char-${index}`}
              className={cn(`dark:text-gray-300 text-gray-700`, word.className)}
            >
              {char}
            </span>
          ))}
          {idx < wordsArray.length - 1 && (
            <span className="dark:text-gray-300 text-gray-700 mr-1.5">&nbsp;</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("flex justify-center items-center my-4", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          delay: 0.3,
        }}
      >
        <div
          className="text-xl md:text-2xl font-medium whitespace-nowrap"
        >
          {renderWords()}
        </div>
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[2px] h-6 md:h-8 dark:bg-gray-300 bg-gray-700 ml-1",
          cursorClassName
        )}
      />
    </div>
  );
};

function LandingPage() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const words = [
    { text: "Your" },
    { text: "Universe" },
    { text: "of" },
    { text: "Ideas" },
    { text: "and" },
    { 
      text: "Stories",
      className: "dark:text-blue-400 text-blue-600"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-black dark:to-gray-900 from-white to-gray-100 text-black dark:text-white transition-colors duration-200">
      <button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <div className="container mx-auto px-4 min-h-screen flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl px-4 pt-16 md:pt-0"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r dark:from-blue-400 dark:to-purple-600 from-blue-600 to-purple-800 leading-tight py-2">
            BlogVerse
          </h1>
          <TypewriterEffectSmooth words={words} />
          
          <div className="space-y-4 mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/posts"
                className="inline-block bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 from-blue-600 to-purple-800 text-white px-6 py-2.5 rounded-lg text-base font-medium hover:opacity-90 transition-opacity"
              >
                Start Reading
              </Link>
            </motion.div>
            
            <p className="dark:text-gray-400 text-gray-600 text-base md:text-lg">
              Join our community of writers and readers
            </p>
          </div>

          <motion.div 
            className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <div className="p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">Write</h3>
              <p className="dark:text-gray-400 text-gray-600">Share your thoughts and stories</p>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">Connect</h3>
              <p className="dark:text-gray-400 text-gray-600">Engage with like-minded readers</p>
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">Discover</h3>
              <p className="dark:text-gray-400 text-gray-600">Explore diverse perspectives</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;
