// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import Image from 'next/image';
interface props {
  // setThumbsSwiper: React.Dispatch<React.SetStateAction<null>>;
  images: string[];
}
const ThumbnailSlider = ({ setThumbsSwiper,images }: props) => {
  return (
    <div className="w-full h-full">
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-full"
      >
        {images?.map((item) => (
          <SwiperSlide key={item}>
            <div className="bg-white cursor-pointer p-[.35rem] rounded-md">
              <Image
                className="rounded-md"
                src={`http://localhost:8000/images/products/images/${item}`}
                alt={`${item}`}
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThumbnailSlider;
