import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import AppProvider from "./utils/AppProvider";

const devMode = !window?.["invokeNative"];

const App = () => {
	const [theme, setTheme] = useState("light");
	const appDiv = useRef(null);

	const {
		setPopUp,
		setContextMenu,
		selectGIF,
		selectGallery,
		selectEmoji,
		fetchNui,
		sendNotification,
		getSettings,
		onSettingsChange,
		colorPicker,
		useCamera
	} = window as any;

	useEffect(() => {
		if (devMode) {
			document.getElementsByTagName("html")[0].style.visibility = "visible"
			document.getElementsByTagName("body")[0].style.visibility = "visible"
			return
		} else {
			getSettings().then((settings: any) => setTheme(settings.display.theme))
			onSettingsChange((settings: any) => setTheme(settings.display.theme))
		}

		// fetchNui("getDirection").then((direction: string) => setDirection(direction))

		// window.addEventListener("message", (e) => {
		// 	if (e.data?.type === "updateDirection") setDirection(e.data.direction)
		// })
	}, []);

	return (
		<AppProvider>
			<div className="app" ref={appDiv} data-theme={theme}>
				<div className="app-wrapper">
					<p>Under Construction</p>
					<img src="https://i.pinimg.com/originals/eb/1b/27/eb1b27863813653543914d222ceb9cd0.gif" style={{maxWidth: '95%'}}/>
				</div>
			</div>
		</AppProvider>
	);
}

export default App
