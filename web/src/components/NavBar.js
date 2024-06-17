import React, { useContext } from 'react';
import { FileDataContext } from '../providers/FileProvider';
import { Link } from 'react-router-dom';
import '../styles/NavBar.scss';

const NavBar = () => {
    const { fileName } = useContext(FileDataContext);

    return (
    <div className='nav-bar'>
        <Link to='/'>Home Page</Link>
        <Link to='/file-opener'>Варіаційний ряд та класи</Link>
        {fileName && <p>Файл: {fileName}</p>}
    </div>
    )
}

export default NavBar