import { useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import AddProduct from "./AddProduct";
import ChangeStatus from "../../ux/modals/ChangeStatus";
import EditProduct from "./EditProduct";
import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { useTranslation } from "react-i18next";

function Sales({ openModal }) {
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

    const deleteSale = async (id) => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-deleteSale', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({ userId: userData.id, productId: id })
            });

            const responseJson = await response.json();
        } catch {

        }
    }

    return (
        <div className="mobile:w-11/12 tablet:w-9/12 laptop:w-8/12 dekstop:w-5/12 p-2 mt-2">
            <div className="flex flex-row justify-between items-center">
                <button onClick={() => openModal()} className="hover:opacity-50 bg-[#EFF3F6] rounded-xl px-4 p-2">
                    <p className="text-xl">{t("sales.add-sale-button")}</p>
                </button>
            </div>
            { sales.length > 0 ? (
                <>
                    { sales.map((item, index) => (
                        <>
                            { selectedId === item.id ? (
                                <div className="w-full rounded-2xl bg-[#EFF3F6] h-64 mt-6 flex flex-row justify-center items-center mobile:space-x-16 laptop:space-x-24 desktop:space-x-32">
                                    <div className="flex flex-col justify-center items-center">
                                        <button onClick={() => deleteSale(item.id)} className="rounded-full h-20 w-20 flex justify-center items-center bg-[#FFF] group hover:bg-red-500">
                                            <IoClose className="text-4xl text-red-500 group-hover:text-white"/>
                                        </button>
                                        <p className="text-xl font-bold">Удалить</p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <button onClick={() => setSelectedId()} className="rounded-full h-20 w-20 flex justify-center items-center bg-[#FFF] group hover:bg-green-500">
                                            <IoMdCheckmark className="text-4xl text-green-500 group-hover:text-white"/>
                                        </button>
                                        <p className="text-xl font-bold">Оставить</p>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={() => setSelectedId(item.id)} key={index} className="w-full rounded-2xl bg-[#44CD8D] h-64 mt-6 flex flex-col justify-center items-center space-y-1 hover:opacity-50">
                                    <img className="h-20 w-20" src={require("../../../img/sale.png")}/>
                                    <p className="mobile:text-lg laptop:text-xl dekstop:text-2xl text-white italic font-bold">{item.percent}%</p>
                                    <p className="mobile:text-lg laptop:text-xl dekstop:text-2xl text-white font-bold">{item.category}</p>
                                </button>
                            ) }
                        </>
                    )) }
                </>
            ) : (
                <div className="w-full justify-center items-center flex flex-col h-96">
                    <p className="text-2xl font-bold">{t("sales.empty-list-title")}</p>
                    <p className="text-xl">{t("sales.empty-list-subtitle")}</p>
                </div>
            ) }
        </div>
    )
};

export default Sales;