import React from "react";
import {observer} from "mobx-react-lite";
import {IBid} from "../../../infrastructure/models/bid";
import {ITask} from "../../../infrastructure/models/task";
import TaskTimer from "./TaskTimer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import BidTable from "./BidTable";
import Slider from "react-slick";

dayjs.extend(relativeTime);

interface IProps{
    bids: IBid[],
    task: ITask
}

const BidInfo : React.FC<IProps> = ({bids, task}) => {
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow:  10,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: true,
        slidesPerRow: 1,
        adaptiveHeight: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 500,
                settings:{
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                }
            }
        ]
    }
    return (
        <div className="task__bid__form__card bid__info">
          <Slider {...sliderSettings}>
              <div className="navbar__list_bottom">
                  <p className="text__silent text__sm">Bidders:  <span className="text__darker text__md">{bids.length}</span></p>
              </div>

              <div className="navbar__list_bottom">
                  <p className="text__silent text__sm">Bids:  <span className="text__darker text__md">{bids.length}</span></p>
              </div>
              
              <div className="navbar__list_bottom">
                  <p className="text__silent text__sm">Time left:  <span className="text__darker text__md"><TaskTimer task={task} /></span></p>
              </div>

              <div className="navbar__list_bottom">
                  <p className="text__silent text__sm">Duration: <span className="text__darker text__md">{dayjs(task.deliveryDate).from(task.createdAt)}</span></p>
              </div>
          </Slider>
          
            <div className="text__info__box" style={{margin: "1em 0"}}>
          <small className="text__darker text__small__info">All bids shown here are bids placed from the start of the task date till the end. Bids are held with legal actions, so please when making a bid be ready and sure to abide by that price point. <Link to="/" className="text__blue">Learn more about bidding</Link></small>
            </div>
            
            <div style={{margin: "1em 0"}}>
                {bids.length > 0 ? <BidTable bids={bids} /> : (<div className="text__middle">
                    <p>There are no bids on this task</p>
                    </div>)}
            </div>
        </div>
    )
}

export default observer(BidInfo);