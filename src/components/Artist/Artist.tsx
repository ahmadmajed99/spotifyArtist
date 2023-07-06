import styles from "./Artist.module.css";
import {
  searchArtist,
  LogoutFromSpotify,
} from "components/SpotifyServices/SpotifyService";
import { useState, useEffect, useRef } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import BrowsingArtist from "./BrowsingArtist";

const Artist = () => {
  const [artistQuery, setArtistQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const token = localStorage.getItem("access_token_spotify");

  const handleSearch = () => {
    if (artistQuery.length > 0)
      searchArtist(artistQuery).then((artists) => {
        setSearchResults(artists);
      });
  };

  const recentSearch = () => {
    const query = localStorage.getItem("query");
    if (query !== null) {
      searchArtist(query).then((artists) => {
        setSearchResults(artists);
      });
    }
  };

  useEffect(() => {
    handleSearch();
    recentSearch();
  }, [artistQuery]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <LogoutFromSpotify />,
    },
  ];

  const name: string = useSelector((state: string | any) => state.name);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && artistQuery.length > 0) {
      handleSearch();
    }
  };

  const inputRefs: any = [useRef(null), useRef(null)];

  const handleFocus = (index: any) => {
    inputRefs[index].current.classList.add(styles.focused);
  };

  const handleBlur = (index: any) => {
    inputRefs[index].current.classList.remove(styles.focused);
  };

  return (
    <div className={styles.container}>
      <div className={styles.r1}>
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <div className={styles.name}>
                <i
                  className="fa fa-user pr-2"
                  aria-hidden="true"
                  style={{ color: "#ffffff" }}
                ></i>
                {name}
              </div>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <h1>Spotify Artist Search</h1>
      <div className={styles.r2}>
        <input
          type="text"
          placeholder="Search for an artist ..."
          className={styles.input}
          value={artistQuery}
          onChange={(e) => setArtistQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          ref={inputRefs[0]}
          onFocus={() => handleFocus(0)}
          onBlur={() => handleBlur(0)}
        />
        <button onClick={handleSearch} className={styles.searchBtn}>
          <BsSearch />
        </button>
      </div>
      <div className={styles.resultContainer}>
        {searchResults.length > 0 ? (
          <BrowsingArtist searchResults={searchResults} />
        ) : (
          <h3>No search provided</h3>
        )}
      </div>
    </div>
  );
};

export default Artist;
