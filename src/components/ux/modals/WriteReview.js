import { HiOutlinePlus } from "react-icons/hi";
import { MdOutlineStarPurple500 } from "react-icons/md";

function WriteReview({ onClose, title }) {
    return (
        <div className="w-screen h-screen justify-center items-center fixed z-[10000] left-0 top-0 bottom-0 right-0 flex">
            <button onClick={onClose} className="w-full h-full absolute z-[100000] bg-black/50"/>
            <div className="bg-white rounded-[40px] flex flex-col space-y-4  w-96 p-8 absolute z-[1000000] ">
                <p className="text-black font-bold text-xl">Оставить отзыв к котовару “{title}”</p>
                <div className="space-y-1">
                    <p className="text-[#0D0D0D]">Расскажите о товаре</p>
                    <div className="border-2 border-[#0D0D0D]/20 p-2 rounded-xl">
                        <textarea className="w-full outline-none h-24"/>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[#0D0D0D]">Добавить фото <span className="text-[#0D0D0D]/50">(не обязательно)</span></p>
                    <div className="flex flex-row space-x-2 over">
                        <button className="w-20 h-20 bg-[#44CD8D] rounded-2xl justify-center items-center flex hover:opacity-50">
                            <HiOutlinePlus className="text-white text-4xl"/>
                        </button>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[#0D0D0D]">Оцените товар</p>
                    <div className="flex flex-row space-x-1 items-center">
                        <MdOutlineStarPurple500 className="text-2xl text-[#0D0D0D]/20 hover:opacity-50"/>
                        <MdOutlineStarPurple500 className="text-2xl text-[#0D0D0D]/20 hover:opacity-50"/>
                        <MdOutlineStarPurple500 className="text-2xl text-[#0D0D0D]/20 hover:opacity-50"/>
                        <MdOutlineStarPurple500 className="text-2xl text-[#0D0D0D]/20 hover:opacity-50"/>
                        <MdOutlineStarPurple500 className="text-2xl text-[#0D0D0D]/20 hover:opacity-50"/>
                    </div>
                </div>
                <button onClick={onClose} className="w-full p-3 justify-center items-center flex rounded-xl bg-[#44CD8D] hover:opacity-50">
                    <p className="text-xl text-white">Отправить</p>
                </button>
            </div>
        </div>
    )
};

export default WriteReview;