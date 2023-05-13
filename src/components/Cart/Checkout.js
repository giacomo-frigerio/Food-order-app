import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  if (value.trim().length === 0) return true;
  return false;
};

const isFiveChars = (value) => {
  if (value.trim().length === 5) return true;
  return false;
};

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    cap: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const capRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredCap = capRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredCapValid = isFiveChars(enteredCap);
    const enteredCityValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameValid,
      street: enteredStreetValid,
      cap: enteredCapValid,
      city: enteredCityValid,
    });

    const formIsValid =
      enteredNameValid &&
      enteredStreetValid &&
      enteredCapValid &&
      enteredCityValid;

    if (!formIsValid) return;

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      cap: enteredCap,
      city: enteredCity,
    });
  };

  const nameClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const capClasses = `${classes.control} ${
    formInputsValidity.cap ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={capClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={capRef} />
        {!formInputsValidity.cap && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
