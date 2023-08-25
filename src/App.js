import './App.css';
import Home from './pages/Home.js';
import About from './pages/About.jsx'
import Mynotes from './pages/Mynotes.js'
import Note from './pages/Note'
import TempMyNotes from './pages/tempmynotes'
import TempHead from './pages/tempHead'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
      <Router>
        <>
          <Routes>
            <Route path="/" element={<TempHead />} >

              <Route index element={<Home />} />

              <Route path="/about" element={<About />} />

              <Route path="/mynotes" element={<TempMyNotes />} >

                <Route index element={<Mynotes />} />

                {/* <Route path="note" element={<Tempnote />} > */}

                <Route path="note" element={<Note />} />

                {/* </Route> */}

              </Route>

            </Route>

          </Routes>

        </>
      </Router>

  );
}
export default App;
