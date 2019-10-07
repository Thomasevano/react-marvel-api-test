import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './components/Header';
import Character from './components/Character';
import Paginator from 'react-hooks-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [characters,
        setCharacters] = useState([]);
    const [loading,
        setLoading] = useState(false);
    const [currentPage,
        setCurrentPage] = useState(1);
    const [charactersPerPage,
        setCharactersPerPage] = useState(20);
    const [totalCharacters,
        setTotalCharacters] = useState(100);
    const [currentCharacter,
        setCurrentCharacter] = useState([]);
    const [offset,
        setOffset] = useState(0);

    useEffect(() => {
        const fetchPosts = async() => {
            setLoading(true);
            const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?apikey=43c5d11a6849a14acc62c7048ab174d5&limit=${totalCharacters}`);
            setCharacters(response.data.data.results);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    useEffect(() => {
        setCurrentCharacter(characters.slice(offset, offset + charactersPerPage));
    }, [offset, characters]);

    // Change page
    return (
        <div className="App container">
            <Header/>
            <div className="characters">
              <div className="container">
                <div className="row">
                    {currentCharacter.map(character => <Character key={character.id} character={character} loading={loading}/>)}
                </div>
            </div>
            </div>
            
            <Paginator
                totalRecords={characters.length}
                pageLimit={charactersPerPage}
                pageNeighbours={2}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}/>
        </div>
    );
}

export default App;
