import { HiOutlineLocationMarker } from "react-icons/hi";
import { VscGlobe } from "react-icons/vsc";
import { IoIosArrowDown, IoIosMenu, IoIosArrowUp  } from "react-icons/io";
import { IoSearchOutline, IoCartOutline  } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { LuHeart, LuUser2  } from "react-icons/lu";
import { useEffect, useState } from "react";
import CategoriesModal from "./modals/CategoriesModal";
import AuthModal from "./modals/AuthModal";
import Notifications from "./modals/Notifications";
import { Link, useNavigate } from "react-router-dom";
import AddressModal from "./modals/AddressModal";
import {Trans, useTranslation} from "react-i18next";

function Navbar() {
    // Функция для получения значения куки по имени
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const [isSearcing, setIsSearching] = useState(false);
    const [lang, setLang] = useState('ru')
    const [isShowLanguages, setIsShowLanguages] = useState(false);

    const [isShowCategoriesModal, setIsShowCategoriesModal] = useState(false);
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
    const [isOpenNotifications, setIsOpenNotifcations] = useState(false);
    const [search, onChangeSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [totalCart, setTotalCart] = useState();
    const [userData, setUserData] = useState(null);
    const [isOpenAddressModal, setIsOpenAddressModal] = useState(false);
    const navigation = useNavigate();
    const {t, i18n} = useTranslation();


    useEffect(() => {
        if (search.trim() !== "") {
            fetchData();
        } else {
            setSearchResult([]);
        }

    }, [search]);

    const handleLanguageClick = (language) => {
        document.cookie = `lang=${language}; path=/`;
        setLang(language);
        setIsShowLanguages(false);
        i18n.changeLanguage(language);
    };

    useEffect(() => {
        const authToken = getCookie("auth_token");
        setIsLogged(!!authToken); 
    
        const intervalId = setInterval(fetchUserInfo, 1000); // Выполнять fetchUserInfo каждую секунду
    
        return () => {
            clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
        };
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
                getCartItems(data.user.id);
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
                setTotalCart(responseJson.total);
            }
        } catch {

        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-searchProducts?search=${search}`);
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            const data = await response.json();
            if (data.success) {
                setSearchResult(data.data);
            } else {
                setSearchResult();
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleFocus = () => {
        setIsSearching(true);
    };

    const handleBlur = () => {
        setIsSearching(false);
    };

    return (
        <div className="w-screen p-2 top-0 z-[1000] flex flex-row fixed bg-white justify-center pb-0 tablet:pb-4">
            <div className="flex flex-col space-y-2 mobile:w-full tablet:w-auto">
                <div className="flex flex-row items-center space-x-2">
                    { isLogged && (
                        <>
                            <HiOutlineLocationMarker className="text-sm text-[#2A2A2A]"/>
                            <p className="text-[#2A2A2A] text-sm">{ !userData?.address ? `${t('no-address')}` : userData.address }</p>
                            <div className="w-1 h-1 bg-[#44CD8D]/50 rounded-full"/>
                            { !userData?.address && (
                                <button onClick={() => setIsOpenAddressModal(true)} className="hover:opacity-50">
                                    <p className="text-[#0D0D0D]/50 text-sm">{t("enter-address")}</p>
                                </button>
                                
                            ) }
                        </>
                    ) }
                    <div>
                        <button onClick={() => setIsShowLanguages(!isShowLanguages)} className="flex flex-row space-x-1 items-center hover:opacity-50">
                            <VscGlobe className="text-sm text-[#2A2A2A]"/>
                            <p className="text-sm text-[#2A2A2A] font-semibold">{lang.toUpperCase()}</p>
                            { isShowLanguages ? <IoIosArrowUp className="text-m text-[#2A2A2A]"/> : <IoIosArrowDown className="text-m text-[#2A2A2A]"/> }
                        </button>
                        {isShowLanguages && (
                            <div className="bg-white rounded-lg absolute z-10 shadow-lg border-black flex flex-col">
                                <button onClick={() => handleLanguageClick('ru')} className={lang === 'ru' ? "px-4 py-0.5 bg-[#44CD8D]/20 rounded-t-lg" : "px-2 py-0.5 hover:opacity-50"}>
                                    <p className={lang === 'ru' ? "text-[#44CD8D]" : "text-[#2A2A2A]"}>RU</p>
                                </button>
                                <button onClick={() => handleLanguageClick('kz')} className={lang === 'kz' ? "px-4 py-0.5 bg-[#44CD8D]/20 rounded-b-lg" : "px-2 py-0.5 hover:opacity-50"}>
                                    <p className={lang === 'kz' ? "text-[#44CD8D]" : "text-[#2A2A2A]"}>KZ</p>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-row mobile:space-x-3 tablet:space-x-5 items-center">
                    <img onClick={() => navigation('/main?cat=all')} className="object-contain mobile:hidden tablet:block cursor-pointer hover:opacity-50 h-20 w-20" src={require('../../img/logotype.png')}/>
                    <button onClick={() => setIsShowCategoriesModal(true)} className="bg-[#EFF3F6]/50 py-1.5 px-2 rounded-xl justify-center items-center flex hover:bg-[#44CD8D]/20">
                        <IoIosMenu className="text-4xl text-[#44CD8D]"/>
                    </button>
                    <div className="flex flex-col justify-center items-center w-10/12">
                        <div className={ isSearcing ? "flex flex-row py-2 px-3 w-full space-x-2 bg-[#EFF3F6]/50 items-center rounded-xl border-2  border-[#44CD8D]" : "w-full flex flex-row py-2 px-3 space-x-2 bg-[#EFF3F6]/50 items-center rounded-xl" }>
                            <IoSearchOutline className="text-2xl text-[#44CD8D]"/>
                            <input 
                                className={ isSearcing ? "text-xl text-[#464646] bg-transparent outline-none mobile:w-full tablet:w-96" : "text-xl text-[#464646]/20 bg-transparent outline-none mobile:w-full tablet:w-96" } 
                                placeholder={`${t("search-placeholder")}`}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                value={search}
                                onChange={e => onChangeSearch(e.target.value)}
                            />
                        </div>
                        {search !== "" && (
                            <div className="bg-white border-[1px] space-y-2 w-[440px] border-black/20 rounded-xl p-2 absolute z-10 top-24">
                                { searchResult.length === 0 ? (
                                    <p className="text-[#44CD8D] text-xl text-center">{t('search-not-found')}</p>
                                ) : (
                                    <>
                                        {searchResult.map((item, index) => (
                                            <Link to={`/product/${item.id}`} onClick={() => onChangeSearch("")} key={index} className="flex flex-row space-x-2 hover:opacity-50 items-center">
                                                <IoSearchOutline className="text-2xl text-[#0D0D0D]/50"/>
                                                <p className="text-xl text-[#0D0D0D]/50">{item.title}</p>
                                            </Link>
                                        ))}
                                    </>
                                ) } 
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row">
                        { isLogged && (
                            <div className="mobile:hidden tablet:flex flex-row space-x-4">
                                <div>
                                    <button onClick={() => setIsOpenNotifcations(!isOpenNotifications)} className="space-y-0.1 flex flex-col justify-center items-center hover:opacity-50">
                                        <GoBell className="text-2xl text-[#44CD8D]"/>
                                        <p className="text-[#0D0D0D]/70 text-lg">{t("notifications")}.</p>
                                    </button>
                                    { isOpenNotifications && <Notifications/> }
                                </div>
                                <Link to='/profile/favourite' className="space-y-0.1 flex flex-col justify-center items-center hover:opacity-50">
                                    <LuHeart className="text-2xl text-[#44CD8D]"/>
                                    <p className="text-[#0D0D0D]/70 text-lg">{t('favourite')}</p>
                                </Link>
                                <Link to='/cart' className="space-y-0.1 flex flex-col justify-center items-center hover:opacity-50">
                                    <div className="relative">
                                        <IoCartOutline className="text-2xl text-[#44CD8D]"/>
                                        { totalCart && (
                                            <div className="absolute z-10 h-4 w-6 justify-center items-center flex rounded-lg bg-[#EFF3F6] top-0 -right-2">
                                                <p className="text-[#44CD8D] text-xs font-semibold">{totalCart}</p>
                                            </div>
                                        ) }
                                    </div>
                                    <p className="text-[#0D0D0D]/70 text-lg">{t('cart')}</p>
                                </Link>
                                <Link to='/profile/info' className="space-y-0.1 flex flex-col justify-center items-center hover:opacity-50">
                                    <LuUser2 className="text-2xl text-[#44CD8D]"/>
                                    <p className="text-[#0D0D0D]/70 text-lg">{t("profile")}</p>
                                </Link>
                            </div>
                        ) }
                        { !isLogged && (
                            <>
                                <button onClick={() => setIsOpenAuthModal(true)} className="space-y-0.1 flex flex-col justify-center items-center hover:opacity-50">
                                    <LuUser2 className="text-2xl text-[#44CD8D]"/>
                                    <p className="text-[#0D0D0D]/70 text-lg">{t("login")}</p>
                                </button>
                            </>
                        ) }
                    </div>
                </div>
            </div>
            { isShowCategoriesModal && <CategoriesModal onClose={() => setIsShowCategoriesModal(false)}/> }
            { isOpenAuthModal && <AuthModal onClose={() => setIsOpenAuthModal(false)}/> }
            { isOpenAddressModal && <AddressModal onClose={() => setIsOpenAddressModal(false)}/> }
        </div>
    )
};

export default Navbar;