import styles from "./AlbumsArtist.module.css";
import { useSelector } from "react-redux";
import DefaultImg from "assets/defaultImg.jpeg";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AlbumsArtist = () => {
  const albumsData = useSelector((state: any) => state.artistAlbum);
  const artistName = useSelector((state: any) => state.artistName);
  const navigate = useNavigate();

  const extractText = (text: string): string => {
    const hyphenIndex = text.indexOf("-");
    const parenthesisIndex = text.indexOf("(");

    let endIndex = -1;
    if (hyphenIndex !== -1 && parenthesisIndex !== -1) {
      endIndex = Math.min(hyphenIndex, parenthesisIndex);
    } else if (hyphenIndex !== -1) {
      endIndex = hyphenIndex;
    } else if (parenthesisIndex !== -1) {
      endIndex = parenthesisIndex;
    }

    if (endIndex !== -1) {
      return text.substring(0, endIndex).trim();
    }

    return text;
  };

  useEffect(() => {
    if (albumsData.length === 0) {
      navigate("/app");
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Albums</h1>
        <p>{artistName}</p>
      </div>

      <div className={styles.wrapper}>
        {albumsData?.map((album: any) => (
          <>
            <div key={album.id} className={styles.card}>
              {album.images[0]?.url ? (
                <img
                  src={album?.images[0]?.url}
                  alt="hello"
                  className={styles.artistImg}
                />
              ) : (
                <img
                  src={DefaultImg}
                  alt="hello"
                  className={styles.artistImg}
                />
              )}
              <div className={styles.details}>
                <h2>{extractText(`${album?.name}`)}</h2>
                <p className={styles.artistName}>{artistName}</p>
                <p className={styles.albumRelease}>{album?.release_date}</p>
                <p className={styles.albumTrack}>
                  {album?.total_tracks} <span>tracks</span>
                </p>
              </div>
              <a
                href={album?.external_urls?.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.previewBtn}>
                  Preview On Spotify
                </button>
              </a>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default AlbumsArtist;
