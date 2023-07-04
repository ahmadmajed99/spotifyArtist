function reducer(
  state = {
    name: "",
    artistName: "",
    artistAlbum: [],
    artistQuery: "",
  },
  action: any | string
) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "SET_ARTIST_ALBUM":
      return {
        ...state,
        artistAlbum: action.artistAlbum,
      };
    case "SET_ARTIST_NAME":
      return {
        ...state,
        artistName: action.artistName,
      };
    case "SET_ARTIST_QUERY":
      return {
        ...state,
        artistQuery: action.artistQuery,
      };

    default:
      return state;
  }
}
export default reducer;
