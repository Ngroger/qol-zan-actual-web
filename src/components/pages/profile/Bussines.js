import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MyProducts from "../bussines/MyProducts";
import Sales from "../bussines/Sales";
import AddSale from "../../ux/modals/AddSale";
import Orders from "../bussines/Orders";
import Stat from "../bussines/Stat";
import { useTranslation } from "react-i18next";

function Bussines() {
    const [category, setCategory] = useState('products');
    const [userData, setUserData] = useState({});
    const [isAddSale, setIsAddSale] = useState(false);
    const {t} = useTranslation();
    
    useEffect(() => {
        fetchUserInfo();
    }, [])

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

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-row flex-wrap items-center justify-center">
                <button onClick={() => setCategory('products')} className={ category === 'products' ? "hover:opacity-50 m-2" : "opacity-20 hover:opacity-100 m-2" }>
                    <p className="mobile:text-xs laptop:text-lg desktop:text-xl desktop2:text-2xl font-bold">{t("profile-page.categories.bussines.my-products")}</p>
                </button>
                <button onClick={() => setCategory('sales')} className={ category === 'sales' ? "hover:opacity-50 m-2" : "opacity-20 hover:opacity-100 m-2" }>
                    <p className="mobile:text-xs laptop:text-lg desktop:text-xl desktop2:text-2xl font-bold">{t("profile-page.categories.bussines.sales")}</p>
                </button>
                <button onClick={() => setCategory('orders')} className={ category === 'orders' ? "hover:opacity-50 m-2" : "opacity-20 hover:opacity-100 m-2" }>
                    <p className="mobile:text-xs laptop:text-lg desktop:text-xl desktop2:text-2xl font-bold">{t("profile-page.categories.bussines.orders-delivery")}</p>
                </button>
            </div>
            { category === 'products' && <MyProducts/> }
            { category === 'sales' && <Sales openModal={() => setIsAddSale(true)}/> }
            { category === 'orders' && <Orders onClose={() => setIsAddSale(false)}/> }
            { isAddSale && <AddSale onClose={() => setIsAddSale(false)}/> }
        </div>
    )
};

export default Bussines;