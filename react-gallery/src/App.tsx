import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './views/HomePage'
import Album from './components/Album'


import './App.css'

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/album/:albumId" element={<Album/>}/>
            </Routes>
        </Router>
    )
}

export default App
