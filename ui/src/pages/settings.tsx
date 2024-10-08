import React from "react";
import Construction from "../utils/construction";

interface SettingScreenProps {
    theme: string,
    ChangePage: (page: string) => void;
}

const SettingScreen: React.FC<SettingScreenProps> = ({ theme, ChangePage }) => {
    return (
        <>
            <h1 className="title">Settings</h1>
            <Construction />
            <div className="button-wrapper">
                <button className="homescreen-button" onClick={() => ChangePage("home")}>
                    Home Screen
                </button>
            </div>
        </>
    );
};

export default SettingScreen;
