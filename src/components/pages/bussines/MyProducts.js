import { useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import AddProduct from "./AddProduct";
import ChangeStatus from "../../ux/modals/ChangeStatus";
import EditProduct from "./EditProduct";
import { useTranslation } from "react-i18next";

function MyProducts() {
    const [category, setCategory] = useState('products');
    const [filter, setFilter] = useState('all');
    const [userData, setUserData] = useState({});
    const [products, setProducts] = useState([]);
    const [isChangeStatus, setIsChangeStatus] = useState(true);
    const [editibleProduct, setEditibleProduct] = useState([]);
    const {t} = useTranslation();

    useEffect(() => {
        const interval = setInterval(fetchUserInfo, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [filter]);

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
            const response = await fetch(`https://nomadfarm-24.store/api-getMyProducts/${id}/${filter}`);

            const responseJson = await response.json();

            if (responseJson.success) {
                setProducts(responseJson.items)
            }
        } catch {

        }
    }

    const deleteProduct = async (id) => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-deleteMyProduct', {
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

    const changeStatus = async (id, status) => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-changeStatus', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({ status: status, userId: userData.id, productId: id })
            });

            const responseJson = await response.json();
        } catch {

        }
    };

    const changeFilter = (filter) => {
        setFilter(filter);
        setProducts([]);
    }

    const editingProduct = async (data) => {
        setCategory('edit');
        setEditibleProduct(data)
    }

    const truncate = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div className="tablet:w-10/12 laptop:w-9/12 desktop:w-8/12 desktop2:w-5/12 p-2 mt-2">
            { category === 'products' && (
                <>
                    <div className="flex mobile:flex-col mobile:space-y-2 tablet:space-y-0 tablet:flex-row justify-between items-center">
                        <div className="flex flex-row space-x-4 items-center">
                            <button onClick={() => changeFilter('all')} className={ filter === 'all' ? "hover:opacity-50 font-light bg-[#EFF3F6] p-1 rounded-xl px-3" : "hover:opacity-50 font-light" }>
                                <p className="mobile:text-md laptop:text-lg desktop:text-xl">{t("my-products-page.all")}</p>
                            </button>
                            <button onClick={() => changeFilter('top')} className={ filter === 'top' ? "hover:opacity-50 font-light bg-[#EFF3F6] p-1 rounded-xl px-3" : "hover:opacity-50 font-light" }>
                                <p className="mobile:text-md laptop:text-lg desktop:text-xl">{t("my-products-page.top")}</p>
                            </button>
                            <button onClick={() => changeFilter('public')} className={ filter === 'public' ? "hover:opacity-50 font-light bg-[#EFF3F6] p-1 rounded-xl px-3" : "hover:opacity-50 font-light" }>
                                <p className="mobile:text-md laptop:text-lg desktop:text-xl">{t("my-products-page.in-sale")}</p>
                            </button>
                            <button onClick={() => changeFilter('waiting')} className={ filter === 'waiting' ? "hover:opacity-50 font-light bg-[#EFF3F6] p-1 rounded-xl px-3" : "hover:opacity-50 font-light" }>
                                <p className="mobile:text-md laptop:text-lg desktop:text-xl">{t("my-products-page.canceled")}</p>
                            </button>
                        </div>
                        <button onClick={() => setCategory('addProduct')} className="bg-[#44CD8D] p-2 rounded-xl hover:opacity-50 px-4">
                            <p className="text-white mobile:text-md laptop:text-lg desktop:text-xl">{t("my-products-page.add-product-button")}</p>
                        </button>
                    </div>
                    <div className="flex flex-col pr-4">
                        { products.length > 0 && (
                            <>
                                { products.map((item, index) => (
                                <div key={index} className="flex flex-row space-x-4 mt-4">
                                    <div className="flex flex-row space-x-2">
                                        <div className="flex tablet:hidden laptop:flex-col space-y-2">
                                            <img src={`http://nomadfarm-24.store/api-productImage/${item.photoPreview2}`} className="h-20 w-20 rounded-xl"/>
                                            <img src={`http://nomadfarm-24.store/api-productImage/${item.photoPreview3}`} className="h-20 w-20 rounded-xl"/>
                                            <img src={`http://nomadfarm-24.store/api-productImage/${item.photoPreview4}`} className="h-20 w-20 rounded-xl"/>
                                        </div>
                                        <img src={`http://nomadfarm-24.store/api-productImage/${item.photoPreview1}`} className="w-64 h-48 rounded-2xl object-cover"/>
                                    </div>
                                    <div className="flex flex-col space-y-3 flex-1">
                                        <p className="mobile:text-xs laptop:text-lg desktop:text-2xl text-black/50">{t("add-product-page.name")}: <span className="text-black/100">{item.title}</span></p>
                                        <p className="mobile:text-xs laptop:text-lg desktop:text-2xl text-black/50">{t("add-product-page.description")}: <span className="text-black/100">{truncate(item.description, 15)}</span></p>
                                        <div className="flex flex-row items-center mobile:space-x-6 laptop:space-x-2">
                                            <button className="bg-[#44CD8D] mobile:p-1 laptop:p-2 mobile:rounded-lg laptop:rounded-xl hover:opacity-50 mobile:px-1.5 laptop:px-4">
                                                <p className="text-white mobile:text-xs laptop:text-lg desktop:text-xl">{t("my-products-page.move-to-top")}</p>
                                            </button>
                                            <button onClick={() => editingProduct(item)} className="bg-[#EFF3F6] mobile:p-1 laptop:p-2 mobile:rounded-lg laptop:rounded-xl hover:opacity-50 mobile:px-1.5 laptop:px-4">
                                                <p className="text-[#0D0D0D] mobile:text-xs laptop:text-lg desktop:text-xl">{t("my-products-page.edit-button")}</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2 items-center">
                                        <button onClick={ item.status === 'waiting' ? () => changeStatus(item.id, 'public') : () => changeStatus(item.id, 'waiting') } className="border-2 border-black/20 w-8 h-8 rounded-lg justify-center items-center flex">
                                            { item.status === 'public' && <div className="bg-[#44CD8D] h-4 w-4 rounded-full"/> }
                                        </button>
                                        <button onClick={() => deleteProduct(item.id)} className="hover:opacity-50">
                                            <FaRegTrashCan className="text-black/20 text-2xl"/>
                                        </button>
                                    </div>
                                </div>
                            )) }
                            </>
                        ) }
                        { products.length === 0 && (
                            <div className="w-full justify-center items-center flex flex-col h-96">
                                <p className="text-center mobile:text-xl tablet:text-2xl font-bold">{t("my-products-page.empty-list-title")}</p>
                                <p className="text-center mobile:text-lg tablet:text-xl">{t("my-products-page.empty-list-subtitle")}</p>
                            </div>
                        ) }
                    </div>
                </>
            ) }
            { category === 'addProduct' && <AddProduct goBack={() => setCategory('products')}/> }
            { category === 'edit' && <EditProduct product={editibleProduct} goBack={() => setCategory('products')}/> }
        </div>
    )
};

export default MyProducts;