import { HiOutlinePlus } from "react-icons/hi";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import '../../../test.css'
import { useTranslation } from "react-i18next";


function AddressModal({ onClose }) {
    const [isFocus, setIsFocus] = useState(false);
    const [address, onChangeAddress] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [userData, setUserData] = useState(null);
    const {t} = useTranslation();

    useEffect(() => {
        fetchUserInfo();
    }, [])

    const handleFocus = () => {
        setIsFocus(true);
    };

    const handleBlur = () => {
        setIsFocus(false);
    };

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
            } else {
                // Обработка ошибки, если не удалось получить информацию о пользователе
            }
        })
        .catch(error => {
            // Обработка ошибки запроса
        });
    }

    const saveAddress = async () => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-updateUserAddress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ address: address, userId: userData.id, latitude: latitude, longitude: longitude })
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                window.location.reload();
            }

        } catch {
            
        }
    }

    const getAddressFromGeolocation = () => {
        if (navigator.geolocation) {
            // Запрашиваем доступ к местоположению пользователя
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
    
                    // Отправляем запрос к службе обратного геокодирования для определения адреса
                    try {
                        const apiKey = "AIzaSyAoeJsYR20gUXEXBtXDM49xoNYByvFAbZg";
                        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
                        const response = await axios.get(geocodeUrl);
    
                        if (response.data.results && response.data.results.length > 0) {
                            const formattedAddress = response.data.results[0].formatted_address;
                            console.log("Formatted Address:", formattedAddress);
    
                            // Обновляем состояния с полученными значениями
                            setLatitude(latitude);
                            setLongitude(longitude);
                            onChangeAddress(formattedAddress);
                            saveAddress();
                        } else {
                            console.error("Unable to retrieve address from geolocation.");
                        }
                    } catch (error) {
                        console.error("Error retrieving address from geolocation:", error);
                    }
                },
                (error) => {
                    console.error("Error retrieving geolocation:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="w-screen h-screen justify-center items-center fixed z-[10000] left-0 top-0 bottom-0 right-0 flex">
            <button onClick={onClose} className="w-full h-full absolute z-[100000] bg-black/50"/>
            <div className="bg-white rounded-[40px] flex flex-col space-y-4 mobile:w-10/12 tablet:w-6/12 laptop:w-5/12 desktop:w-4/12 desktop2:w-3/12 p-8 absolute z-[1000000]">
                <p className="text-black font-bold laptop:text-xl dekstop:text-2xl">{t("address-modal.title")}</p>
                <div className="space-y-1 relative">
                    <p className="text-[#0D0D0D] laptop:text-lg desktop:text-xl">{t("address-modal.subtitle")}</p>
                    <div className={ setIsFocus ? "border-2 border-[#44CD8D] p-2 px-4 rounded-xl" : "border-2 border-[#0D0D0D]/20 p-2 px-4 rounded-xl" }>
                        <Autocomplete
                            style={{ width: '100%' }}
                            className="w-full outline-none laptop:text-lg desktop:text-xl"
                            apiKey={"AIzaSyAoeJsYR20gUXEXBtXDM49xoNYByvFAbZg"}
                            lang="kk"
                            language="kk"
                            onPlaceSelected={(place) => {
                                console.log(place); // Выводим все данные, чтобы увидеть структуру объекта
                                
                                const latitude = place.geometry.location.lat();
                                const longitude = place.geometry.location.lng();
                        
                                setLatitude(latitude);
                                setLongitude(longitude);
                                onChangeAddress(place.formatted_address);
                                console.log("address", place.formatted_address)
                                console.log("Latitude:", latitude);
                                console.log("Longitude:", longitude);
                            }}
                        />
                    </div>
                </div>
                <button onClick={() => saveAddress()} className="w-full p-3 justify-center items-center flex rounded-xl bg-[#44CD8D] hover:opacity-50">
                    <p className="laptop:text-lg desktop:text-xl text-white">{t("address-modal.save-address")}</p>
                </button>
                <button onClick={() => getAddressFromGeolocation()} className="w-full p-3 justify-center items-center flex rounded-xl bg-[#EFF3F6] hover:opacity-50">
                    <p className="laptop:text-lg desktop:text-xl text-[#0D0D0D]/80">{t("address-modal.geolocation")}</p>
                </button>
            </div>
        </div>
    )
};

export default AddressModal;