import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Footer() {
    const {t} = useTranslation();
    return (
        <div className='w-full relative items-center flex justify-center tablet:mb-0'>
            <img className='mobile:h-56 lg:h-64 desktop:h-80 w-full' src={require('../../img/FooterBackground.png')}/>
            <div className='w-full absolute z-10 tablet:px-12 mobile:px-2 laptop:px-24 mobile:mt-20 tablet:mt-32 flex items-center flex-row justify-between'>
                <div className='space-y-2'>
                    <img className='mobile:w-[50px] mobile:h-[20px] tablet:w-[100px] tablet:h-[50px] laptop:w-[100px] laptop:h-[50px] desktop:w-[174.55px] desktop:h-[99px] object-contain' src={require('../../img/logoFooter.png')}/>
                    <p className='text-white mobile:text-[9px] laptop:text-xl desktop:text-2xl text-nowrap'>© Copyright 2024 Agriculture</p>
                </div>
                <div className='flex flex-col mobile:space-y-2 lg:space-y-4 items-center mobile:mb-2 lg:mb-6'>
                    <Link to='/privacy-policy' className='hover:opacity-50'>
                        <p className='mobile:text-[9px] text-nowrap tablet:text-lg lg:text-xl desktop2:text-2xl text-white'>{t("privacy-policy")}</p>
                    </Link>
                    <Link to='/public-offer' className='hover:opacity-50'>
                        <p className='mobile:text-[9px] text-nowrap tablet:text-lg lg:text-xl desktop2:text-2xl text-white'>{t("public-offer")}</p>
                    </Link>
                    <Link to="/payment" className='hover:opacity-50'>
                        <p className='mobile:text-[9px] text-nowrap tablet:text-lg lg:text-xl desktop2:text-2xl text-white'>{t("payment")}</p>
                    </Link>
                    <Link to="/about-us" className='hover:opacity-50'>
                        <p className='mobile:text-[9px] text-nowrap tablet:text-lg lg:text-xl desktop2:text-2xl text-white'>{t("about-us-title")}</p>
                    </Link>
                </div>
                <div className='mobile:space-y-0.5 tablet:space-y-2 items-end justify-end flex flex-col'>
                <p className='text-white mobile:text-[9px] laptop:text-xl desktop:text-2xl text-nowrap'>+8 (708) 627 5934</p>
                    <p className='text-white mobile:text-[9px] laptop:text-xl desktop:text-2xl text-nowrap'>hazard1988@inbox.ru</p>
                </div>
            </div>
        </div>
    )
};

export default Footer;