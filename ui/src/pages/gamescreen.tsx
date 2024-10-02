import React, { useCallback, useEffect, useState, useRef } from 'react';
import HangmanWord from './components/gamescreen/WordPlaceholder';
import Keyboard from './components/gamescreen/LetterGrid';
import HangmanSVG from './components/gamescreen/CharacterSVG';
import { useGlobalContext } from '../utils/GlobalContext';

const devMode = !window?.["invokeNative"];

interface GameScreenProps {
    theme: string,
    ChangePage: (page: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ theme, ChangePage }) => {
    const { fetchNui } = window as any;
	const { T } = useGlobalContext();

    const [wordToGuess, setWordToGuess] = useState<string | null>(devMode ? "jurassic" : null);
    const [guessedLetters, setGuessLetters] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const resetGuessingWord = () => {
        setGuessLetters([]);
        if (devMode) {
            setTimeout(() => {
                setWordToGuess(wordToGuess === "jurassic" ? "satellite" : "jurassic")
                setLoading(false);
            }, 500);
            return;
        }
        fetchNui("lb-hangman:getRandomWord").then((word: string) => {
            setWordToGuess(word);
            setLoading(false);
        });
    };

    useEffect(() => {
        resetGuessingWord();
    }, []);

    const incorrectLetters = guessedLetters.filter(
        letter => wordToGuess && !wordToGuess.includes(letter)
    );

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess ? wordToGuess.split('').every(letter => guessedLetters.includes(letter)) : false;

    const addGuessLetter = useCallback((letter: string) => {
        if (guessedLetters.includes(letter) || isLoser || isWinner) {
            return;
        }
        setGuessLetters(currentLetters => [...currentLetters, letter]);
    }, [guessedLetters, isLoser, isWinner]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (!key.match(/^[a-z]$/)) {
                return;
            }
            e.preventDefault();
            addGuessLetter(key);
        };

        document.addEventListener('keypress', handler);
        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, [addGuessLetter]);

    useEffect(() => {
        if (isWinner) {
            console.log(T('GAMESCREEN.WIN_HEADING'));
        }
        console.log("End conditions met ?", isWinner || isLoser);
    }, [isWinner]);

    useEffect(() => {
        if (isLoser) {
            console.log(T('GAMESCREEN.LOOSE_HEADING'));
        }
        console.log("End conditions met ?", isWinner || isLoser);
    }, [isLoser]);

    if (loading || wordToGuess === null) {
        return (
            <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p className='text'>{T('GAMESCREEN.LOADING')}...</p>
            </div>
        );
    }

    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly'
            }}
        >

            <div
                style={{
                    fontFamily: "'Adlam', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: 'space-evenly',
                    gap: "2rem",
                    margin: "0 auto",
                    paddingTop: "3rem",
                }}
            >
                <HangmanSVG step={incorrectLetters.length} />
                <HangmanWord
                    theme={theme}
                    showResult={isLoser}
                    guessedLetters={guessedLetters}
                    wordToGuess={wordToGuess}
                />
                { !(isWinner || isLoser ) && <div style={{ alignSelf: "stretch" }}>
                    <Keyboard
                        theme={theme}
                        disabled={isWinner || isLoser}
                        correctLetters={guessedLetters.filter((letter) => wordToGuess && wordToGuess.includes(letter))}
                        incorrectLetters={incorrectLetters}
                        addGuessLetter={addGuessLetter}
                    />
                </div>}
            </div>

            {
                (isWinner || isLoser) && <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        height: '15%',
                        marginBottom: '2em',
                        padding: '0 2em'
                    }}
                >
                    <p
                        className='text'
                        style={{textAlign: 'center'}}
                    >{isWinner ? T('GAMESCREEN.WIN_HEADING') : T('GAMESCREEN.LOOSE_HEADING')}</p>
                    <div
                        style={{display: 'flex', flexDirection: 'row', gap: '1em'}}
                    >
                        <button className="start-button" onClick={() => resetGuessingWord()}>
                            {T('GAMESCREEN.RESTART')}
                        </button>
                        <button className="home-button" onClick={() => ChangePage("home")}>
                            {T('GAMESCREEN.HOME')}
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default GameScreen;
