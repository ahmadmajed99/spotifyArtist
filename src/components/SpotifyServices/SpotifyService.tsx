import SpotifyWebApi from "spotify-web-api-js";
import { useNavigate } from "react-router";
import { BiLogOut } from "react-icons/bi";
import styles from "./SpotifyServices.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";

const spotifyApi = new SpotifyWebApi();

export const LoginWithSpotify = () => {
  const clientId = "782e81ba49164daca7e429fc49c21027";
  const redirectUri = "http://localhost:3000/app";

  const scopes = ["user-read-private", "user-read-email"]; // Add any additional scopes you need

  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token`;

  window.location.href = url;

  return null;
};

export const HandleLoginRedirect = () => {
  const urlParams = new URLSearchParams(window.location.hash.substr(1));
  const accessToken: any = urlParams.get("access_token");
  const dispatch = useDispatch();

  localStorage.setItem("token", accessToken);

  if (accessToken) {
    // Example: Get user profile information
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getMe().then((response) => {
      dispatch({ type: "SET_NAME", name: response.display_name });
    });
  }
};

export const searchArtist = async (query: string) => {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query
  )}&type=artist`;

  const token = localStorage.getItem("token");

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response: any) => {
      const artists = response.data.artists.items;
      localStorage.setItem("query", query);
      return artists;
    })
    .catch((error) => {
      console.error("Error searching for artist:", error);
      return [];
    });
};

export const getArtistAlbums = async (artistId: string) => {
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;

  const token = localStorage.getItem("token");
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((response: any) => {
      const albums = response.data.items;
      return albums;
    })
    .catch((error) => {
      console.error("Error getting artist albums:", error);
      return [];
    });
};

export const LogoutFromSpotify = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    spotifyApi.setAccessToken(null);
  };

  return (
    <button onClick={handleLogout} className={styles.logoutBtn}>
      <BiLogOut /> Logout
    </button>
  );
};
