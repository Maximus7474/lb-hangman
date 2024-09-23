import React, { useEffect, useState } from "react";

const devMode = !window?.["invokeNative"];

type HangmanWordProps = {
  theme: string,
  guessedLetters: string[];
  wordToGuess: string;
  showResult?: boolean;
};

const HangmanWord: React.FC<HangmanWordProps> = ({ theme = 'light', guessedLetters, wordToGuess, showResult = false }) => {
  
  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      justifyContent: 'center',
    }}>
      {wordToGuess.split('').map((letter, index) => (
        <span key={index} style={{
          borderBottom: `0.25rem solid ${theme === 'dark' ? 'white' : 'black'}`,
          display: 'inline-block',
          minWidth: '1.4rem',
          textAlign: 'center',
        }} className="text">
          <span style={{
            visibility: guessedLetters.includes(letter) || showResult ? 'visible' : 'hidden',
            color: !guessedLetters.includes(letter) && showResult ? '#BE123C' : theme === 'dark' ? '#bdb5b0' : '#1C1917',
          }}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWord;
