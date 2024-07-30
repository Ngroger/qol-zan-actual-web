import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";

function AddSale({ onClose }) {
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [category, setCategory] = useState();
    const [percent, onChangePercent] = useState();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        
        // Отправляем запрос на сервер для получения информации о пользователе
        fetch(`https://nomadfarm-24.store/api-getUserInfo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}` // Устанавливаем токен в заголовке Authorization
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setUserData(data.user);
            } else {
                // Обработка ошибки, если не удалось получить информацию о пользователе
            }
        })
        .catch(error => {
            // Обработка ошибки запроса
        });
    }

    const changeCategory = (category) => {
        setCategory(category);
        setIsOpenCategory(false)
    };

    const addSale = async () => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-addSale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ percent: percent, category: category, customerId: userData.id })
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                onClose();
            }
        } catch {

        }
    }


    return (
        <div className='fixed w-screen top-0 z-[1000] h-screen justify-center items-center flex'>
            <button className="bg-black/20 w-full h-full absolute z-10" onClick={onClose} />
            <div className='bg-white p-10 rounded-[40px] absolute z-50'>
                <p className="text-2xl font-bold">Добавление акции</p>
                <div className="flex flex-col space-y-2 mt-4">
                    <p className="text-black/80 text-xl font-bold">Скидка</p>
                    <div className="w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl">
                        <input value={percent} onChange={(e) => onChangePercent(e.target.value)} className="text-xl outline-none bg-transparent w-full" placeholder="Впишите желаемую скидку"/>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col space-y-2">
                        <p className="text-black/80 text-xl font-bold">Категория</p>
                        <div className="w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl flex flex-row justify-between items-center">
                            <p className="text-xl text-black/25">{ category ? category : 'Выберите категорию' }</p>
                            <button onClick={() => setIsOpenCategory(!isOpenCategory)} className="hover:opacity-50">
                                { isOpenCategory ? (
                                    <IoIosArrowUp className="text-2xl text-black/25"/>
                                ) : (
                                    <IoIosArrowDown className="text-2xl text-black/25"/>
                                ) }
                            </button>
                        </div>
                    </div>
                    { isOpenCategory && (
                        <div className="w-96 bg-white p-2 border-2 border-[#EFF3F6] rounded-xl absolute z-10 flex-col flex items-start mt-4 h-48 overflow-y-auto">
                            <button onClick={() => changeCategory('Овощи и Фрукты')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Овощи и Фрукты</p>
                            </button>
                            <button onClick={() => changeCategory('Молочные Продукты и Яйца')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Молочные Продукты и Яйца</p>
                            </button>
                            <button onClick={() => changeCategory('Мясо & Птица & Рыба')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Мясо & Птица & Рыба</p>
                            </button>
                            <button onClick={() => changeCategory('Зерновые и мучные изделия')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Зерновые и мучные изделия</p>
                            </button>
                            <button onClick={() => changeCategory('Продукты для заботы о себе')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Продукты для заботы о себе</p>
                            </button>
                            <button onClick={() => changeCategory('Соусы и консервация')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Соусы и консервация</p>
                            </button>
                            <button onClick={() => changeCategory('Здоровое питание & Детское питание')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl text-left">Здоровое питание & Детское питание</p>
                            </button>
                            <button onClick={() => changeCategory('Колбасные изделия')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Колбасные изделия</p>
                            </button>
                        </div>
                    ) }
                </div>
                <button onClick={() => addSale()} className="hover:opacity-50 p-4 justify-center items-center w-full rounded-xl bg-[#44CD8D] mt-6">
                    <p className="text-xl text-white">Добавить</p>
                </button>
            </div>
        </div>
    )
};

export default AddSale;