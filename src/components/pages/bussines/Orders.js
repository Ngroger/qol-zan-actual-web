import { useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import AddProduct from "./AddProduct";
import ChangeStatus from "../../ux/modals/ChangeStatus";
import EditProduct from "./EditProduct";
import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { useTranslation } from "react-i18next";

function Orders({ openModal }) {
    const [userData, setUserData] = useState({});
    const [sales, setSales] = useState([]);
    const [selectedId, setSelectedId] = useState();
    const {t} = useTranslation(); 

    useEffect(() => {
        const interval = setInterval(fetchUserInfo, 1000);

        return () => {
            clearInterval(interval);
        }
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
                fetchProduct(data.user.id);
            } else {
                // Обработка ошибки, если не удалось получить информацию о пользователе
            }
        })
        .catch(error => {
            // Обработка ошибки запроса
        });
    }

    const fetchProduct = async (id) => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-getAllSales/${id}`);

            const responseJson = await response.json();

            if (responseJson.success) {
                setSales(responseJson.sales)
            }
        } catch {

        }
    }

    return (
        <div className="w-6/12 mt-2 flex-row flex flex-wrap justify-center">
            {/* <div className="border-2 border-[#EFF3F6] p-4 m-4 rounded-xl w-96">
                <div className="flex flex-row space-x-2">
                    <div className="flex flex-row justify-between space-x-2 w-full">
                        <img className="bg-[#BDBDBD] h-12 w-12 rounded-full"/>
                        <div className="flex flex-col space-y-1 flex-1">
                            <p className="text-xl text-black/50">Имя: <span className="text-black/100">Иван Иванов</span></p>
                            <p className="text-xl text-black/50">Название: <span className="text-black/100">Lorem Ipsum</span></p>
                            <p className="text-xl text-black/50">Адрес: <span className="text-black/100">Lorem Ipsum</span></p>
                        </div>
                    </div>
                    <p>14:00</p>
                </div>
                <div className="flex flex-row mt-4 space-x-6">
                    <button className="bg-[#EFF3F6] p-2 px-4 rounded-xl w-full hover:opacity-50">
                        <p className="text-xl font-medium">Отменить</p>
                    </button>
                    <button className="bg-[#44CD8D] p-2 px-4 rounded-xl w-full hover:opacity-50">
                        <p className="text-xl text-white font-medium">Доставить</p>
                    </button>
                </div>
            </div> */}
            <div className="w-full justify-center items-center flex flex-col h-96">
                <p className="text-2xl font-bold">{t("delivery.empty-list-title")}</p>
                <p className="text-xl">{t("delivery.empty-list-subtitle")}</p>
            </div>
        </div>
    )
};

export default Orders;