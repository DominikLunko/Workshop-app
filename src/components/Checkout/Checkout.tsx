import React, { useState} from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DatePicker from "react-datepicker";
import CloseIcon from "@material-ui/icons/Close";

import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/orderAction";
import { RootStore } from "../../redux/store";

import "./Checkout.scss";
import { resetCart } from "../../redux/actions/cartActions";

interface MyProps {
  setShowCheckout: (show: boolean) => void;
  showCheckout: boolean;
}

interface FromData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  date: Date;
  gender: string;
  address: string;
  zipCode: number;
  iAggree: boolean;
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed!"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed!"),
  emailAddress: yup
    .string()
    .required("Please enter your email")
    .email("Email doesn't contain @"),
  address: yup.string().required("Please enter your Address"),
  zipCode: yup
    .string()
    .required("Please enter your Zip Code")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
  iAgree: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
  date: yup
    .date()
    .default(() => new Date())
    .max(new Date(), "Invalid Date"),
});
const Checkout: React.FC<MyProps> = ({ setShowCheckout, showCheckout }) => {
  const dispatch = useDispatch();

  const [showThankYou, setShowThankYou] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleProceedCheckout = (data: FromData) => {
    setShowThankYou(true);
    dispatch(createOrder());
    dispatch(resetCart())
    reset();
  };
  return (
    <>
      {showCheckout && (
        <div className="checkout-wrap">
          <div
            className="checkout-div"
            onClick={() => setShowCheckout(false)}
          ></div>
          <div className={!showThankYou ? "form-div" : "form-div-thank-you"}>
            {!showThankYou ? (
              <form
                className="form"
                onSubmit={handleSubmit(handleProceedCheckout)}
              >
                <div className="title-desc">
                  <div className="title-close">
                    <h1>Checkout</h1>
                    <CloseIcon
                      className="closeIcon"
                      onClick={() => setShowCheckout(false)}
                    />
                  </div>
                  <p>Please fill out the form to complete the order!</p>
                </div>

                <div className="input-div">
                  <div className="label">
                    <label>First name</label>
                    <span className="errors-span">
                      {errors["firstName"]?.message}
                    </span>
                  </div>
                  <input
                    {...register("firstName")}
                    className={!errors["firstName"] ? "input" : "input-fail"}
                    name="firstName"
                    placeholder="Type your first name"
                    type="text"
                  />
                </div>
                <div className="input-div">
                  <div className="label">
                    <label>Last name</label>
                    <span className="errors-span">
                      {errors["lastName"]?.message}
                    </span>
                  </div>
                  <input
                    {...register("lastName")}
                    className={!errors["lastName"] ? "input" : "input-fail"}
                    name="lastName"
                    placeholder="Type your last name"
                    type="text"
                  />
                </div>
                <div className="input-div">
                  <div className="label">
                    <label>Email</label>
                    <span className="errors-span">
                      {errors["emailAddress"]?.message}
                    </span>
                  </div>
                  <input
                    {...register("emailAddress")}
                    className={!errors["emailAddress"] ? "input" : "input-fail"}
                    name="emailAddress"
                    placeholder="Type your email Address"
                    type="text"
                  />
                </div>

                <div className="date-gender">
                  <div className="date-gender-inside-div">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <label>Date Of Birth</label>
                      <span className="errors-span">
                        {errors["date"]?.message}
                      </span>
                    </div>
                    <DatePicker
                      className={
                        !errors["date"] ? "datepicker" : "datepicker-fail"
                      }
                      {...register("date")}
                      name="date"
                      selected={startDate}
                      onChange={(date: Date) => setStartDate(date)}
                    />
                  </div>
                  <div className="date-gender-inside-div">
                    <label>Gender</label>
                    <select
                      {...register("gender")}
                      className={!errors["gender"] ? "input" : "input-fail"}
                      name="gender"
                    >
                      <option>Other</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div className="input-div">
                  <div className="label">
                    <label>Address</label>
                    <span className="errors-span">
                      {errors["address"]?.message}
                    </span>
                  </div>
                  <input
                    {...register("address")}
                    className={!errors["address"] ? "input" : "input-fail"}
                    name="address"
                    placeholder="Type your address"
                  />
                </div>
                <div className="input-div">
                  <div className="label">
                    <label>ZIP Code</label>
                    <span className="errors-span">
                      {" "}
                      {errors["zipCode"]?.message}
                    </span>
                  </div>
                  <input
                    {...register("zipCode")}
                    className={!errors["zipCode"] ? "input" : "input-fail"}
                    name="zipCode"
                    placeholder="e.g 21300"
                  />
                </div>
                <label className="agree-label">
                  <input
                    type="checkbox"
                    {...register("iAgree")}
                    name="iAgree"
                  />
                  &nbsp; I Agree
                </label>
                <span className="errors-span">{errors["iAgree"]?.message}</span>
                <button type="submit" className="submit-btn">
                  Checkout
                </button>
              </form>
            ) : (
              <div className="thank-you-div">
                <h2>Thank You!</h2>
                <p>Order successfully completed</p>
                <button
                  className="submit-btn"
                  onClick={() => {
                    setShowThankYou(false);
                    setShowCheckout(false);
                  }}
                >
                  Back To Shop
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
