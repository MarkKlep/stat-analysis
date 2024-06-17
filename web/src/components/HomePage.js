import React, { useState } from 'react';
import "../styles/HomePage.scss";

const HomePage = () => {
  const [filesData, setFilesData] = useState([]);

  const handleloadZipData = async () => {
    const response = await fetch('http://localhost:3001/api/loadZipData');
    const data = await response.json();

    setFilesData(data);
  }

  return (
    <div className="home-page">
      <button className='load-btn' onClick={handleloadZipData}>Завантажити архів данних</button>

      <ul>
        {filesData.map((file, index) => (
          <li key={index}>
            <p>{file.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage;