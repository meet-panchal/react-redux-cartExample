import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import * as actionTypes from "./redux/actions/actionConstants";

import { connect } from "react-redux";

const DisplayCart = props => {
  let grandTotal = 0;
  let itemsInCart = [];
  let updatedState = props.menuData.slice();
  updatedState.forEach(ele =>
    ele.forEach(innerEle => {
      if (innerEle.quantity > 0) {
        itemsInCart.push(innerEle);
      }
    })
  );
  itemsInCart.forEach(item => {
    grandTotal += item.quantity * item.price;
  });
  return (
    <div className="table-responsive container">
      <table className="table table-hover table-primary">
        <thead>
          <tr className="center">
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {itemsInCart.map(checkedItem => (
            <tr key={checkedItem.id}>
              <th scope="row">{checkedItem.name}</th>
              <td className="center">${checkedItem.price}</td>
              <td className="center">
                <FontAwesomeIcon
                  className="mr-3"
                  icon={faPlusCircle}
                  onClick={() => props.increment(checkedItem)}
                />
                {checkedItem.quantity}
                <FontAwesomeIcon
                  className="ml-3"
                  icon={faMinusCircle}
                  onClick={() => props.decrement(checkedItem)}
                />
              </td>
              <td className="center">
                ${checkedItem.price * checkedItem.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {grandTotal > 0 ? <h1>Grand Total : {grandTotal}</h1> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCart);
