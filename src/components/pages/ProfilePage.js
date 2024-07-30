import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import ProfileInfo from "./profile/ProfileInfo";
import Finances from "./profile/Finances";
import Favourite from "./profile/Favourite";
import MyOrders from "./profile/MyOrders";
import BecomeCustomer from "./profile/BecomeCustomer";
import { useState, useEffect } from "react";
import Bussines from "./profile/Bussines";
import { useTranslation } from "react-i18next";
import AddBankCard from "../ux/modals/AddBankCard";
import ChangePassword from "../ux/modals/ChangePassword";
import ReactLoading from 'react-loading';

function ProfilePage() {
    const { category } = useParams();
    const [userData, setUserData] = useState({});
    const {t} = useTranslation();
    const [isAddBankCard, setIsAddBankCard] = useState(false);
    const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const [isFocused, setIsFocused] = useState(location.pathname === '/profile/info');

    useEffect(() => {
        if (isFocused) {
            fetchUserInfo();
        }
    }, [isFocused])

    const fetchUserInfo = async () => {
        try { 
            const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        
            // Отправляем запрос на сервер для получения информации о пользователе
            const response = await fetch(`https://nomadfarm-24.store/api-getUserInfo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Устанавливаем токен в заголовке Authorization
                }
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                setUserData(responseJson.user)
            }

        } catch {

        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <>
            { isLoading && (
                <div className="w-screen h-screen bg-[#44CD8D] flex justify-center items-center absolute z-[1000000]">
                    <ReactLoading type="spin" color="#FFF" height={25} width={25} />
                </div>
            ) }
            { !isLoading && (
                <div className="w-full h-full flex flex-col justify-center items-center mt-32">
                    <div className="flex flex-row flex-wrap items-center justify-center">
                        <Link to='/profile/info' className={ category === 'info' ? "flex items-center justify-center p-2 px-3 bg-[#44CD8D] rounded-xl m-2" : "flex items-center justify-center p-2 px-3 rounded-xl hover:opacity-50 m-2"}>
                            <p className={ category === 'info' ? "text-white mobile:text-md laptop:text-lg dekstop:text-xl" : "text-[#0D0D0D]/50 mobile:text-md laptop:text-lg dekstop:text-xl" }>{t("profile")}</p>
                        </Link>
                        <Link to='/profile/history' className={ category === 'history' ? "flex items-center justify-center p-2 px-3 bg-[#44CD8D] rounded-xl m-2" : "flex items-center justify-center p-2 px-3 rounded-xl hover:opacity-50 m-2"}>
                            <p className={ category === 'history' ? "text-white mobile:text-md laptop:text-lg dekstop:text-xl" : "text-[#0D0D0D]/50 mobile:text-md laptop:text-lg dekstop:text-xl" }>{t("profile-page.my-orders")}</p>
                        </Link>
                        <Link to='/profile/favourite' className={ category === 'favourite' ? "flex items-center justify-center p-2 px-3 bg-[#44CD8D] rounded-xl m-2" : "flex items-center justify-center p-2 px-3 rounded-xl hover:opacity-50 m-2"}>
                            <p className={ category === 'favourite' ? "text-white mobile:text-md laptop:text-lg dekstop:text-xl" : "text-[#0D0D0D]/50 mobile:text-md laptop:text-lg dekstop:text-xl" }>{t("favourite")}</p>
                        </Link>
                        <Link to='/profile/finances' className={ category === 'finances' ? "flex items-center justify-center p-2 px-3 bg-[#44CD8D] rounded-xl m-2" : "flex items-center justify-center p-2 px-3 rounded-xl hover:opacity-50 m-2"}>
                            <p className={ category === 'finances' ? "text-white mobile:text-md laptop:text-lg dekstop:text-xl" : "text-[#0D0D0D]/50 mobile:text-md laptop:text-lg dekstop:text-xl" }>{t("profile-page.finances")}</p>
                        </Link>
                        { userData?.customerId ? (
                            <Link to='/profile/bussines' className={ category === 'bussines' ? "flex items-center justify-center p-2 px-3 bg-[#44CD8D] rounded-xl m-2" : "flex items-center justify-center p-2 px-3 rounded-xl hover:opacity-50 m-2"}>
                                <p className={ category === 'bussines' ? "text-white mobile:text-md laptop:text-lg dekstop:text-xl" : "text-[#0D0D0D]/50 mobile:text-md laptop:text-lg dekstop:text-xl" }>{t("profile-page.business")}</p>
                            </Link>
                        ) : (
                            <Link to='/profile/customer' className={ category === 'customer' ? "flex items-center justify-center p-2 px-3 bg-[#44CD8D] rounded-xl m-2" : "flex items-center justify-center p-2 px-3 rounded-xl hover:opacity-50 m-2"}>
                                <p className={ category === 'customer' ? "text-white mobile:text-md laptop:text-lg dekstop:text-xl" : "text-[#0D0D0D]/50 mobile:text-md laptop:text-lg dekstop:text-xl" }>{t("profile-page.became-customer")}</p>
                            </Link>
                        ) }
                    </div>
                    { category === 'info' && <ProfileInfo onLoading={() => setIsLoading(true)} offLoading={() => setIsLoading(false)} openChangePassword={() => setIsOpenChangePassword(true)}  addBankCard={() => setIsAddBankCard(true)} userData={userData}/> }
                    { category === 'finances' && <Finances/> }
                    { category === 'favourite' && <Favourite/> }
                    { category === 'history' && <MyOrders/> }
                    { category === 'customer' && <BecomeCustomer/> }
                    { category === 'bussines' && <Bussines/> }
                    { isAddBankCard && <AddBankCard onClose={() => setIsAddBankCard(false)}/> }
                    { isOpenChangePassword && <ChangePassword userId={userData.id} onClose={() => setIsOpenChangePassword(false)}/> }
                </div>
            ) }
        </>
    )
};

export default ProfilePage;