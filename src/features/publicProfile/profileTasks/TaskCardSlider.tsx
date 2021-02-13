import React from "react";
import { IPhoto } from "../../../infrastructure/models/task";
import {observer} from "mobx-react-lite";
import {Box, Image} from "@chakra-ui/react";
import Slider from "react-slick";
import {ChevronLeftIcon, ChevronRightIcon} from "../../../infrastructure/icons/Icons";

interface IProps{
    photos: IPhoto[];
}

const TaskCardSlider : React.FC<IProps> = ({photos}) => {
    function NextArrow(props: any) {
        const { onClick } = props;
        return (
            <button
                className="task__card__carousel__next__arr"
                onClick={onClick}
            >
                <ChevronRightIcon boxSize={5} color="#3D3373" />
            </button>
        );
    }

    function PrevArrow(props: any) {
        const { onClick } = props;
        return (
            <button
                className="task__card__carousel__prev__arr"
                onClick={onClick}
            >
                <ChevronLeftIcon boxSize={5} color="#3D3373" />
            </button>
        );
    }
    const sliderSettings = {
        dots: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        infinite: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }
    return (
        <Box className="task__card__image__container">
            <Slider {...sliderSettings}>
                {photos.map((photo) => (
                    <Box className="sc" key={photo.id}>
                    <Image src={photo.url}  className="task__card__img" alt="task__photo"/>
                    </Box>
                ))}
            </Slider>
        </Box>
    )
}

export default observer(TaskCardSlider);