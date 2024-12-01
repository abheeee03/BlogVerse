import React from 'react';
import { TbHexagonLetterB } from 'react-icons/tb';
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="text-gray-600 dark:text-gray-400 body-font border-t dark:border-gray-800 mt-16">
      <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 dark:text-white">
          <TbHexagonLetterB className='text-4xl' />
          <span className="ml-3 text-xl">BlogVerse</span>
        </a>
        <p className="text-sm text-gray-500 dark:text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 dark:sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          Made with ❤️ by
          <a 
            href="https://github.com/abheeee03" 
            className="text-gray-600 dark:text-gray-400 ml-1 hover:text-gray-800 dark:hover:text-gray-300" 
            rel="noopener noreferrer" 
            target="_blank"
          >
            @abheeee
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a 
            href='https://github.com/abheeee03' 
            className="ml-3 text-xl text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
          >
            <SiGithub />
          </a>
          <a 
            href='https://www.linkedin.com/in/AbhayNimbalkar' 
            className="ml-3 text-xl text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaLinkedinIn />
          </a>
          <a 
            href='https://x.com/_AbhayHere' 
            className="ml-3 text-xl text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaXTwitter />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer; 