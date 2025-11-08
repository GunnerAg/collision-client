import React from 'react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.94 0-1.62.68-1.62 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.38.99 3.38 3.5v5.6z"/>
    </svg>
);

const WebIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 003 12c0-.778.099-1.533.284-2.253m18.132 4.506A11.953 11.953 0 0112 21c-2.998 0-5.74-1.1-7.843-2.918" />
    </svg>
);

const ContactSection: React.FC = () => {
  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-4 text-center bg-black/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-teal-400" style={{ textShadow: '0 0 10px rgba(45, 212, 191, 0.7)' }}>
          Get In Touch
        </h2>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          This project is an open-source exploration into cryptographic key pair generation and collision probability. The derivation, balance check, and rescue protocols are available for review.
        </p>

        <a 
          href="https://github.com/example/collision-project" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-teal-500 text-gray-900 font-bold py-3 px-6 rounded-md hover:bg-teal-400 transition-all duration-300 text-lg mb-12"
        >
          Get Source Code
        </a>

        <div className="border-t border-gray-700 pt-8">
            <h3 className="text-2xl font-bold text-white mb-2">About Me</h3>
            <p className="text-gray-400 mb-6">
                I'm a blockchain enthusiast and developer passionate about decentralized technologies and cryptography.
            </p>
            <div className="flex items-center justify-center space-x-6">
                <a href="https://github.com/example" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                    <GithubIcon />
                </a>
                <a href="https://linkedin.com/in/example" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                    <LinkedInIcon />
                </a>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">
                    <WebIcon />
                </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
