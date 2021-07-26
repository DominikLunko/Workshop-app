import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../redux/store";

import { Link } from "react-router-dom";

import "./WorkshopDetails.scss";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import Moment from "moment";

import BrushIcon from "@material-ui/icons/Brush";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import CodeIcon from "@material-ui/icons/Code";
import FlashOnRoundedIcon from "@material-ui/icons/FlashOnRounded";
import EventIcon from "@material-ui/icons/Event";
import ScheduleIcon from "@material-ui/icons/Schedule";

import WorkShop from "../../components/WorkshopList/WorkShop/Workshop";

import { CircularProgress } from "@material-ui/core";
import { getWorkshopDetail } from "../../redux/actions/workshopDetailsAction";
import { addToCart, openCart } from "../../redux/actions/cartActions";

const WorkShopDetails: React.FC<any> = ({ match, history }) => {
  const workshopDetailsState = useSelector(
    (state: RootStore) => state.workshopDetails
  );
  const { loading, error, workshop, user, similarWorkshops } =
    workshopDetailsState;

  const dispatch = useDispatch();

  let workShopId: number;
  if (workshop?.id) workShopId = workshop.id;

  const cartQty = useSelector((state: RootStore) =>
    state?.cart.products.find((item) => item.id == workShopId));


  const [qty, setQty] = useState(1);

  const numberOfBuy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  let clearTime;

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let clearDate = workshop?.date.split("T")[0];
  clearDate = Moment(clearDate).format("MM.DD.YYYY");
  var day = new Date(clearDate);
  var weekday = days[day.getDay()];

  clearDate = Moment(clearDate).format("DD.MM.YYYY");

  const onlyTime = workshop?.date.split("T")[1];
  if (onlyTime) {
    clearTime = onlyTime.split(".")[0];
  }
  const decimalPrice = workshop?.price.toFixed(2);

  useEffect(() => {
    dispatch(getWorkshopDetail(match.params.id));
    window.scrollTo(0, 0);
  }, [match.params.id]);

  useEffect(() => {
    if (cartQty) setQty(cartQty?.qty);
  }, [cartQty?.qty]);

  return (
    <>
      <div className="details-container">
        <div className="button-section">
          <Link className="back-section" to="/">
            <KeyboardBackspaceIcon className="arrow-back" />
            <p>Back</p>
          </Link>
        </div>
        <div className="workshop-detail-wrapper">
          {loading ? (
            <CircularProgress size={50} className="loading-details" />
          ) : error ? (
            <h2 className="details-error">{error}</h2>
          ) : (
            <>
              <img src={workshop?.imageUrl} className="details-img" />
              <div className="details-cart-div">
                <div className="details-div">
                  <div className="category-date-time">
                    {workshop?.category === "design" && (
                      <BrushIcon className="category-icon-detail" />
                    )}
                    {workshop?.category === "frontend" && (
                      <DesktopWindowsIcon className="category-icon-detail" />
                    )}
                    {workshop?.category === "backend" && (
                      <CodeIcon className="category-icon-detail" />
                    )}
                    {workshop?.category === "marketing" && (
                      <FlashOnRoundedIcon className="category-icon-detail" />
                    )}
                    <div className="date-time">
                      <div className="dt">
                        <EventIcon className="details-dt" />
                        <p>
                          {weekday.substring(0, 3)} {clearDate}
                        </p>
                      </div>
                      <div className="dt">
                        <ScheduleIcon className="details-dt" />
                        <p>{clearTime} h</p>
                      </div>
                    </div>
                  </div>
                  <div className="details-title-desc">
                    <h1 className="workshop-title">{workshop?.title}</h1>
                    <div className="user-name">
                      <h3>WITH</h3>
                      <h2>{user?.name}</h2>
                    </div>
                    <p className="workshop-desc">{workshop?.desc}</p>
                  </div>
                </div>
                <div className="cart-div">
                  <h3 className="buy-ticket">Buy Your Ticket</h3>
                  <div className="details-price">
                    <h2 className="price-details-title">{decimalPrice}</h2>
                    <p>EUR</p>
                  </div>
                  <div className="select-cart-div">
                    <select
                      className="detail-cartitem__select"
                      value={qty}
                      onChange={(e) => setQty(JSON.parse(e.target.value))}
                    >
                      {numberOfBuy.map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>{
                        dispatch(openCart())
                        qty && dispatch(addToCart(workShopId, qty, true))
                      }
                      }
                      className="add-button"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <p className="subtotal">
                    Subtotal:{" "}
                    {(workshop && qty
                      ? qty * workshop?.price
                      : workshop?.price
                    )?.toFixed(2)}{" "}
                    EUR
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        
      </div>
      {similarWorkshops && similarWorkshops.length > 2 && (
        <div className="similar-workshops-container">
          <div className="empty-left-div"></div>
          <div className="similar-workshops-wrapper">
            <h1>Similar Workshops</h1>
            <div className="similar-workshops">
              {similarWorkshops.map((similarWorkshop) => (
                <WorkShop
                  key={similarWorkshop.id}
                  imageUrl={similarWorkshop.imageUrl}
                  title={similarWorkshop.title}
                  id={similarWorkshop.id}
                  price={similarWorkshop.price}
                  date={similarWorkshop.date}
                  category={similarWorkshop.category}
                  userId={similarWorkshop.userId}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="footer" style={{ marginTop: "2px" }}>
        <p>© TINEL Meetup 2020.</p>
      </div>
    </>
  );
};

export default WorkShopDetails;
