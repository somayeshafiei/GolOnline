'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Banner1 from '../../../images/H_Desk_Flow_Ir_jpg.webp';
import Banner2 from '../../../images/Banner22.webp';
import Banner3 from '../../../images/Banner33.webp';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
// import required modules
import { Pagination } from 'swiper';
import Image from 'next/image';

export default function HomePageSlider() {
  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        direction="horizontal"
        modules={[Pagination]}
        className="mySwiper"
        // activeColor= 'green'
      >
        <SwiperSlide>
          <Image src={Banner1} alt="Banner1" fill className="rounded-md" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Banner2} alt="Banner2" fill className="rounded-md" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Banner3} alt="Banner3" fill className="rounded-md" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
