function ReviewWarningModal({ onClose }) {
    return (
        <div className="w-screen h-screen justify-center items-center fixed z-[10000] left-0 top-0 bottom-0 right-0 flex">
            <button onClick={onClose} className="w-full h-full absolute z-[100000] bg-black/50"/>
            <div className="bg-white rounded-[40px] flex flex-col space-y-4 justify-center items-center w-96 p-8 absolute z-[1000000] ">
                <p className="text-black font-bold text-2xl">Примечание</p>
                <p className="text-black font-light text-xl text-center">Вы можете оставить свой отзыв о продукте после его получения</p>
                <button onClick={onClose} className="w-full p-3 justify-center items-center flex rounded-xl bg-[#44CD8D] hover:opacity-50">
                    <p className="text-xl text-white">Понятно</p>
                </button>
            </div>
        </div>
    )
};

export default ReviewWarningModal;