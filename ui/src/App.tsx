import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import AppProvider from "./utils/AppProvider";
import HomeScreen from "./pages/homescreen";
import InstructionScreen from "./pages/instructions";
import SettingScreen from "./pages/settings";
import GameScreen from "./pages/gamescreen";

const devMode = !window?.["invokeNative"];

const App = () => {
	const [theme, setTheme] = useState("dark");
	const appDiv = useRef(null);

	const [currentPage, setCurrentPage] = useState<string>("home");

	const {
		getSettings,
		onSettingsChange
	} = window as any;

	useEffect(() => {
		if (devMode) {
			document.getElementsByTagName("html")[0].style.visibility = "visible";
			document.getElementsByTagName("body")[0].style.visibility = "visible";
		} else {
			getSettings().then((settings: any) => setTheme(settings.display.theme));
			onSettingsChange((settings: any) => setTheme(settings.display.theme));
		}
	}, []);

	const switchPage = (newPage: string) => {
		setCurrentPage(newPage);
	};

	const renderPage = () => {
        switch (currentPage) {
            case "home":
                return <HomeScreen ChangePage={switchPage} theme={theme} />;
            case "settings":
                return <SettingScreen ChangePage={switchPage} theme={theme} />;
            case "instructions":
                return <InstructionScreen ChangePage={switchPage} theme={theme} />;
            case "start":
                return <GameScreen ChangePage={switchPage} theme={theme} />;
            default:
                return <HomeScreen ChangePage={switchPage} theme={theme} />;
        }
    };

	return (
		<AppProvider>
			<div className="app" ref={appDiv} data-theme={theme}>
				<div className="app-wrapper">
					{renderPage()}
				</div>
			</div>
		</AppProvider>
	);
};

export default App;
