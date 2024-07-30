import { IoStar } from "react-icons/io5";

function Comment({ data }) {
    // Создаем массив, который будет содержать JSX элементы для звезд
    const starsArray = [];
    // Заполняем массив JSX элементами в зависимости от количества звезд
    for (let i = 0; i < 5; i++) {
        if (i < data.stars) {
            // Если индекс меньше количества звезд, то рендерим желтую звезду
            starsArray.push(<IoStar key={i} className="text-3xl text-[#FCD535]" />);
        } else {
            // В противном случае рендерим серую звезду
            starsArray.push(<IoStar key={i} className="text-3xl text-[#0D0D0D]/20" />);
        }
    }

    return (
        <div className="p-6 rounded-2xl w-[500px] bg-[#EFF3F6]/40">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row space-x-2">
                    <img src={`https://nomadfarm-24.store/api-userImage/${data.photoReviewer}`} className="h-14 w-14 rounded-full"/>
                    <div className="flex flex-col space-y-0.2">
                        <p className="text-xl text-[#0D0D0D]">{data.nameReviewer}</p>
                        <p className="text-lg text-[#000000]/40">{data.date}</p>
                    </div>
                </div>
                <div className="flex flex-row space-x-2">
                        {starsArray}
                </div>
            </div>
            <p className="mt-4 w-[450px] text-lg text-[#0D0D0D]">{data.description}</p>
        </div>
    )
};

export default Comment;