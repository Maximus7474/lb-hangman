import React from "react";
import { useGlobalContext } from "../utils/GlobalContext";

interface HomeScreenProps {
    theme: string,
    ChangePage: (page: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ theme, ChangePage }) => {
	const { T } = useGlobalContext();
    return (
        <>
            <h1 className="title">{T("HOMESCREEN.TITLE")}</h1>
            <h3 className="subtitle">{T("HOMESCREEN.SUBTITLE")}</h3>
            <img
                src="./hangman.svg"
                style={{ maxWidth: "40%" }}
                alt="Hangman illustration"
                className="svg-icon"
            />
            <div className="button-wrapper">
                <button className="start-button" onClick={() => ChangePage("start")}>
                    {T("HOMESCREEN.BUTTONS.STARTGAME")}
                </button>
                <button className="settings-button" onClick={() => ChangePage("settings")}>
                    {T("HOMESCREEN.BUTTONS.SETTINGS")}
                </button>
                <button className="instructions-button" onClick={() => ChangePage("instructions")}>
                    {T("HOMESCREEN.BUTTONS.INSTRUCTIONS")}
                </button>
            </div>
        </>
    );
};

export default HomeScreen;
