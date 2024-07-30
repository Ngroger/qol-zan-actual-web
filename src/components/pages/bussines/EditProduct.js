import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import categories from '../../../json/categories2.json';

function EditProduct({ goBack, product }) {
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [data, onChangeData] = useState({
        title: product.title,
        price: product.newCost,
        oldCost: product.newCost,
        category: product.category,
        subcategory: product.subcategory,
        subSubCategory: product.subSubcategory,
        itemCategory: product.itemSlug,
        description: product.description
    });
    const {t} = useTranslation();

    const handleChangeData = (fieldName, value) => {
        onChangeData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    }

    const setCategory = (category) => {
        handleChangeData('category', category);
        setIsOpenCategory(false);
    }

    const saveChanges = () => {
        fetch(`https://nomadfarm-24.store/api-editProduct/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                goBack();
            } else {
                // Ошибка сохранения
            }
        })
        .catch(error => {
            // Обработка ошибки запроса
        });
    };

    return (
        <div>
            <button onClick={goBack} className="flex flex-row space-x-2 items-center hover:opacity-50">
                <div className="w-8 h-8 bg-[#EFF3F6] rounded-full justify-center items-center flex">
                    <IoIosArrowBack className="text-xl text-[#44CD8D]"/>
                </div>
                <p className="text-2xl font-bold">{t("edit-product-title")}</p>
            </button>
            <div className="mt-6 flex flex-col">
                <div className="flex mobile:flex-col tablet:flex-row items-center mobile:space-x-0 mobile:space-y-6 tablet:space-y-0 tablet:space-x-10 justify-between">
                    <div className="flex w-full flex-col space-y-2">
                        <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t('add-product-page.name')}</p>
                        <div className="mobile:w-full laptop:w-64 desktop:w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl">
                            <input value={data.title} onChange={(e) => handleChangeData('title', e.target.value)} className="text-xl outline-none bg-transparent" placeholder={`${product.title}`}/>
                        </div>
                    </div>
                    <div className="flex w-full flex-col space-y-2">
                        <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t('add-product-page.cost')}</p>
                        <div className="mobile:w-full laptop:w-64 desktop:w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl">
                            <input value={data.price} onChange={(e) => handleChangeData('price', e.target.value)} className="text-xl outline-none bg-transparent" placeholder={`${product.newCost}`}/>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col space-y-2">
                        <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t("add-product-page.category")}</p>
                        <div className={ isOpenCategory ? "mobile:w-full laptop:w-96 border-[1px] border-[#44CD8D] p-2 px-4 rounded-xl flex flex-row justify-between items-center" : "mobile:w-full laptop:w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl flex flex-row justify-between items-center"}>
                            <p className="text-xl text-black/25">{ data.category ? data.category : `${product.category}` }</p>
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
                        <div className="mobile:w-full laptop:w-96 bg-white p-2 border-2 border-[#EFF3F6] rounded-xl absolute z-10 flex-col flex items-start mt-4">
                            <button onClick={() => setCategory('Овощи и Фрукты')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Овощи и Фрукты</p>
                            </button>
                            <button onClick={() => setCategory('Молочные Продукты и Яйца')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Молочные Продукты и Яйца</p>
                            </button>
                            <button onClick={() => setCategory('Мясо & Птица & Рыба')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Мясо & Птица & Рыба</p>
                            </button>
                            <button onClick={() => setCategory('Зерновые и мучные изделия')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Зерновые и мучные изделия</p>
                            </button>
                            <button onClick={() => setCategory('Продукты для заботы о себе')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Продукты для заботы о себе</p>
                            </button>
                            <button onClick={() => setCategory('Соусы и консервация')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Соусы и консервация</p>
                            </button>
                            <button onClick={() => setCategory('Здоровое питание & Детское питание')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl text-left">Здоровое питание & Детское питание</p>
                            </button>
                            <button onClick={() => setCategory('Колбасные изделия')} className="hover:opacity-50 py-1 px-2">
                                <p className="text-xl">Колбасные изделия</p>
                            </button>
                        </div>
                    ) }
                </div>
                <div className="mt-4 flex flex-col space-y-2">
                    <p className="mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t("add-product-page.photo")}</p>
                    <div className="w-full flex flex-row items-center flex-wrap">
                        <img
                            src={`http://nomadfarm-24.store/api-productImage/${product.photoPreview1}`}
                            className="desktop:h-40 mobile:w-16 laptop:w-32 laptop:h-32 mobile:h-16 desktop:w-40 rounded-xl m-2 flex justify-center items-center"
                        />
                        <img
                            src={`http://nomadfarm-24.store/api-productImage/${product.photoPreview2}`}
                            className="desktop:h-40 mobile:w-16 laptop:w-32 laptop:h-32 mobile:h-16 desktop:w-40 rounded-xl m-2 flex justify-center items-center"
                        />
                        <img
                            src={`http://nomadfarm-24.store/api-productImage/${product.photoPreview3}`}
                            className="desktop:h-40 mobile:w-16 laptop:w-32 laptop:h-32 mobile:h-16 desktop:w-40 rounded-xl m-2 flex justify-center items-center"
                        />
                        <img
                            src={`http://nomadfarm-24.store/api-productImage/${product.photoPreview4}`}
                            className="desktop:h-40 mobile:w-16 laptop:w-32 laptop:h-32 mobile:h-16 desktop:w-40 rounded-xl m-2 flex justify-center items-center"
                        />
                        <img
                            src={`http://nomadfarm-24.store/api-productImage/${product.photoPreview5}`}
                            className="desktop:h-40 mobile:w-16 laptop:w-32 laptop:h-32 mobile:h-16 desktop:w-40 rounded-xl m-2 flex justify-center items-center"
                        />

                    </div>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t("add-product-page.description")}</p>
                    <div className="border-[1px] border-black/20 p-2 px-4 rounded-xl flex flex-row justify-between items-center w-full">
                        <textarea value={data.description} onChange={(e) => handleChangeData('description', e.target.value)} placeholder={`${product.description}`} className="text-xl outline-none bg-transparent h-32 w-full"/>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2 mt-4">
                    <button onClick={() => saveChanges()} className="bg-[#44CD8D] p-2 rounded-xl hover:opacity-50 px-4">
                        <p className="text-white mobile:text-xs laptop:text-lg desktop:text-xl">{t("button-save")}</p>
                    </button>
                    <button className="bg-[#EFF3F6] p-2 rounded-xl hover:opacity-50 px-4">
                        <p className="text-[#0D0D0D] mobile:text-xs laptop:text-lg desktop:text-xl">{t("cancel-button")}</p>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default EditProduct;