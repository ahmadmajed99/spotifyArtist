import Logo from "assets/spotifyLogo.png";
import { LoginWithSpotify } from "./SpotifyService";
import styles from "./Login.module.css";
import Loader from "components/Loader";
import { useState } from "react";

const Login = () => {
  const [progress, setProgress] = useState<boolean>(false);

  const handleProgress = () => {
    setTimeout(() => {
      setProgress(true);
    }, 200);
  };

  return (
    <div className={styles.container}>
      <button
        disabled={progress}
        onClick={() => {
          LoginWithSpotify();
          handleProgress();
        }}
        className={styles.btn}
      >
        Login <img src={Logo} alt="logo" />
        {progress && <Loader />}
      </button>
    </div>
  );
};

export default Login;
