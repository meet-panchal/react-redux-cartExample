import { createStore } from "redux";
import menuReducer from "../redux/reducers/DisplayMenu.reducer";
export const store = createStore(menuReducer);
