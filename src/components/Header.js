import React from 'react';
import {Navbar} from 'react-bootstrap';

const Header = () => (
    <header className="Header">
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <p href="/">{'React Marvel Heroes'}</p>
            </Navbar.Brand>
            <p>Data provided by marvel© 2019 MARVEL</p>
        </Navbar>
    </header>
);

export default Header;