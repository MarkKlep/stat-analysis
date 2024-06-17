import React, { useState, createContext } from 'react';

export const FileDataContext = createContext(null);

const Provider = ({ children }) => {
    const [fileData, setFileData] = useState(null);
    const [fileName, setFileName] = useState(null);

    return (
        <FileDataContext.Provider value={{ fileData, setFileData, fileName, setFileName }}>
            { children }
        </FileDataContext.Provider>
    );
};

export default Provider;
