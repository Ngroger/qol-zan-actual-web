import { CiCamera, CiEdit } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ProfileMap from "../../ui/ProfileMap";
import { IoCheckmark, IoCloseOutline  } from "react-icons/io5";
import AddBankCard from "../../ux/modals/AddBankCard";
import { FaRegSave } from "react-icons/fa";

function ProfileInfo({ onLoading, offLoading, openChangePassword, addBankCard, userData }) {
    const {t} = useTranslation();
    const [newImage, setNewImage] = useState(null);
    const fileInput = useRef(null);
    const [bankCards, setBankCards] = useState([]);
    const [isEditibleName, setIsEditibleName] = useState(false);
    const [newName, onChangeName] = useState();
    const [isEditibleSurname, setIsEditibleSurname] = useState(false);
    const [newSurname, onChangeSurname] = useState();
    const [isEditiblePhone, setIsEditiblePhone] = useState(false);
    const [newPhone, onChangePhone] = useState();
    const [isEditibleEmail, setIsEditibleEmail] = useState(false);
    const [newEmail, onChangeEmail] = useState();

    useEffect(() => {
        const interval = setInterval(fetchBankCards, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    const fetchBankCards  = async (id) => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-getAllBankCards/${userData.id}`);
            
            const responseJson = await response.json();

            if (responseJson.success) {
                setBankCards(responseJson.cards)
            }
        } catch {

        } finally {
            
        }
    }

    const updatePhotoProfile = async () => {
        const formData = new FormData();
        formData.append('user_id', userData.id);
        formData.append('newImage', newImage);

        try {
            const response = await fetch('https://nomadfarm-24.store/api-updatePhotoProfile', {
                method: 'POST',
                body: formData,
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                window.location.reload();
            }

        } catch (error) {
        }
    };

    const activateCard = async (id) => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-activeBankCard', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cardId: id, userId: userData.id })
            });

            const responseJson = await response.json();
            
        } catch {

        }
    };

    const saveName = async () => {
        try {
            const response = await fetch("https://nomadfarm-24.store/api-changeUserName", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: userData.id, newName: newName })
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                onChangeName();
                setIsEditibleName(false);
            }
        } catch {

        }
    }

    const saveSurname = async () => {
        try {
            const response = await fetch("https://nomadfarm-24.store/api-changeUserSurname", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: userData.id, newSurname: newSurname })
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                onChangeSurname();
                setIsEditibleSurname(false);
            }
        } catch {

        }
    }

    const savePhone = async () => {
        try {
            const response = await fetch("https://nomadfarm-24.store/api-changeUserPhone", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: userData.id, phone: newPhone })
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                onChangePhone();
                setIsEditiblePhone(false);
            }
        } catch {

        }
    }

    const saveEmail = async () => {
        try {
            const response = await fetch("https://nomadfarm-24.store/api-changeUserEmail", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: userData.id, email: newEmail })
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                onChangeEmail();
                setIsEditibleEmail(false);
            }
        } catch {

        }
    }

    return (
        <div className="mobile:w-11/12 tablet:w-8/12 laptop:w-5/12 mt-4">
            <p className="text-[#000000] mobile:text-xl tablet:text-2xl laptop:text-3xl font-semibold">{t('profile')}</p>
            <div className="w-full justify-center items-center flex">
                <div className="w-64 h-64 relative">
                    { newImage ? (
                        <div className="flex flex-row w-full justify-between absolute z-10 bottom-0">
                            <button onClick={() => setNewImage(null)} className="border-4 border-white bg-red-500 h-14 w-14 justify-center items-center flex rounded-full absolute z-10 left-0 bottom-0 hover:opacity-50">
                                <IoCloseOutline  className="mobile:text-xl tablet:text-2xl laptop:text-3xl text-white"/>
                            </button>
                            <button onClick={() => updatePhotoProfile()} className="border-4 border-white bg-[#44CD8D] h-14 w-14 justify-center items-center flex rounded-full absolute z-10 right-0 bottom-0 hover:opacity-50">
                                <IoCheckmark className="mobile:text-xl tablet:text-2xl laptop:text-3xl text-white"/>
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => fileInput.current.click()} className="border-4 border-white bg-[#44CD8D] h-14 w-14 justify-center items-center flex rounded-full absolute z-10 right-0 bottom-0 hover:opacity-50">
                            <CiCamera className="mobile:text-xl tablet:text-2xl laptop:text-3xl text-white"/>
                        </button>
                    ) }
                    { newImage ? (
                        <img src={URL.createObjectURL(newImage)} className="w-full h-full rounded-full"/>
                    ) : (
                        <img src={`https://nomadfarm-24.store/api-userImage/${userData.photo}`} className="w-full h-full rounded-full"/>
                    ) }
                    <input 
                        type='file'
                        id={`newImage`}
                        name={`newImage`}
                        accept="image/*" 
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setNewImage(file);
                        }} 
                        style={{ display: "none" }} 
                        ref={fileInput}
                    />
                </div>
            </div>
            <div className="flex flex-row flex-wrap w-full justify-center items-center mt-6">
                <div className="bg-[#EFF3F6] px-2 py-4 rounded-xl m-4">
                    <p className="text-[#44CD8D] text-xl font-bold w-48 text-center">{t("about-customer.status")} <span className="text-[#0D0D0D]/80">{t("start-level-status")}</span></p>
                </div>
                <div className="bg-[#00ADB5]/30 px-2 py-4 rounded-xl m-4">
                    <p className="text-[#00ADB5] text-xl font-bold w-48 text-center">{t("achievement2")}</p>
                </div>
                <div className="bg-[#FC5185]/30 px-2 py-4 rounded-xl m-4">
                    <p className="text-[#FC5185] text-xl font-bold w-48 text-center">{t("achievement3")}</p>
                </div>
            </div>
            <div className="flex flex-col mt-6 space-y-1">
                <p className="text-xl text-[#5F9FFF]">{userData.level} {t("profile-page.level")}</p>
                <div className="w-full bg-[#0D0D0D]/10 rounded-full">
                    <div className="mobile:w-12 tablet:w-12 laptop:w-12 bg-[#5F9FFF] rounded-full p-0.5"/>
                </div>
            </div>
            <div className="mt-6">
                <p className="text-[#000000] mobile:text-xl tablet:text-2xl laptop:text-3xl font-semibold">{t("profile-page.personal-data")}</p>
                <div className="w-full flex mobile:flex-col laptop:flex-row flex-wrap justify-between">
                    <div className={ isEditibleName ? "mobile:w-full laptop:w-[20vw] border-2 border-[#44CD8D] p-2 px-6 rounded-2xl mt-4" : "mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 px-6 rounded-2xl mt-4" }>
                        <p className='text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 -mt-6'>{t("profile-page.name")}</p>
                        <div className="flex flex-row items-center justify-between">
                            { isEditibleName ? (
                                <input value={newName} onChange={(e) => onChangeName(e.target.value)} placeholder={t("profile-page.new-name-placeholder")} className="mobile:text-lg tablet:text-xl outline-none bg-transparent"/>
                            ) : (
                                <p className="mobile:text-lg tablet:text-xl">{userData.fullname}</p>
                            ) }
                            { isEditibleName ? (
                                <>
                                    { newName && (
                                        <div className="flex flex-row items-center space-x-2">
                                            <button onClick={() => (onChangeName(), setIsEditibleName(false))} className="hover:opacity-50">
                                                <IoCloseOutline   className="text-2xl"/>
                                            </button>
                                            <button onClick={() => saveName()} className="hover:opacity-50">
                                                <FaRegSave  className="text-2xl"/>
                                            </button>
                                        </div>
                                    ) }
                                </>
                            ) : (
                                <button onClick={() => setIsEditibleName(true)} className="hover:opacity-50">
                                    <CiEdit className="text-2xl"/>
                                </button>
                            ) }
                        </div>
                    </div>
                    <div className={ isEditibleSurname ? "mobile:w-full laptop:w-[20vw] border-2 border-[#44CD8D] p-2 px-6 rounded-2xl mt-4" : "mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 px-6 rounded-2xl mt-4" }>
                        <p className='text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 -mt-6'>{t("profile-page.surname")}</p>
                        <div className="flex flex-row items-center justify-between">
                            { isEditibleSurname ? (
                                <input value={newName} onChange={(e) => onChangeSurname(e.target.value)} placeholder={t("profile-page.new-surname-placeholder")} className="mobile:text-lg tablet:text-xl outline-none bg-transparent"/>
                            ) : (
                                <p className="mobile:text-lg tablet:text-xl">{userData.surname}</p>
                            ) }
                            { isEditibleSurname ? (
                                <>
                                    { newSurname && (
                                        <div className="flex flex-row items-center space-x-2">
                                            <button onClick={() => (onChangeSurname(), setIsEditibleSurname(false))} className="hover:opacity-50">
                                                <IoCloseOutline className="text-2xl"/>
                                            </button>
                                            <button onClick={() => saveSurname()} className="hover:opacity-50">
                                                <FaRegSave className="text-2xl"/>
                                            </button>
                                        </div>
                                    ) }
                                </>
                            ) : (
                                <button onClick={() => setIsEditibleSurname(true)} className="hover:opacity-50">
                                    <CiEdit className="text-2xl"/>
                                </button>
                            ) }
                        </div>
                    </div>
                    <div className={ isEditiblePhone ? "mobile:w-full laptop:w-[20vw] border-2 border-[#44CD8D] p-2 px-6 rounded-2xl mt-4" : "mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 px-6 rounded-2xl mt-4" }>
                        <p className='text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 -mt-6'>{t("profile-page.phone-number")}</p>
                        <div className="flex flex-row items-center justify-between">
                            { isEditiblePhone ? (
                                <input value={newPhone} onChange={(e) => onChangePhone(e.target.value)} placeholder={t("profile-page.new-phone-number-placeholder")} className="mobile:text-lg tablet:text-xl outline-none bg-transparent"/>
                            ) : (
                                <p className="mobile:text-lg tablet:text-xl">{userData.phone}</p>
                            ) }
                            { isEditiblePhone ? (
                                <>
                                    { newPhone && (
                                        <div className="flex flex-row items-center space-x-2">
                                            <button onClick={() => (onChangePhone(), setIsEditiblePhone(false))} className="hover:opacity-50">
                                                <IoCloseOutline   className="text-2xl"/>
                                            </button>
                                            <button onClick={() => savePhone()} className="hover:opacity-50">
                                                <FaRegSave  className="text-2xl"/>
                                            </button>
                                        </div>
                                    ) }
                                </>
                            ) : (
                                <button onClick={() => setIsEditiblePhone(true)} className="hover:opacity-50">
                                    <CiEdit className="text-2xl"/>
                                </button>
                            ) }
                        </div>
                    </div>
                    <div className={ isEditibleEmail ? "mobile:w-full laptop:w-[20vw] border-2 border-[#44CD8D] p-2 px-6 rounded-2xl mt-4" : "mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 px-6 rounded-2xl mt-4" }>
                        <p className='text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 -mt-6'>Email</p>
                        <div className="flex flex-row items-center justify-between">
                            { isEditibleEmail ? (
                                <input value={newEmail} onChange={(e) => onChangeEmail(e.target.value)} placeholder={t("profile-page.new-email-placeholder")} className="mobile:text-lg tablet:text-xl outline-none bg-transparent"/>
                            ) : (
                                <p className="mobile:text-lg tablet:text-xl">{userData.email}</p>
                            ) }
                            { isEditibleEmail ? (
                                <>
                                    { newEmail && (
                                        <div className="flex flex-row items-center space-x-2">
                                            <button onClick={() => (onChangeEmail(), setIsEditibleEmail(false))} className="hover:opacity-50">
                                                <IoCloseOutline   className="text-2xl"/>
                                            </button>
                                            <button onClick={() => saveEmail()} className="hover:opacity-50">
                                                <FaRegSave  className="text-2xl"/>
                                            </button>
                                        </div>
                                    ) }
                                </>
                            ) : (
                                <button onClick={() => setIsEditibleEmail(true)} className="hover:opacity-50">
                                    <CiEdit className="text-2xl"/>
                                </button>
                            ) }
                        </div>
                    </div>
                    <div className="mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 rounded-2xl px-6 mt-4">
                        <p className='text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 -mt-6'>{t("profile-page.password")}</p>
                        <div className="flex flex-row w-full items-center justify-between">
                            <p className="mobile:text-lg tablet:text-xl w-full flex-1">**********</p>
                            <button onClick={openChangePassword} className="hover:opacity-50">
                                <CiEdit className="text-2xl"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 space-y-4">
                <div className="flex flex-row space-x-6 items-center">
                    <p className="text-[#000000] mobile:text-xl tablet:text-2xl laptop:text-3xl font-semibold">{t("profile-page.bank-cards-title")}</p>
                    <button onClick={addBankCard} className="flex flex-row space-x-2 items-center hover:opacity-50">
                        <p className="text-[#0D0D0D]/50 text-xl">{t("add-button-title")}</p>
                        <div className="flex items-center justify-center bg-[#44CD8D] h-5 w-5 rounded-full">
                            <p className="text-white text-sm">+</p>
                        </div>
                    </button>
                </div>
                { bankCards.length > 0 ? (
                    <>
                        { bankCards.map((item, index) => (
                            <div key={index} className="w-full p-2 rounded-2xl px-6 border-[#0D0D0D]/20 border-2 flex flex-row justify-between">
                                <p className="mobile:text-lg tablet:text-xl text-[#0D0D0D] font-semibold">{index + 1} {t("card-title")}</p>
                                <div className="flex flex-row space-x-2 items-center">
                                    <p className="mobile:text-lg tablet:text-xl text-[#0D0D0D] font-semibold">{`**** **** **** ${item.number.slice(-4)}`}</p>
                                    { item.isActive === 1 ? (
                                        <div className="w-6 h-6 border-[#0D0D0D]/20 border-2 rounded-full hover:opacity-50 flex justify-center items-center">
                                            { item.isActive === 1 && <div className="bg-[#44CD8D] h-3.5 w-3.5 rounded-full"/> }
                                        </div>
                                    ) : (
                                        <button onClick={() => activateCard(item.id)} className="w-6 h-6 border-[#0D0D0D]/20 border-2 rounded-full hover:opacity-50 flex justify-center items-center"/>
                                    ) }
                                </div>
                            </div>
                        )) }
                    </>
                ) : (
                    <button onClick={addBankCard} className="bg-[#44CD8D] rounded-xl px-4 p-2">
                        <p className="text-xl text-white">{t("add-button-title")}</p>
                    </button>
                ) }
            </div>
            { userData.address && (
                <div className="mt-6 space-y-4">
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-[#000000] mobile:text-xl tablet:text-2xl laptop:text-3xl font-semibold">Адрес</p>
                    </div>
                    <ProfileMap latitude={parseFloat(userData.latitude)} longitude={parseFloat(userData.longitude)}/>
                </div>
            ) }
        </div>
    )
};

export default ProfileInfo;