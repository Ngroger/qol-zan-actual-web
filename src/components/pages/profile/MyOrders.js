import { CiCamera } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoSearchOutline, IoCartOutline  } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function MyOrders() {
    const {t} = useTranslation();
    return (
        <div className="mobile:w-11/12 tablet:w-8/12 laptop:w-9/12 desktop:w-8/12 desktop2:w-5/12 mt-4">
            <p className="text-[#000000] text-3xl font-semibold">{t("profile-page.my-orders")}</p>
            {/* <div className="flex flex-col w-full space-y-4 mt-4 border-t-[1px] border-t-[#0D0D0D]/20 mb-12">
                <div className="border-b-[1px] border-b-[#0D0D0D]/20 py-5 w-full flex flex-col space-y-2">
                    <p className="text-[#0D0D0D]/70 text-2xl font-semibold">Дата доставки: 3 декабря 2023</p>
                    <div className="flex flex-row space-x-4 justify-between">
                        <img className="bg-[#bdbdbd] h-[260px] w-60 rounded-[26px]"/>
                        <div className="space-y-1">
                            <p className="text-[#0D0D0D]/80 text-lg laptop:hidden mobile:block">оплачено <span className="mobile:text-xl laptop:text-2xl text-[#0D0D0D]">3 740 тг</span></p>
                            <p className="text-[#0D0D0D]/70 mobile:text-lg laptop:text-xl">Название: <span className="text-[#0D0D0D]">Грибы Еноки 200г</span></p>
                            <p className="text-[#0D0D0D]/70 mobile:text-lg laptop:text-xl">Количество: <span className="text-[#0D0D0D]">15 шт.</span></p>
                            <p className="text-[#0D0D0D]/70 mobile:text-lg laptop:text-xl mobile:w-48 tablet:w-64 laptop:w-80">Описание: <span className="text-[#0D0D0D]">Lorem ipsum dolor sit amet consectetur. Tincidunt nunc laore</span></p>
                            <div className="space-y-1">
                                <p className="text-[#3887FE] mobile:mt-0 laptop:mt-8 mobile:text-lg laptop:text-xl">0146033954-0002</p>
                                <div className="bg-[#44CD8D] py-2 rounded-xl w-24 flex justify-center items-center">
                                    <p className="text-white text-md">Получено</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-[#0D0D0D]/80 text-lg laptop:block mobile:hidden">оплачено <span className="mobile:text-xl laptop:text-2xl text-[#0D0D0D]">3 740 тг</span></p>
                    </div>
                </div>
            </div> */}
            <div className="w-full justify-center items-center flex flex-col h-[60vh]">
                <p className="text-center mobile:text-xl tablet:text-2xl font-bold">{t("my-orders-empty-title")}</p>
                <p className="text-center mobile:text-lg tablet:text-xl">{t("my-orders-empty-subtitle")}</p>
            </div>
        </div>
    )
};

export default MyOrders;