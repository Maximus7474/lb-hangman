import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import AppProvider from "./utils/AppProvider";
import HomeScreen from "./pages/homescreen";
import InstructionScreen from "./pages/instructions";
import SettingScreen from "./pages/settings";
import GameScreen from "./pages/gamescreen";
import { GlobalProvider, useGlobalContext } from "./utils/GlobalContext";

const devMode = !window?.["invokeNative"];

const App = () => {
	const { setValue } = useGlobalContext();
	const [theme, setTheme] = useState("dark");
	const appDiv = useRef(null);

	const [currentPage, setCurrentPage] = useState<string>("home");

	const {
		getSettings,
		onSettingsChange,
		fetchNui
	} = window as any;

	useEffect(() => {
		if (devMode) {
			document.getElementsByTagName("html")[0].style.visibility = "visible";
			document.getElementsByTagName("body")[0].style.visibility = "visible";
			return
		} else {
			getSettings().then((settings: any) => {
				setTheme(settings.display.theme);
				fetchNui("lb-hangman:loadLocale", settings.locale)
					.then((locale: string) => setValue('locale', locale))
					.catch(err => console.error(`The provided locale (${settings.locale}) didn't return a JSON string ! Please fix inside of the ${GetCurrentResourceName ? GetCurrentResourceName() : "lb-hangman"}/locales/${settings.locale}.json`, err.message));
			});
			onSettingsChange((settings: any) => setTheme(settings.display.theme));
		}

		window.addEventListener("message", (e) => {
			if (e.data?.type === "setup") {
				if (e.data?.username) setValue('username', e.data.username);
				if (e.data?.userid) setValue('userid', e.data.userid);
			}
		})
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
