import { createStore } from "redux";
import contactReducer from "./reducer/contactReducer.js";

const store = createStore(contactReducer);

export default store;
