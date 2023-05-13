import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const { httpRequest: sendOrder, isLoading, error } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    sendOrder(
      {
        url: "https://react-http-d9ed7-default-rtdb.europe-west1.firebasedatabase.app/order.json",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: {
          user: userData,
          orderedItems: cartCtx.items,
        },
      },
      () => {}
    );

    cartCtx.clearItems();
    setDidSubmit(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!checkout && modalActions}
    </Fragment>
  );

  const isLoadingModalContent = <p>Sending order data...</p>;
  let didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );
  if (error)
    didSubmitModalContent = (
      <Fragment>
        <p>{error}</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </Fragment>
    );

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !didSubmit && modalContent}
      {isLoading && isLoadingModalContent}
      {!isLoading && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
