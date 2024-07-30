import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import categoriesData from '../../../json/categories2.json';

function AddProduct({ goBack }) {
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [isOpenSubcategory, setIsOpenSubcategory] = useState(false);
    const [isOpenSubSubcategory, setIsOpenSubSubcategory] = useState(false);
    const [isOpenItemCategory, setIsOpenItemCategory] = useState(false);

    const [selectedSubSubcategory, setSelectedSubSubcategory] = useState(null);
    const [selectedSubcategory, setSelectedSubCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [data, onChangeData] = useState({
        title: "",
        price: "",
        slugCategory: "",
        slugSubcategory: "",
        slugSubSubcategory: "",
        slugItemCategory: "",
        previewImage1: null,
        previewImage2: null,
        previewImage3: null,
        previewImage4: null,
        previewImage5: null,
        description: ""
    });
    const [userData, setUserData] = useState({});
    const [customerInfo, setCustomerInfo] = useState({});
    const {t} = useTranslation();
    const categories = categoriesData.categories;

    useEffect(() => {
        fetchUserInfo();
    }, [userData])

    const fetchUserInfo = async () => {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('userData')
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
                fetchCustomerInfo(data.user.customerId);
            } else {

            }
        })
        .catch(error => {
            // Обработка ошибки запроса
        });
    };

    const fetchCustomerInfo = async (id) => {
        console.log('fetchCustomerInfo')
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-getCustomerInfo/${id}`);

            const responseJson = await response.json();

            if (responseJson.success) {
                setCustomerInfo(responseJson.customerInfo[0]);
                console.log(responseJson.customerInfo[0]);
            }
        } catch {

        }
    }

    const handleChangeData = (fieldName, value) => {
        onChangeData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    }

    const setCategory = (category, slug) => {
        handleChangeData('slugCategory', slug);
        setSelectedCategory(category);
        setIsOpenCategory(false);
        // setSubcategoryName(null);
    };

    const setSubcategory = (subcategory, slug) => {
        handleChangeData('slugSubcategory', slug);
        setSelectedSubCategory(subcategory);
        setIsOpenSubcategory(false);
    };

    const setSubSubcategories = (subSubcategory, slug) => {
        setSelectedSubSubcategory(subSubcategory);
        handleChangeData("slugSubSubcategory", slug);
        setIsOpenSubSubcategory(false)
    }

    const setItem = (slug) => {
        handleChangeData("slugItemCategory", slug);
        setIsOpenItemCategory(false);
    }

    const handleChangeImage = (e, key) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                onChangeData({
                    ...data,
                    [key]: reader.result
                });
            };
            reader.readAsDataURL(selectedFile);
        }
    };    

    // Перед отправкой данных на сервер конвертируем base64 строки в файлы
    const submitData = async () => {
        try {
            const formData = new FormData();
            formData.append('previewImages', dataURLtoFile(data.previewImage1));
            formData.append('previewImages', dataURLtoFile(data.previewImage2));
            formData.append('previewImages', dataURLtoFile(data.previewImage3));
            formData.append('previewImages', dataURLtoFile(data.previewImage4));
            formData.append('previewImages', dataURLtoFile(data.previewImage5));
            formData.append('title', data.title);
            formData.append('price', data.price);    
            formData.append('category', data.slugCategory);
            formData.append('subcategory', data.slugSubcategory)
            formData.append('description', data.description);
            formData.append('customerId', userData.id);
            formData.append('costumer', customerInfo.companyName);
            formData.append('subSubcategorySlug', data.slugSubSubcategory);
            formData.append('itemSlug', data.slugItemCategory);

            const response = await fetch('https://nomadfarm-24.store/api-addProduct', {
                method: 'POST',
                body: formData
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                goBack();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Функция для конвертации base64 строки в файл
    function dataURLtoFile(dataUrl, filename) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    

    return (
        <div>
            <button onClick={goBack} className="flex flex-row space-x-2 items-center hover:opacity-50">
                <div className="w-8 h-8 bg-[#EFF3F6] rounded-full justify-center items-center flex">
                    <IoIosArrowBack className="text-xl text-[#44CD8D]"/>
                </div>
                <p className="text-2xl font-bold">{t('add-product-page.title')}</p>
            </button>
            <div className="mt-6 flex flex-col">
                <div className="flex mobile:flex-col tablet:flex-row items-center mobile:space-x-0 mobile:space-y-6 tablet:space-y-0 tablet:space-x-10 justify-between">
                    <div className="flex w-full flex-col space-y-2">
                        <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t('add-product-page.name')}</p>
                        <div className="mobile:w-full laptop:w-64 desktop:w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl">
                            <input value={data.title} onChange={(e) => handleChangeData('title', e.target.value)} className="text-xl outline-none bg-transparent" placeholder={t("add-product-page.name-placeholder")}/>
                        </div>
                    </div>
                    <div className="flex w-full flex-col space-y-2">
                        <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t('add-product-page.cost')}</p>
                        <div className="mobile:w-full laptop:w-64 desktop:w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl">
                            <input value={data.price} onChange={(e) => handleChangeData('price', e.target.value)} className="text-xl outline-none bg-transparent" placeholder={t("add-product-page.cost-placeholder")}/>
                        </div>
                    </div>
                </div>
                <div className="flex mobile:flex-col tablet:flex-row items-center mobile:space-x-0 mobile:space-y-6 tablet:space-y-0 tablet:space-x-10 justify-between mt-4">
                    <div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t("add-product-page.category")}</p>
                            <div className={ isOpenCategory ? "mobile:w-full laptop:w-96 border-[1px] border-[#44CD8D] p-2 px-4 rounded-xl flex flex-row justify-between items-center" : "mobile:w-full laptop:w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl flex flex-row justify-between items-center"}>
                                <p className="text-xl text-black/25">{ data.slugCategory ? t(`categories.${data.slugCategory}`) : `${t("add-product-page.category-placeholder")}` }</p>
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
                            <div className="mobile:w-full h-[20vh] overflow-y-auto shadow-xl laptop:w-96 bg-white p-2 border-2 border-[#EFF3F6] rounded-xl absolute z-10 flex-col flex items-start mt-4">
                                { categories.map((category, index) => (
                                    <button key={index} onClick={() => setCategory(category, category.slug)} className="hover:opacity-50 py-1 px-2">
                                        <p className="text-xl">{t(`categories.${category.slug}`)}</p>
                                    </button>
                                )) }
                            </div>
                        ) }
                    </div>
                    <div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t("add-product-page.subcategory")}</p>
                            <div className={ isOpenSubcategory ? "mobile:w-full laptop:w-96 border-[1px] border-[#44CD8D] p-2 px-4 rounded-xl flex flex-row justify-between items-center" : "mobile:w-full laptop:w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl flex flex-row justify-between items-center"}>
                                <p className="text-xl text-black/25">{ data.slugSubcategory ? t(`subcategories.${data.slugSubcategory}`) : `${t("add-product-page.subcategory-placeholder")}` }</p>
                                <button onClick={() => setIsOpenSubcategory(!isOpenSubcategory)} className="hover:opacity-50">
                                    { isOpenSubcategory ? (
                                        <IoIosArrowUp className="text-2xl text-black/25"/>
                                    ) : (
                                        <IoIosArrowDown className="text-2xl text-black/25"/>
                                    ) }
                                </button>
                            </div>
                        </div>
                        { isOpenSubcategory && (
                            <div className="mobile:w-full laptop:w-96 bg-white p-2 border-2 border-[#EFF3F6] shadow-xl rounded-xl absolute z-10 flex-col flex items-start mt-4">
                                { selectedCategory && (
                                    <>
                                        { selectedCategory.subcategories.map((subcategory, index) => (
                                            <button key={index} onClick={() => setSubcategory(subcategory, subcategory.slug)} className="hover:opacity-50 py-1 px-2">
                                                <p className="text-xl">{t(`subcategories.${subcategory.slug}`)}</p>
                                            </button>
                                        )) }
                                    </>
                                ) }
                                { !selectedCategory && (
                                    <p className="text-xl text-[#0d0d0d80] text-center w-full mb-2 mt-2">{t("add-product-page.firstly-select-category")}</p>
                                ) }
                            </div>
                        ) }
                    </div>
                </div>
                <div className="flex mobile:flex-col tablet:flex-row items-center mobile:space-x-0 mobile:space-y-6 tablet:space-y-0 tablet:space-x-10 justify-between mt-4">
                    <div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t("add-product-page.subSubcategory")}</p>
                            <div className={ isOpenSubSubcategory ? "mobile:w-full laptop:w-96 border-[1px] border-[#44CD8D] p-2 px-4 rounded-xl flex flex-row justify-between items-center" : "mobile:w-full laptop:w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl flex flex-row justify-between items-center"}>
                                <p className="text-xl text-black/25">{ data.slugSubSubcategory ? t(`subSubcategories.${data.slugSubSubcategory}`) : `${t("add-product-page.subSubcategory-placeholder")}` }</p>
                                <button onClick={() => setIsOpenSubSubcategory(!isOpenSubSubcategory)} className="hover:opacity-50">
                                    { isOpenSubSubcategory ? (
                                        <IoIosArrowUp className="text-2xl text-black/25"/>
                                    ) : (
                                        <IoIosArrowDown className="text-2xl text-black/25"/>
                                    ) }
                                </button>
                            </div>
                        </div>
                        { isOpenSubSubcategory && (
                            <div className="mobile:w-full laptop:w-96 bg-white p-2 border-2 border-[#EFF3F6] shadow-xl rounded-xl absolute z-10 flex-col flex items-start mt-4">
                                { selectedSubcategory && (
                                    <>
                                        { selectedSubcategory.subSubcategories.map((subSubcategory, index) => (
                                            <button key={index} onClick={() => setSubSubcategories(subSubcategory, subSubcategory.slug)} className="hover:opacity-50 py-1 px-2">
                                                <p className="text-xl">{t(`subSubcategories.${subSubcategory.slug}`)}</p>
                                            </button>
                                        )) }
                                    </>
                                ) }
                                { !selectedSubcategory && (
                                    <p className="text-xl text-[#0d0d0d80] text-center w-full mb-2 mt-2">{t("add-product-page.firstly-select-subcategory")}</p>
                                ) }
                            </div>
                        ) }
                    </div>
                    <div>
                        <div className="flex flex-col space-y-2">
                            <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t("add-product-page.itemCategory")}</p>
                            <div className={ isOpenItemCategory ? "mobile:w-full laptop:w-96 border-[1px] border-[#44CD8D] p-2 px-4 rounded-xl flex flex-row justify-between items-center" : "mobile:w-full laptop:w-96 border-[1px] border-black/20 p-2 px-4 rounded-xl flex flex-row justify-between items-center"}>
                                <p className="text-xl text-black/25">{ data.slugItemCategory ? t(`items.${data.slugItemCategory}`) : `${t("add-product-page.items-placeholder")}` }</p>
                                <button onClick={() => setIsOpenItemCategory(!isOpenItemCategory)} className="hover:opacity-50">
                                    { isOpenItemCategory ? (
                                        <IoIosArrowUp className="text-2xl text-black/25"/>
                                    ) : (
                                        <IoIosArrowDown className="text-2xl text-black/25"/>
                                    ) }
                                </button>
                            </div>
                        </div>
                        { isOpenItemCategory && (
                            <div className="mobile:w-full laptop:w-96 bg-white p-2 border-2 border-[#EFF3F6] shadow-xl rounded-xl absolute z-10 flex-col flex items-start mt-4">
                                { selectedSubSubcategory && (
                                    <>
                                        { selectedSubSubcategory.items.map((item, index) => (
                                            <button key={index} onClick={() => setItem(item.slug)} className="hover:opacity-50 py-1 px-2">
                                                <p className="text-xl">{t(`items.${item.slug}`)}</p>
                                            </button>
                                        )) }
                                    </>
                                ) }
                                { !selectedSubSubcategory && (
                                    <p className="text-xl text-[#0d0d0d80] text-center w-full mb-2 mt-2">{t("add-product-page.firstly-select-sub-subcategory")}</p>
                                ) }
                            </div>
                        ) }
                    </div>
                </div>
                <div className="mt-4 flex flex-col space-y-2">
                    <p className="mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t("add-product-page.photo")}</p>
                    <div className="w-full flex flex-row items-center flex-wrap">
                        {Object.keys(data).map((key, index) => {
                            if (key.startsWith('previewImage') && data[key]) {
                                return (
                                    <img
                                        key={index}
                                        src={data[key]}
                                        className="desktop:h-40 mobile:w-16 laptop:w-32 laptop:h-32 mobile:h-16 desktop:w-40 m-2 rounded-xl flex justify-center items-center object-cover"
                                    />
                                );
                            } else if (key.startsWith('previewImage')) {
                                return (
                                    <label
                                        key={index}
                                        className="bg-[#44CD8D] desktop:h-40 mobile:w-16 laptop:w-32 laptop:h-32 mobile:h-16 desktop:w-40 m-2 rounded-xl hover:opacity-50 flex justify-center items-center"
                                    >
                                        <AiOutlinePlus className="text-4xl text-white" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleChangeImage(e, key)}
                                        />
                                    </label>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <p className="text-black mobile:text-lg laptop:text-xl desktop:text-2xl font-bold">{t("add-product-page.description")}</p>
                    <div className="border-[1px] border-black/20 p-2 px-4 rounded-xl flex flex-row justify-between items-center w-full">
                        <textarea value={data.description} onChange={(e) => handleChangeData('description', e.target.value)} placeholder={t("add-product-page.description-placeholder")} className="text-xl outline-none bg-transparent h-32 w-full"/>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2 mt-4">
                    <button onClick={() => submitData()} className="bg-[#44CD8D] p-2 rounded-xl hover:opacity-50 px-4">
                        <p className="text-white mobile:text-xs laptop:text-lg desktop:text-xl">{t("add-product-page.public-button")}</p>
                    </button>
                    <button className="bg-[#EFF3F6] p-2 rounded-xl hover:opacity-50 px-4">
                        <p className="text-[#0D0D0D] mobile:text-xs laptop:text-lg desktop:text-xl">{t("add-product-page.cancel-button")}</p>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default AddProduct;