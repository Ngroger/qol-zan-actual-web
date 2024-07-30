import { CiCamera } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoSearchOutline, IoCartOutline  } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../../ux/Card";
import { useTranslation } from "react-i18next";

function Favourite() {
    const [favourite, setFavourite] = useState([]);
    const [userData, setUserData] = useState(null);
    const {t} = useTranslation();

    useEffect(() => {
        const interval = setInterval(fetchUserInfo, 1000);

        return () => {
            clearInterval(interval);
        }
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
        .then(async data => {
            if (data.success) {
                setUserData(data.user);
                await fetchFavourite(data.user.id);
            } else {
                // Обработка ошибки, если не удалось получить информацию о пользователе
            }
        })
        .catch(error => {
            // Обработка ошибки запроса
        });
    }

    const fetchFavourite = async (id) => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-getAllFavourite/${id}`);

            const responseJson = await response.json();

            if (responseJson.success) {
                setFavourite(responseJson.items)
            }
        } catch {
            
        }
    }

    return (
        <div className="mobile:w-11/12 tablet:w-8/12 laptop:w-9/12 desktop:w-8/12 desktop2:w-9/12 mt-4">
            { favourite.length > 0 && (
                <>
                    <p className="text-[#000000] text-3xl font-semibold">{t('favourite')}</p>
                    <div className="grid grid-cols-1 mobile:grid-cols-2 lg:grid-cols-3 desktop:grid-cols-5 gap-4 mt-4">
                        { favourite.map((item, index) => (
                            <Card key={index} product={item}/>
                        )) }
                    </div>
                </>
            ) }
            { favourite.length === 0 && (
                <div className="flex flex-col space-y-2 justify-center items-center h-[60vh]">
                    <p className="mobile:text-lg text-center desktop:text-xl font-bold">{t("favourite-lit-empty-title")}</p>
                    <p className="mobile:text-lg desktop:text-xl tablet:w-8/12 desktop:w-4/12 text-center">{t("favourite-lit-empty-subtitle")}</p>
                    <Link to='/' className="bg-[#44CD8D] p-3 px-6 rounded-xl hover:opacity-50">
                        <p className="text-white mobile:text-lg desktop:text-xl">{t("go-to-main")}</p>
                    </Link>
                </div>
            ) }
        </div>
    )
};

export default Favourite;