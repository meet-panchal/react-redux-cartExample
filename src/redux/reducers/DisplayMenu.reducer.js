import * as actionTypes from "../actions/actionConstants";
import parentMenu from "../../data";

const updatedMenu = parentMenu.menu.map(category =>
  category.items.map(foodItem => ({ ...foodItem, quantity: 0 }))
);
const initialState = {
  data: updatedMenu
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INC_QUANTITY: {
      let updatedState = state.data.slice();
      updatedState.forEach(ele =>
        ele.forEach(innerEle => {
          if (innerEle.id === action.clickedItem.id) {
            innerEle.quantity += 1;
          }
        })
      );
      return {
        ...state,
        data: updatedState
      };
    }
    case actionTypes.DEC_QUANTITY: {
      let updatedState = state.data.slice();
      updatedState.forEach(ele =>
        ele.forEach(innerEle => {
          if (
            innerEle.id === action.clickedItem.id &&
            innerEle.quantity !== 0
          ) {
            innerEle.quantity -= 1;
          }
        })
      );
      return {
        ...state,
        data: updatedState
      };
    }
    case actionTypes.RES_QUANTITY: {
      let updatedState = state.data.slice();
      updatedState.forEach(ele =>
        ele.forEach(innerEle => {
          if (
            innerEle.id === action.clickedItem.id &&
            innerEle.quantity !== 0
          ) {
            innerEle.quantity = 0;
          }
        })
      );
      return {
        ...state,
        data: updatedState
      };
    }

    default:
      return state;
  }
};

export default menuReducer;
