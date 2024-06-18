import React, { useState, useContext } from 'react';
import { FileDataContext } from '../providers/FileProvider';
import "../styles/HomePage.scss";
import "../styles/Error.scss";

const HomePage = () => {
  const [filesData, setFilesData] = useState([]);
  const [failedToLoad, setFailedToLoad] = useState(null);

  const { setFileData, setFileName } = useContext(FileDataContext);

  const handleLoadZipData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/loadZipData');

      if (!response.ok) {
        throw new Error('Помилка при завантаженні архіву данних');
      }

      const data = await response.json();

      data.forEach(txtFile => {
        txtFile.data = txtFile.data.split('\r\n').map(Number);
      });

      setFilesData(data);
      setFailedToLoad(null);
    } catch (error) {
      setFailedToLoad('Помилка:', error);
    }
  }

  const handleLoadFileData = (selectedFile) => {
    setFileName(selectedFile.name);
    setFileData(selectedFile.data);
  }

  return (
    <div className="home-page">
      <button className='load-btn' onClick={handleLoadZipData}>Завантажити архів данних</button>

      <ul>
        {filesData.map((file, index) => (
          <li key={index} onClick={() => handleLoadFileData(file)}>
            <p>{file.name}</p>
          </li>
        ))}
      </ul>

      {failedToLoad && <p className='error-text'>{failedToLoad}</p>}
    </div>
  )
}

export default HomePage;
