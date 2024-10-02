import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextProps {
    state: Record<string, any>;
    setValue: (key: string, value: any) => void;
    getValue: (key: string) => any;
    T: (path: string, args?: Record<string, any>) => string;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [state, setState] = useState<Record<string, any>>({});

    const setValue = (key: string, value: any) => {
        setState(prevState => ({ ...prevState, [key]: value }));
    };

    const getValue = (key: string) => state[key];

    const T = (path: string, args?: Record<string, any>): string => {
        const locale = state.locale;

        const keys = path.split('.');

        let value: any = locale;

        for (const key of keys) {
            if (value && key in value) {
                value = value[key];
            } else {
                return path;
            }
        }

        if (typeof value === 'string' && args) {
            return value.replace(/\{(.*?)\}/g, (_, key) => {
                return key in args ? args[key] : `{${key}}`;
            });
        }

        return value;
    };

    return (
        <GlobalContext.Provider value={{ state, setValue, getValue, T }}>
            {children}
        </GlobalContext.Provider>
    );
};
