import React from "react";
// import "./App.css";

const HomeScreen = () => {

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
                <button className="start-button" onClick={() => alert("Starting game...")}>
                    Start Game
                </button>
                <button className="settings-button" onClick={() => alert("Opening settings...")}>
                    Settings
                </button>
                <button className="instructions-button" onClick={() => alert("Viewing instructions...")}>
                    Instructions
                </button>
            </div>
        </>
	);
};

export default HomeScreen;
