import reducer from "./Reducer";
import { createStore, Store } from "redux";

const store: Store = createStore(reducer);
export default store;
