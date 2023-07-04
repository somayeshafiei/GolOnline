'use client';
import Image from 'next/image';
import bascket from '../../../images/bascket.jpg';
import rosejavdan from '../../../images/rosejavdan.jpg';
import box from '../../../images/box.jpg';
import dastegol from '../../../images/dastegol.jpg';
import tajegol from '../../../images/tajegol.jpg';

import Link from 'next/link';
const CategoriesBoxWrapper = () => {
  return (
    <section className="w-full flex flex-col md:flex-row md:justify-between lg:pr-6 gap-5 my-7 min-h-[500px] mt-10">
      <div className="md:w-1/3 flex flex-col gap-8 h-full">
        <div className="w-full h-[200px]">
          <Link href={'/category/6481b34f92e90f317c2c0a33'}>
            <Image src={bascket} alt={'bascket'} width={'400'} height={'200'} />
          </Link>
        </div>
        <div className="w-full h-[200px]">
          <Link href={'/'}>
            <Image
              src={rosejavdan}
              alt={'rosejavdan'}
              width={'400'}
              height={'200'}
            />
          </Link>
        </div>
      </div>
      <div className="md:w-1/3 flex flex-col gap-8 h-full">
        <div className="w-full h-[200px]">
          <Link href={'/category/6481b96192e90f317c2c0ac0'}>
            <Image src={box} alt={'box'} width={'400'} height={'200'} />
          </Link>
        </div>
        <div className="w-full h-[200px]">
          <Link href={'/category/6481b23892e90f317c2c0a25'}>
            <Image
              src={dastegol}
              alt={'dastegol'}
              width={'400'}
              height={'200'}
            />
          </Link>
        </div>
      </div>
      <div className="w-1/3 h-full">
        <Link href={'/category/6481b36392e90f317c2c0a39'}>
          <Image src={tajegol} alt={'tajegol'} width={'380'} height={'300'} />
        </Link>
      </div>
    </section>
  );
};
export default CategoriesBoxWrapper;
