import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import * as actionTypes from "./redux/actions/actionConstants";
import { connect } from "react-redux";

const DisplayMenu = props => {
  return (
    <div className="table-responsive container">
      <table className="table table-info">
        <thead>
          <tr className="center">
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.menuData.map(category =>
            category.map(foodItem => (
              <tr key={foodItem.id}>
                <th scope="row">
                  <p>{foodItem.name}</p>
                  <small className="mt-0">{foodItem.description}</small>
                </th>
                <td className="center">${foodItem.price}</td>
                <td className="center">{foodItem.quantity}</td>
                <td className="center">
                  <FontAwesomeIcon
                    className="mr-3"
                    icon={faPlusCircle}
                    onClick={() => props.increment(foodItem)}
                  />
                  <FontAwesomeIcon
                    className="mx-3"
                    icon={faMinusCircle}
                    onClick={() => props.decrement(foodItem)}
                    color={foodItem.quantity === 0 ? "gray" : "black"}
                  />
                  <FontAwesomeIcon
                    className="ml-3"
                    icon={faTimes}
                    onClick={() => props.reset(foodItem)}
                    color={foodItem.quantity > 0 ? "red" : "gray"}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = state => {
  return { menuData: state.data };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: clickedItem =>
      dispatch({ type: actionTypes.INC_QUANTITY, clickedItem: clickedItem }),
    decrement: clickedItem =>
      dispatch({ type: actionTypes.DEC_QUANTITY, clickedItem: clickedItem }),
    reset: clickedItem =>
      dispatch({ type: actionTypes.RES_QUANTITY, clickedItem: clickedItem })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplayMenu);
