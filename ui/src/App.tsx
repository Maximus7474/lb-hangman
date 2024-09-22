import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import AppProvider from "./utils/AppProvider";
import HomeScreen from "./pages/homescreen";

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
		if (devMode) alert(`Changing page to ${newPage}`);
		setCurrentPage(newPage);
	};

	const renderPage = () => {
        switch (currentPage) {
            case "home":
                return <HomeScreen ChangePage={switchPage} />;
            // case "settings":
            //     return <SettingsScreen ChangePage={switchPage} />;
            // case "instructions":
            //     return <InstructionsScreen ChangePage={switchPage} />;
            // case "start":
            //     return <GameScreen ChangePage={switchPage} />;
            default:
                return <HomeScreen ChangePage={switchPage} />;
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
