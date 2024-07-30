import { FaRegTrashCan } from "react-icons/fa6";
import { LuHeart } from "react-icons/lu";
import { useState, useEffect } from 'react';
import { IoCheckmarkSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CartPage() {
    const [userData, setUserData] = useState(null);
    const [cart, setCart] = useState([]);
    const [totalCart, setTotalCart] = useState();
    const [totalCartCost, setTotalCartCost] = useState();
    const [message, setMessage] = useState();
    const [selectedItems, setSelectedItems] = useState([]);
    const [isSelectedAll, setIsSelectedAll] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        const interval = setInterval(fetchUserInfo, 1000);

        return clear => {
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
        .then(data => {
            if (data.success) {
                setUserData(data.user);
                try {
                    getCartItems(data.user.id);
                } catch {

                }
            } else {
                // Обработка ошибки, если не удалось получить информацию о пользователе
            }
        })
        .catch(error => {
            // Обработка ошибки запроса
        });
    }

    const getCartItems = async (id) => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-getCartItems/${id}`);

            const responseJson = await response.json();

            if (responseJson.success) {
                setMessage();
                setTotalCart(responseJson.total);
                setCart(responseJson.items);

                // Подсчет общей стоимости корзины
                let total = 0;
                responseJson.items.forEach(item => {
                    total += parseInt(item.cost) * parseInt(item.count);
                });
                setTotalCartCost(total);

            } else {
                setMessage(responseJson.message);
            }
        } catch {

        }
    }

    const deleteFromCart = async (productId) => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-removeCartItem`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userData?.id, productId: productId })
            });
    
            const responseData = await response.json();
    
            if (responseData.success) {
                window.location.reload();
            } else {

            }
        } catch (error) {

        }
    };

    const plusCount = async (productId) => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-plusCount/${userData?.id}/${productId}`, {
                method: 'PUT'
            }) 

            const responseJson = await response.json();
        } catch {

        }
    }

    const minusCount = async (productId) => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-minusCount/${userData?.id}/${productId}`, {
                method: 'PUT'
            }) 

            const responseJson = await response.json();
        } catch {

        }
    }

    const toggleSelectedItem = (itemId) => {
        setSelectedItems(prevItems => {
            // Проверяем, есть ли элемент с данным id в массиве
            const index = prevItems.indexOf(itemId);
            
            if (index === -1) {
                // Если элемент не найден, добавляем его в массив
                return [...prevItems, itemId];
            } else {
                // Если элемент найден, удаляем его из массива
                return prevItems.filter(item => item !== itemId);
            }
        });
    };

    const selectAllItems = () => {
        if(isSelectedAll) {
            setSelectedItems([]);
            setIsSelectedAll(false);
        } else {
            const allItemIds = cart.map(item => item.productId);
            setSelectedItems(allItemIds);
            setIsSelectedAll(true);
        }
    };

    const deleteAllSelected = async () => {
        // Перебираем массив выбранных товаров
        for (const productId of selectedItems) {
            try {
                // Вызываем метод deleteFromCart для удаления каждого товара
                await deleteFromCart(productId);
            } catch (error) {
                console.error(`Ошибка удаления товара с id ${productId}:`, error);
            }
        }
    };
    
    return (
        <div className="mt-28 w-full justify-center items-center flex flex-col">
            { cart.length > 0 && (
                <div className="mobile:w-11/12 laptop:w-10/12 justify-between flex mobile:flex-col desktop:flex-col desktop2:flex-row p-3">
                    <div className="w-full mobile:pr-0 desktop:pr-6">
                        <div className="flex flex-row justify-between items-center w-full">
                            <p className="mobile:text-lg tablet:text-xl desktop:text-2xl dektop2:text-3xl text-black font-bold">{t("cart")} <span className="text-[#44CD8D] font-semibold">{totalCart}</span></p>
                            <div className="flex flex-row space-x-4 items-center">
                                <div className="flex flex-row space-x-2 items-center">
                                    <button onClick={() => selectAllItems()} className={ isSelectedAll ? "w-5 h-5 bg-[#44CD8D] rounded-md hover:opacity-50 flex justify-center items-center" : "w-5 h-5 border-[#0D0D0D]/20 border-2 rounded-md hover:opacity-50" }>
                                        { isSelectedAll && <IoCheckmarkSharp className="text-white text-xs"/> }
                                    </button>
                                    <p className="text-lg text-[#0D0D0D]">{t("cart-page.select-all-button")}</p>
                                </div>
                                <button disabled={selectedItems.length === 0} onClick={() => deleteAllSelected()}>
                                    <FaRegTrashCan className={ selectedItems.length > 0 ? "text-xl text-red-500 hover:opacity-50" : "text-xl text-[#0D0D0D]/20" }/>
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto mobile:h-[40vh] tablet:h-[50vh] mobile:pr-0 laptop:pr-6">
                            { cart.map((item, index) => (
                                <div key={index} className="flex flex-row mt-4 space-x-4">
                                    <img src={`http://nomadfarm-24.store/api-productImage/${item.photoPreview}`} className="bg-[#BDBDBD] mobile:h-[120px] tablet:h-[200px] desktop:h-[260px] object-cover mobile:w-[100px] tablet:w-[245px] laptop:w-[245px] rounded-2xl"/>
                                    <div className="w-full">
                                        <div className="flex flex-row w-full justify-between">
                                            <div>
                                                <p className="text-wrap mobile:text-md tablet:text-xl laptop:text-2xl text-[#0D0D0D]">{item.title}</p>
                                                <p className="mobile:text-xs tablet:text-md mobile:w-full tablet:w-11/12 laptop:text-lg text-[#0D0D0D]">{item.description}</p>
                                            </div>
                                            <div className="flex flex-row space-x-4">
                                                <div className="flex flex-col items-end">
                                                    <p className="text-nowrap text-[#0D0D0D] mobile:text-xl tablet:text-2xl font-bold">{item.cost} тг. </p>
                                                    <p className="text-nowrap mobile:text-md tablet:text-lg text-[#0D0D0D]/50 line-through">{item.oldCost} тг. </p>
                                                </div>
                                                <button onClick={() => toggleSelectedItem(item.productId)} className={ selectedItems.includes(item.productId) ?"mobile:w-4 mobile:h-4 tablet:w-6 laptop:w-8 tablet:h-6 laptop:h-8 bg-[#44CD8D] mobile:rounded-[4px] laptop:rounded-lg hover:opacity-50 justify-center items-center flex" : "mobile:w-4 mobile:h-4 tablet:w-6 laptop:w-8 tablet:h-6 laptop:h-8 bg-[#EFF3F6] mobile:rounded-[4px] laptop:rounded-lg hover:opacity-50" }>
                                                    { selectedItems.includes(item.productId) && (
                                                        <IoCheckmarkSharp className="text-white text-xl"/>
                                                    ) }
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-center flex-row justify-between mt-4">
                                            <div className="mobile:p-1 mobile:px-4 tablet:p-1 tablet:px-4 laptop:p-2 laptop:px-6 flex flex-row bg-[#EFF3F6] rounded-xl items-center mobile:space-x-2 tablet:space-x-2 laptop:space-x-4">
                                                <button disabled={item.count === "1"} onClick={() => minusCount(item.productId)} className={ item.count === "1" ? "opacity-25" : "hover:opacity-50" }>
                                                    <p className="text-[#000000]/50 mobile:text-xl tablet:text-xl laptop:text-3xl">-</p>
                                                </button>
                                                <button className="hover:opacity-50">
                                                    <p className="text-[#44CD8D] mobile:text-lg tablet:text-lg laptop:text-2xl font-semibold">{item.count}</p>
                                                </button>
                                                <button onClick={() => plusCount(item.productId)} className="hover:opacity-50">
                                                    <p className="text-[#000000]/50 mobile:text-xl tablet:text-xl laptop:text-3xl">+</p>
                                                </button>
                                            </div>
                                            <div className="flex flex-row items-center space-x-4">
                                                <button onClick={() => deleteFromCart(item.productId)} className="hover:opacity-50">
                                                    <FaRegTrashCan className="mobile:text-xl tablet:text-2xl laptop:text-3xl text-[#0D0D0D]/50"/>
                                                </button>
                                                <button className="hover:opacity-50">
                                                    <LuHeart className="mobile:text-xl tablet:text-2xl laptop:text-3xl text-[#0D0D0D]/50"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>
                    <div className="mobile:w-full desktop2:w-96 bg-[#EFF3F6] p-4 rounded-2xl space-y-2.5 mobile:mt-6 desktop:mt-0 flex-grow-0 box-info relative h-fit">
                        <div className="w-full flex flex-row justify-between items-center">
                            <p className="text-[#0D0D0D] mobile:text-xl desktop:text-xl">{t("cart-page.your-cart-tile")}</p>
                            <p className="text-[#0D0D0D] mobile:text-xl desktop:text-xl">{totalCartCost}тг</p>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center">
                            <p className="text-[#0D0D0D] mobile:text-lg desktop:text-lg">{t("cart-page.products-title")} ({totalCart})</p>
                            <p className="text-[#0D0D0D] mobile:text-lg desktop:text-lg">{totalCartCost}тг</p>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center">
                            <p className="text-[#0D0D0D] mobile:text-lg desktop:text-lg">{t("cart-page.delivery-title")}</p>
                            <p className="text-[#0D0D0D] mobile:text-lg desktop:text-lg">-</p>
                        </div>
                        <button className="bg-[#44CD8D] p-2 w-full rounded-xl justify-center items-center flex hover:opacity-50">
                            <p className="text-xl text-white">{t("cart-page.pay-cart-button")}</p>
                        </button>
                    </div>
                </div>
            )}
            { cart.length === 0 && (
                <div className="flex flex-col space-y-2 justify-center items-center h-[60vh]">
                    <p className="mobile:text-xl tablet:text-2xl font-bold text-center">{t("cart-page.empty-empty-title")}</p>
                    <p className="mobile:text-lg tablet:text-xl w-96 text-center">{t("cart-page.empty-empty-subtitle")}</p>
                    <Link to='/' className="bg-[#44CD8D] p-3 px-6 rounded-xl hover:opacity-50">
                        <p className="text-white mobile:text-xl tablet:text-2xl">{t("cart-page.go-to-main-button")}</p>
                    </Link>
                </div>
            ) }
            {/* <Cards title="Рекомендации"/> */}
        </div>
    )
};

export default CartPage;