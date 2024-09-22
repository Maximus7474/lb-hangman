import React from "react";

interface HomeScreenProps {
    ChangePage: (page: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ ChangePage }) => {
    return (
        <>
            <h1 className="title">Hangman</h1>
            <h3 className="subtitle">Don't get caught short</h3>
            <img
                src="./hangman.svg"
                style={{ maxWidth: "40%" }}
                alt="Hangman illustration"
                className="svg-icon"
            />
            <div className="button-wrapper">
                <button className="start-button" onClick={() => ChangePage("start")}>
                    Start Game
                </button>
                <button className="settings-button" onClick={() => ChangePage("settings")}>
                    Settings
                </button>
                <button className="instructions-button" onClick={() => ChangePage("instructions")}>
                    Instructions
                </button>
            </div>
        </>
    );
};

export default HomeScreen;
