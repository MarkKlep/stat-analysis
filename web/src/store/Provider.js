import React, { useState, createContext } from 'react';

export const FileDataContext = createContext(null);

const Provider = ({ children }) => {
    const [fileData, setFileData] = useState(null);

    return (
        <FileDataContext.Provider value={{ fileData, setFileData }}>
            {children}
        </FileDataContext.Provider>
    );
};

export default Provider;
