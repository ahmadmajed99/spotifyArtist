import React, { useEffect, useState } from "react";
import styles from "./BrowsingArtist.module.css";
import ReactStars from "react-rating-stars-component";
import DefaultImg from "assets/defaultImg.jpeg";
import { getArtistAlbums } from "components/SpotifyServices/SpotifyService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface SearchResultsProps {
  searchResults: any[];
  artistQuery: any;
}

const BrowsingArtist: React.FC<SearchResultsProps> = ({
  searchResults,
  artistQuery,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MAX_POPULARITY = 100;
  const MAX_RATING = 5;

  const starSettings = {
    edit: false,
    size: 20,
  };

  const HandleAlbumsClick = async (artistId: string, artistName: string) => {
    const albums = await getArtistAlbums(artistId);
    dispatch({ type: "SET_ARTIST_ALBUM", artistAlbum: albums });
    dispatch({ type: "SET_ARTIST_NAME", artistName: artistName });
    dispatch({ type: "SET_ARTIST_QUERY", artistQuery: artistQuery });
    navigate(`/artist/${artistId}/albums`);
    window.scrollTo(0, 0);
  };

  function formatFollowers(number: number): string {
    if (number >= 1000000) {
      return `${Math.floor(number / 1000000)}M followers`;
    } else if (number >= 1000) {
      return `${(number / 1000).toLocaleString()}K followers`;
    } else {
      return `${number.toLocaleString()} followers`;
    }
  }

  return (
    <div className={styles.container}>
      {searchResults?.map((artist: any) => (
        <div key={artist.id} className={styles.card}>
          {artist.images[0]?.url ? (
            <img
              src={artist?.images[0]?.url}
              alt="hello"
              className={styles.artistImg}
            />
          ) : (
            <img src={DefaultImg} alt="hello" className={styles.artistImg} />
          )}
          <div className={styles.details}>
            <h2>{artist?.name}</h2>
            <p>{formatFollowers(artist?.followers?.total)}</p>
            {artist?.popularity ? (
              <ReactStars
                count={(artist?.popularity / MAX_POPULARITY) * MAX_RATING}
                {...starSettings}
                activeColor="#ffd700"
              />
            ) : (
              <span>No Rates</span>
            )}
            {/* <Link to={`/artist/${artist.id}/albums`}> */}
            <button
              onClick={() => HandleAlbumsClick(artist.id, artist.name)}
              className={styles.albumsLink}
            >
              View Albums &rarr;
            </button>
            {/* </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrowsingArtist;
