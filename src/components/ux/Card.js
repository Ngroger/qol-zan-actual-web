import { IoStar } from "react-icons/io5";
import { LuHeart  } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function Card({ product }) {
    const [previewPhoto, setPreviewPhoto] = useState();
    const [userData, setUserData] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        setPreviewPhoto(product ? product.photoPreview1 : null);
        fetchUserInfo();
    }, [userData]);

    useEffect(() => {
        const interval = setInterval(fetchIsFavourite, 1000);

        return () => {
            clearInterval(interval);
        }
    });

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
            }
        })
    }

    const fetchIsFavourite = async () => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-isFavourite/${product.id}/${userData.id}`);

            const responseJson = await response.json();

            if (response.ok) {
                setIsFavourite(responseJson.isFavourite);
            }
        } catch {

        }
    };

    if (!product) {
        return null;
    };

    const addCartItem = async () => {
        const data = {
            productId: product.id,
            title: product.title,
            description: product.description,
            cost: product.newCost,
            oldCost: product.oldCost,
            count: '1', // Предполагаем, что добавляем один товар
            photoPreview: product.photoPreview1, // Предполагаем, что используем первый вариант фото
            userId: userData.id // Подставьте соответствующий идентификатор пользователя
        };

        console.log(data);

        try {
            const response = await fetch('https://nomadfarm-24.store/api-addCartItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseJson = await response.json();
            if (responseJson.success) {
                if (responseJson.exist) {
                    alert(`${t("messages.please-auth")}`);
                }
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handleFavourite = async () => {
        if (isFavourite) {
            const response = await fetch('https://nomadfarm-24.store/api-deleteFavourite', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderId: product.id, userId: userData.id })
            });

            const responseJson = await response.json();
        } else {
            const response = await fetch('https://nomadfarm-24.store/api-addFavourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderId: product.id, userId: userData.id })
            });

            const responseJson = await response.json();
        }
    }

    return (
        <div className="space-y-1.5 mobile:w-[150px] tablet:w-[245px]">
            <div className="  w-full mobile:h-[200px] tablet:h-[300px] relative">
                <Link to={`/product/${product.id}`} className="hover:opacity-50">
                    <img loading="eager" src={`http://nomadfarm-24.store/api-productImage/${previewPhoto}`} className="object-cover w-full h-full bg-[#bdbdbd] rounded-[26px] absolute z-10"/>
                </Link>
                <button onClick={() => handleFavourite()} className="bg-[#EFF3F6]/80 w-6 h-6 rounded-full flex justify-center items-center absolute z-[10] right-3 top-3 hover:opacity-20">
                    { isFavourite ? (
                        <FaHeart className="text-[#44CD8D] text-sm"/>
                    ) : (
                        <LuHeart className="text-[#464646]/80 text-sm"/>
                    ) }
                </button>
            </div>
            <div className="w-full justify-center items-center flex flex-row space-x-2">
                <button onClick={() => setPreviewPhoto(product.photoPreview1)} className={ previewPhoto === product.photoPreview1 ? "w-2.5 h-2.5 rounded-full bg-[#44CD8D]" : "w-2.5 h-2.5 rounded-full bg-[#44CD8D]/20 hover:opacity-50" }/>
                <button onClick={() => setPreviewPhoto(product.photoPreview2)} className={ previewPhoto === product.photoPreview2 ? "w-2.5 h-2.5 rounded-full bg-[#44CD8D]" : "w-2.5 h-2.5 rounded-full bg-[#44CD8D]/20 hover:opacity-50" }/>
                <button onClick={() => setPreviewPhoto(product.photoPreview3)} className={ previewPhoto === product.photoPreview3 ? "w-2.5 h-2.5 rounded-full bg-[#44CD8D]" : "w-2.5 h-2.5 rounded-full bg-[#44CD8D]/20 hover:opacity-50" }/>
                <button onClick={() => setPreviewPhoto(product.photoPreview4)} className={ previewPhoto === product.photoPreview4 ? "w-2.5 h-2.5 rounded-full bg-[#44CD8D]" : "w-2.5 h-2.5 rounded-full bg-[#44CD8D]/20 hover:opacity-50" }/>
                <button onClick={() => setPreviewPhoto(product.photoPreview5)} className={ previewPhoto === product.photoPreview5 ? "w-2.5 h-2.5 rounded-full bg-[#44CD8D]" : "w-2.5 h-2.5 rounded-full bg-[#44CD8D]/20 hover:opacity-50" }/>
            </div>
            <div className="flex flex-row space-x-2 items-center">
                <p className="text-[#0D0D0D] mobile:text-xl tablet:text-2xl font-semibold">{product.newCost} тг</p>
                { product.oldCost && <p className="text-[#0D0D0D]/50 mobile:text-md tablet:text-xl font-semibold line-through">{product.oldCost} тг</p> }
            </div>
            <p className="text-[#0D0D0D] mobile:text-lg tablet:text-xl tablet:w-64 mobile:w-40">{product.title}</p>
            <div className="flex flex-row items-center space-x-3">
                <div className="flex flex-row items-center space-x-1.5">
                    <IoStar className="text-xl text-[#FCD535]"/>
                    <p className="text-xl">{product.averageRate}</p>
                </div>
                <div className="tablet:flex mobile:hidden flex-row items-center space-x-1.5">
                    <p className="mobile:text-lg tablet:text-xl text-[#000000]/40">{product.views} {t("cart-page.viewers")}</p>
                </div>
            </div>
            <button onClick={ userData ? () => addCartItem() : () => alert(`${t("messages.please-auth")}`) } className="bg-[#44CD8D] py-2 px-4 flex justify-center items-center rounded-xl hover:opacity-50">
                <p className="text-white mobile:text-lg tablet:text-xl">{t("cart-page.cart-button")}</p>
            </button>
        </div>
    )
};

export default Card