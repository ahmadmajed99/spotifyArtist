import { ColorRing } from "react-loader-spinner";

export default function Loader({ height = 50, width = 50 }) {
  return (
    <ColorRing
      visible={true}
      height="30"
      width="30"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#00a76a", "#00a76a", "#00a76a", "#00a76a", "#00a76a"]}
    />
  );
}
