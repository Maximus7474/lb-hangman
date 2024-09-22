import React from "react";
import Construction from "../utils/construction";

interface InstructionScreenProps {
    ChangePage: (page: string) => void;
}

const InstructionScreen: React.FC<InstructionScreenProps> = ({ ChangePage }) => {
    return (
        <>
            <h1 className="title">Instructions</h1>
            <Construction />
            <div className="button-wrapper">
                <button className="homescreen-button" onClick={() => ChangePage("home")}>
                    Home Screen
                </button>
            </div>
        </>
    );
};

export default InstructionScreen;
