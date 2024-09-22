import React from "react";
// import "./App.css";

const HomeScreen = () => {

	return (
		<>
            <h1 className="game-title">Hangman</h1>
            <img
                src="./hangman.png"
                style={{maxWidth: '40%'}}
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
