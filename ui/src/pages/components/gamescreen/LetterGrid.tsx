import React from 'react'

const KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

type KeyboardProps = {
  theme: string,
  correctLetters: string[],
  incorrectLetters: string[],
  addGuessLetter: (letter: string) => void,
  disabled: boolean
}

const Keyboard: React.FC<KeyboardProps> = ({ theme, correctLetters, incorrectLetters, addGuessLetter, disabled = false}) => {

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.25rem',
        flexWrap: 'wrap',
        padding: '0.5rem',
        justifyContent: 'center'
      }}
    >
      {KEYS.map(key => {
        const correct = correctLetters.includes(key);
        const incorrect = incorrectLetters.includes(key);
        return (
          <button
            onClick={() => addGuessLetter(key)}
            style={{
              width: '4rem',
              height: 'fit-content',
              padding: '1em',
              textAlign: 'center',
              alignItems: 'center',
              fontSize: '1em',
              backgroundColor: correct ? `rgba(0, 220, 0, ${theme == 'dark' ? '0.8' : '0.2'})` : incorrect ? `rgba(220, 0, 0, ${theme == 'dark' ? '0.8' : '0.2'})` : 'rgba(190, 190, 190, 0.76)',
              color: 'black',
              textShadow: '0px 0px 10px rgba(190, 190, 190, 0.76)'
            }}
            disabled={incorrect || correct || disabled}
            key={key}>
            {key}
          </button>
        )
      })}
    </div>
  )
}

export default Keyboard