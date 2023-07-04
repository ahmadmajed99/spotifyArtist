import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Artist from "./components/Artist/Artist";
import Login from "./components/SpotifyServices/Login";
import { HandleLoginRedirect } from "./components/SpotifyServices/SpotifyService";
import NoLoggedIn from "components/NoLoggedIn";
import AlbumsArtist from "components/Artist/AlbumsArtist";
import { useSelector } from "react-redux";

function App() {
  // Call handleLoginRedirect to check for access token on app load
  HandleLoginRedirect();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<NoLoggedIn />}>
            <Route path="/app" element={<Artist />} />
            <Route path="/artist/:artistId/albums" element={<AlbumsArtist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
