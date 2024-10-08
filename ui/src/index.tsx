import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import "./colors.css"
import "./index.css"
import { GlobalProvider } from "./utils/GlobalContext"

const devMode = !window?.["invokeNative"]
const root = ReactDOM.createRoot(document.getElementById("root"))

if (window.name === "" || devMode) {
	const renderApp = () => {
		root.render(
			<React.StrictMode>
				<GlobalProvider><App /></GlobalProvider>
			</React.StrictMode>
		)
	}

	if (devMode) {
		renderApp()
	} else {
		window.addEventListener("message", (event) => {
			if (event.data === "componentsLoaded") renderApp()
		})
	}
}
