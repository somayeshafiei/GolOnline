import React from 'react';
import Image from 'next/image';
import Enamad from '../../images/enamad.png';
import whatsapp from '../../images/whatsapp.png';
import instagram from '../../images/instagram.png';
import telegram from '../../images/telegram.png';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-200  ">
      <div className="w-full h-20 bg-[#AF6EA0] text-white px-5 sm:px-10 md:px-[120px]">
        <div className="w-full flex items-center justify-between h-full">
          <p>ما را در شبکه های اجتماعی دنبال کنید</p>
          <div className="flex gap-2">
            <Image
              src={whatsapp}
              alt={'whatsapp'}
              width={'30'}
              height={'30'}
            ></Image>
            <Image
              src={instagram}
              alt={'instagram'}
              width={'30'}
              height={'30'}
            ></Image>
            <Image
              src={telegram}
              alt={'telegram'}
              width={'30'}
              height={'30'}
            ></Image>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-8 py-10 text-center px-5 sm:px-10 md:px-[120px]">
        <div className="flex flex-col gap-2 w-1/4 items-start">
          <h3 className="font-semibold text-lg text-[#965e89] pr-3">
            چرا گل آنلاین؟
          </h3>
          <p>
            فروشگاه گل آنلاین با هدف ارائه خدمات به ایرانیان داخل و خارج از کشور
            فعالیت خود را از قبیل ارسال انواع گل های زیبا و شیک به صورت سبد گل،
            گلدان گل، باکس گل رز، دسته گل و تاج گل آغاز کرده است
          </p>
        </div>
        {/*  */}
        <div className="flex flex-col gap-2 w-1/4 items-start">
          <h3 className="font-semibold text-lg text-[#965e89]">
            دسته بندی محصولات
          </h3>
          <Link href={'/category/6481b23892e90f317c2c0a25'}>
            <p className="pr-1">دسته گل</p>
          </Link>
          <Link href={'/category/6481b96192e90f317c2c0ac0'}>
            <p className="pr-1">باکس گل</p>
          </Link>
          <Link href={'/category/6481b34f92e90f317c2c0a33'}>
            <p className="pr-1">سبد گل</p>
          </Link>
          <Link href={'/category/6481b36392e90f317c2c0a39'}>
            <p className="pr-1">تاج گل</p>
          </Link>
          <Link href={'/category/6481b25692e90f317c2c0a2b'}>
            <p className="pr-1">گیاهان آپارتمانی </p>
          </Link>
        </div>
        <div className="flex flex-col gap-2 w-1/4 items-start">
          <h3 className="font-semibold text-lg text-[#965e89]">لینک های مهم</h3>
          <Link href={'/cart'}>
            <p className="pr-1">سبد خرید </p>
          </Link>
          <Link href={'/checkout'}>
            <p className="pr-1">ثبت نهایی سفارش </p>
          </Link>
          <Link href={'/login'}>
            <p className="pr-1">ورود به سایت </p>
          </Link>
          <Link href={'/'}>
            <p className="pr-1">مجله گل آنلاین </p>
          </Link>
        </div>
        <div className="flex flex-col gap-2 w-1/4 items-start">
          <h3 className="font-semibold text-lg text-[#965e89]">
            راه های ارتباطی
          </h3>
          <p className="pr-1"> تلفن:02166666666</p>
          <p className="pr-1">آدرس:ایران،تهران</p>
          <Image src={Enamad} alt={'Enamad'} width={'100'} height={'100'} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
