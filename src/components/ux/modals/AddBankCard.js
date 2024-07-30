import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import ReactInputMask from 'react-input-mask';
import { useTranslation } from "react-i18next";

function AddBankCard({ onClose }) {
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [category, setCategory] = useState();
    const [percent, onChangePercent] = useState();
    const [userData, setUserData] = useState({});
    const [data, setData] = useState({
        number: "",
        dataExpiration: "",
        cvv: ""        
    });
    const {t} = useTranslation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };   

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

    const addBank = async () => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-addBankCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ number: data.number, cvv: data.cvv, dateExpiration: data.dataExpiration, userId: userData.id })
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
            <div className='bg-white mobile:p-6 tablet:p-8 laptop:p-10 rounded-[40px] mobile:w-10/12 tablet:w-6/12 laptop:w-5/12 desktop:w-4/12 desktop2:w-3/12 absolute z-50'>
                <p className="text-2xl font-bold">{t("add-card-modal.title")}</p>
                <div className="w-full rounded-xl p-2 px-4 border-[1px] border-[#0D0D0D]/15 mt-4 relative">
                    <p className="text-[#0D0D0D]/15 bg-white absolute z-10 px-1 -mt-6">{t("add-card-modal.card-number")}</p>
                    <ReactInputMask value={data.number} name='number' onChange={handleChange} mask="9999 9999 9999 9999" maskChar=" "  className="w-full outline-none bg-transparent text-xl" placeholder="Введите номер карты"/>
                </div>
                <div className="flex flex-row space-x-6 w-full items-center">
                    <div className="w-44 rounded-xl p-2 px-4 border-[1px] border-[#0D0D0D]/15 mt-4 relative">
                        <p className="text-[#0D0D0D]/15 bg-white absolute z-10 -mt-6 px-1">{t("add-card-modal.data")}</p>
                        <ReactInputMask value={data.dataExpiration} name='dataExpiration' onChange={handleChange} mask="99/99" maskChar=" " className="w-full outline-none bg-transparent text-xl" placeholder="ММ/ГГ"/>
                    </div>
                    <div className="w-44 rounded-xl p-2 px-4 border-[1px] border-[#0D0D0D]/15 mt-4 relative">
                        <p className="text-[#0D0D0D]/15 bg-white absolute z-10 -mt-6 px-1">CVV</p>
                        <ReactInputMask value={data.cvv} name='cvv' onChange={handleChange} type="password" className="w-full outline-none bg-transparent text-xl" maxLength={3}/>
                    </div>
                </div>
                <button onClick={() => addBank()} className="hover:opacity-50 p-3 justify-center items-center w-full rounded-xl bg-[#44CD8D] mt-6">
                    <p className="text-xl text-white">{t("add-button-title")}</p>
                </button>
            </div>
        </div>
    )
};

export default AddBankCard;