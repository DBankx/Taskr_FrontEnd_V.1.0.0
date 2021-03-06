import React from "react";
import {ITask} from "../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Divider, Image} from "@chakra-ui/react";
import 'react-medium-image-zoom/dist/styles.css';
import Zoom from 'react-medium-image-zoom';
import Slider from "react-slick";
import {ChevronLeftIcon, ChevronRightIcon, PriceTagIcon} from "../../infrastructure/icons/Icons";
import {TaskStatus} from "../../infrastructure/enums/taskStatus";

interface IProps{
    task: ITask
}

const TaskImages : React.FC<IProps> = ({task}) => {

    function NextArrow(props: any) {
        const { onClick } = props;
        return (
            <button
                className="task__carousel__next__arr"
                onClick={onClick}
            >
              <ChevronRightIcon boxSize={7} color="#3D3373" /> 
            </button>
        );
    }

    function PrevArrow(props: any) {
        const { onClick } = props;
        return (
            <button
                className="task__carousel__prev__arr"
                onClick={onClick}
            >
                <ChevronLeftIcon boxSize={7} color="#3D3373" />
            </button>
        );
    }
    
    const settings = {
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        customPaging: function customPaging(i: any) {
         return (<div>
                <img style={{width: "100px"}} src={task.photos[i].url} alt="task-photos" />
            </div>
         )
        },
        appendDots: function appendDots(dots: any) {
         return (
             <div className="task__carousel__dots">
                 <p style={{textAlign: "center"}} className="text__light__dark">Click on images to zoom in</p>
                 <Divider />
                <ul className="task__dots__ul">{dots}</ul>
            </div>
         )
        },
        dotsClass: "task__slick__dots",
        className: "center",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        infinite: false
    }
    
    return (
        <div className="task__image__container">
           <Slider {...settings}>
               {task.photos.map((photo) => (
                   <div className="sc" key={photo.id}>
                       <Zoom>
                           <Image src={photo.url} className="task__img" alt="task-photo" />
                       </Zoom>
                   </div>
               ))}
           </Slider>
            <div style={{textAlign: "center", marginTop: "0.3em"}}>
                <small><PriceTagIcon boxSize={6} color="#3D3373"/> Have a similar task? <span className="text__blue">Post it yourself</span> </small>
            </div>
            
            {task.jobStatus === TaskStatus.Assigned ? <div className="ribbon ribbon-top-left rib-a-tl">
                <span className="rib-a">Assigned</span>
            </div> : task.jobStatus === TaskStatus.Completed ? <div className="ribbon ribbon-top-left rib-c-tl">
                <span className="rib-c">Completed</span>
            </div> : task.jobStatus === TaskStatus.InActive ? <div className="ribbon ribbon-top-left rib-i-tl">
                <span className="rib-i">Ended</span>
            </div> : ""}
        </div>
    )
}

export default observer(TaskImages);