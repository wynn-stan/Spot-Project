import React from 'react';
import Home from './Home';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../public/style.css";
import Creator from './Creator';
import Explore from './Explore';
import Notifications from './Notifications';

//get 10 posts every laxy load

function App(){
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<Home />} />
                <Route path="/create-post" element={<Creator />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/explore" element={<Explore />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;