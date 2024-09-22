import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import AppProvider from "./utils/AppProvider";
import HomeScreen from "./pages/homescreen";

const devMode = !window?.["invokeNative"];

const App = () => {
	const [theme, setTheme] = useState("light");
	const appDiv = useRef(null);

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

	return (
		<AppProvider>
			<div className="app" ref={appDiv} data-theme={theme}>
				<div className="app-wrapper">
					<HomeScreen />
				</div>
			</div>
		</AppProvider>
	);
};

export default App;
