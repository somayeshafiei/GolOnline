import FormMaker from '@/components/pages/login/Form';
import Image from 'next/image';
import login from '../../../images/login.png';
export default function LoginPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex">
        <div className="w-[50%]">
          <Image
            src={login}
            alt={'login'}
            width={470}
            height={400}
            className="rounded-r-lg"
          ></Image>
        </div>
        <FormMaker />
      </div>
    </div>
  );
}
