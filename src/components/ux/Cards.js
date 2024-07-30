import Card from "./Card"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useCallback } from "react";

// Import Swiper styles
import "swiper/css";

function Cards({ title, data }) {
    const sliderRefs = {
        desktop2: useRef(null),
        desktop: useRef(null),
        laptop: useRef(null),
        tablet: useRef(null),
        mobile: useRef(null),
    };

    const handlePrev = useCallback((sliderRef) => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback((sliderRef) => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <div className="w-full flex flex-col justify-center items-center mobile:mt-0 tablet:mt-4">
            <div className="w-full flex flex-row items-center justify-between">
                <p className="text-2xl text-[#0D0D0D] font-semibold">{title}</p>
            </div>
            <div className="w-screen justify-center flex flex-wrap">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
                    {data.map((product, index) => (
                        <div key={index}>
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Cards