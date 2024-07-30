import { CiCamera } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoSearchOutline, IoCartOutline  } from "react-icons/io5";
import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


function BecomeCustomer() {
    const [step, setStep] = useState(2);
    const [state, setState] = useState({
        companyName: "",
        contactPhone: "",
        bin: "",
        address: "",
        entity: "ИП",
        description: ""
    });
    const [isOpenAccrodion, setIsOpenAccordion] = useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
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
                console.log(data.user);
            } else {
                // Обработка ошибки, если не удалось получить информацию о пользователе
            }
        })
        .catch(error => {
            // Обработка ошибки запроса
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const createCustomerAccount = async () => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-createCustomerAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    companyName: state.companyName,
                    contactPhone: state.contactPhone,
                    bin: state.bin,
                    address: state.address,
                    userId: userData.id,
                    owner: `${userData.fullname} ${userData.surname}`,
                    description: state.description,
                    entity: state.entity
                })
            });
            const data = await response.json();

            if (data.success) {
                navigate("/profile/info")
                window.location.reload();
            }
            
        } catch {

        }
    }

    return (
        <div className="mobile:w-11/12 tablet:w-8/12 laptop:w-9/12 desktop:w-8/12 desktop2:w-5/12 mt-4 space-y-3 mb-32">
            { step === 1 && (
                <div className="flex flex-col justify-center items-center">
                    <p className="text-[#000000] mobile:text-xl laptop:text-3xl font-semibold">{t("become-costumer-page.title")}</p>
                    <p className="text-[#000000] mobile:text-md laptop:text-lg mobile:w-64 laptop:w-96">{t("become-costumer-page.subtitle")}</p>
                    <button onClick={() => setStep(2)} className="bg-[#44CD8D] p-3 px-4 mt-4 flex justify-center items-center hover:opacity-50 rounded-2xl">
                        <p className="text-xl text-white">{t("become-costumer-page.become-customer-button")}</p>
                    </button>
                </div>
            ) }
            { step === 2 && (
                <div>
                    <p className="text-[#000000] text-3xl font-semibold">{t("become-costumer-page.create-customer-title")}</p>
                    <div className="w-full mt-4 flex mobile:flex-col laptop:flex-row flex-wrap justify-between">
                        <div className="mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 px-6 rounded-2xl mt-4">
                            <p className='text-[#0D0D0D]/20 text-xl bg-white px-1 absolute z-10 -mt-6'>{t("become-costumer-page.shop-name")}</p>
                            <input
                                className="text-xl text-[#0D0D0D]/80 outline-none bg-transparent"
                                name="companyName"
                                value={state.companyName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 rounded-2xl px-6 mt-4">
                            <p className='text-[#0D0D0D]/20 text-xl bg-white px-1 absolute z-10 -mt-6'>{t("become-costumer-page.contact-phone")}</p>
                            <input
                                className="text-xl text-[#0D0D0D]/80 outline-none bg-transparent"
                                name="contactPhone"
                                value={state.contactPhone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 rounded-2xl px-6 mt-4">
                            <p className='text-[#0D0D0D]/20 text-xl bg-white px-1 absolute z-10 -mt-6'>{t("become-costumer-page.bin")}</p>
                            <input
                                className="text-xl text-[#0D0D0D]/80 outline-none bg-transparent"
                                name="bin"
                                value={state.bin}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 rounded-2xl px-6 mt-4">
                            <p className='text-[#0D0D0D]/20 text-xl bg-white px-1 absolute z-10 -mt-6'>{t("become-costumer-page.address")}</p>
                            <input
                                className="text-xl text-[#0D0D0D]/80 outline-none bg-transparent"
                                name="address"
                                value={state.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <div className={ isOpenAccrodion ? "mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 rounded-tl-2xl rounded-tr-2xl px-6 mt-4 flex flex-row justify-between" : "mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 rounded-2xl px-6 mt-4 flex flex-row justify-between"}>
                                <p className='text-[#0D0D0D]/20 text-xl bg-white px-1 absolute z-10 -mt-6'>{t("become-costumer-page.entity")}</p>
                                <p className="text-xl text-[#0D0D0D]/80 outline-none bg-transparent">{state.entity}</p>
                                { isOpenAccrodion ? (
                                    <button onClick={() => setIsOpenAccordion(false)} className="hover:opacity-50">
                                        <IoIosArrowUp className="text-[#0D0D0D]/20 text-2xl"/>
                                    </button>
                                ) : (
                                    <button onClick={() => setIsOpenAccordion(true)} className="hover:opacity-50">
                                        <IoIosArrowDown className="text-[#0D0D0D]/20 text-2xl"/>
                                    </button>
                                ) }
                            </div>
                            { isOpenAccrodion && (
                                <div className="mobile:w-full laptop:w-[20vw] border-2 border-[#0D0D0D]/20 p-2 rounded-bl-2xl border-t-0 rounded-br-2xl px-6 flex flex-col items-start">
                                    <button className="hover:opacity-50" onClick={() => (setState({ entity: "ИП" }), setIsOpenAccordion(false))}>
                                        <p className="text-xl ">ИП</p>
                                    </button>
                                    <button className="hover:opacity-50" onClick={() => (setState({ entity: "ООО" }), setIsOpenAccordion(false))}>
                                        <p className="text-xl ">ООО</p>
                                    </button>
                                </div>
                            ) }
                        </div>
                        <div className="w-full border-2 border-[#0D0D0D]/20 p-2 rounded-2xl px-6 mt-4">
                            <p className='text-[#0D0D0D]/20 text-xl bg-white px-1 absolute z-10 -mt-6'>{t("become-costumer-page.description")}</p>
                            <textarea 
                                className="text-xl w-full text-[#0D0D0D]/80 outline-none bg-transparent"
                                name="description"
                                value={state.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button onClick={createCustomerAccount} className="bg-[#44CD8D] p-3 px-4 flex justify-center items-center hover:opacity-50 rounded-2xl mt-4">
                        <p className="text-xl text-white">{t("become-costumer-page.create-button")}</p>
                    </button>
                </div>
            ) }
        </div>
    )
};

export default BecomeCustomer;