import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Workshop.scss";

import BrushIcon from "@material-ui/icons/Brush";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import CodeIcon from "@material-ui/icons/Code";
import FlashOnRoundedIcon from "@material-ui/icons/FlashOnRounded";
import EventIcon from "@material-ui/icons/Event";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import Moment from 'moment'

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";



import { addToCart, openCart } from "../../../redux/actions/cartActions";
import { RootStore } from "../../../redux/store";

interface WorkshopType {
  imageUrl: string;
  title: string;
  id: number;
  price: number;
  date: String;
  category: string;
  userId: number;
}

const Workshop: React.FC<WorkshopType> = ({
  imageUrl,
  title,
  id,
  price,
  date,
  category,
  userId,
}) => {
  
  const dispatch = useDispatch();



  let clearDate = date.split("T")[0];
  
  clearDate = Moment(clearDate).format('DD.MM.YYYY')
  const onlyTime = date.split("T")[1];
  const clearTime = onlyTime.split(".")[0];
  const decimalPrice = price.toFixed(2);

  const [plusOne, setPlusOne] = useState(false);

  return (
    <Card className="card-project" id={JSON.stringify(id)?.concat("-card")}>
      <Link to={`/workshop/${id}`} className="info__button">
        <CardImg
          top
          src={imageUrl}
          alt="Card image cap"
          style={{
            borderRadius: "10px 10px 0px 0px",
            height: "180px",
            objectFit: "cover",
          }}
         
        />
      </Link>
      <CardBody className="card-body">
        {category === "design" && <BrushIcon className="category-icon" />}
        {category === "frontend" && (
          <DesktopWindowsIcon className="category-icon" />
        )}
        {category === "backend" && <CodeIcon className="category-icon" />}
        {category === "marketing" && (
          <FlashOnRoundedIcon className="category-icon" />
        )}
        <div className="date-time">
          <div className="dt">
            <EventIcon className="date-icon"/>
            <p>{clearDate}</p>
          </div>
          <div className="dt">
            <ScheduleIcon className="date-icon"/>
            <p>{clearTime} h</p>
          </div>
        </div>
        <Link to={`/workshop/${id}`} className="info__button">
          <CardTitle
            className="title-card"
            tag="h5" 
          >
            {title}
          </CardTitle>
        </Link>
        <CardSubtitle tag="h6" className="price">
          {decimalPrice}
          <p>EUR</p>
        </CardSubtitle>
        <p className={plusOne ? "plus-one-active" : "plus-one"}>+1</p>
        <Button
          className="button"
          onClick={() => {
            dispatch(addToCart(id, 1, false));
            dispatch(openCart())
            setPlusOne((prevState) => !prevState);
            setTimeout(()=>{
              setPlusOne((prevState) => !prevState)
            },500)
          }}
        >
          Add To Cart
        </Button>
        <ShoppingCartOutlinedIcon className="buy-icon" onClick={() => {
            dispatch(addToCart(id, 1, false));
            setPlusOne((prevState) => !prevState);
            setTimeout(()=>{
              setPlusOne((prevState) => !prevState)
            },1000)
          }}/>
      </CardBody>
    </Card>
  );
};

export default Workshop;
