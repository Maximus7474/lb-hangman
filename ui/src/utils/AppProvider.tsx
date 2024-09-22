import React, { ReactNode } from "react";

const devMode = !window?.["invokeNative"];

interface AppProviderProps {
	children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	return devMode ? <div className="dev-wrapper">{children}</div> : <>{children}</>;
};

export default AppProvider;
