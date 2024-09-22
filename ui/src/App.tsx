import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const devMode = !window?.["invokeNative"];

const App = () => {
	const [theme, setTheme] = useState("light");
	const [zoomLevel, setZoomLevel] = useState(1);
	const [notificationText, setNotificationText] = useState("Notification text");
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
				</div>
			</div>
		</AppProvider>
	);
}

interface AppProviderProps {
	children: ReactNode;
}
  
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	if (devMode) {
	  	return <div className="dev-wrapper">{children}</div>;
	} else {
		return <>{children}</>;
	}
};

export default App
