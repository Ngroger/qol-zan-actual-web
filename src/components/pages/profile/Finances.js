import { CiCamera } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoSearchOutline, IoCartOutline  } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function Finances() {
    const {t} = useTranslation();
    return (
        <div className="mobile:w-11/12 tablet:w-8/12 laptop:w-9/12 desktop:w-8/12 desktop2:w-5/12 mt-4">
            <p className="text-[#000000] text-3xl font-semibold">{t("profile-page.finances")}</p>
            {/* <div className="flex flex-row space-x-2 mt-2 mb-2">
                <button className="bg-[#EFF3F6] p-1 px-2.5 rounded-xl">
                    <p className="text-[#0D0D0D] text-lg">Все</p>
                </button>
                <button className="p-1">
                    <p className="text-[#0D0D0D]/50 text-lg">Пополнения</p>
                </button>
                <button className="p-1">
                    <p className="text-[#0D0D0D]/50 text-lg">Расходы</p>
                </button>
            </div>
            <div className="flex flex-col w-full space-y-4 mt-4 border-t-[1px] border-t-[#0D0D0D]/20 mb-12">
                <div className="border-b-[1px] border-b-[#0D0D0D]/20 py-5 w-full flex flex-row items-center justify-between">
                    <div className="w-12 h-12 bg-[#EFF3F6] rounded-full flex justify-center items-center">
                        <IoCartOutline className="text-3xl text-[#44CD8D]"/>
                    </div>
                    <p className="text-[#000000] mobile:text-xs laptop:text-xl desktop:text-2xl">19.02.2024 в 17:04</p>
                    <p className="text-[#000000] mobile:text-xs laptop:text-xl desktop:text-2xl">Покупка</p>
                    <p className="text-[#000000] mobile:text-xs laptop:text-xl desktop:text-2xl">1550 тг</p>
                    <button className="hover:opacity-50">
                        <HiOutlineDocumentDownload className="text-[#000000] text-2xl"/>
                    </button>
                </div>
            </div> */}
            <div className="flex flex-col space-y-2 justify-center items-center h-96">
                <p className="mobile:text-lg text-center desktop:text-xl font-bold">{t("finances-history-empty-title")}</p>
                <p className="mobile:text-lg desktop:text-xl tablet:w-8/12 desktop:w-10/12 text-center">{t("finances-history-empty-subtitle")}</p>
            </div>
        </div>
    )
};

export default Finances;