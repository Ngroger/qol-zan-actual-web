import React, { useState } from 'react';
import { IoMdCheckmark, IoIosArrowBack } from "react-icons/io";
import { useTranslation } from "react-i18next";

function Registration({ onBack, formData, onChange, onNext }) {
    const [isNameFocus, setIsNameFocus] = useState(false);
    const [isLastnameFocus, setIsLastnameFocus] = useState(false);
    const [isPhoneFocus, setIsPhoneFocus] = useState(false);
    const [isEmailFocus, setIsEmailFocus] = useState(false);

    const [isNameError, setIsNameError] = useState(false);
    const [isLastnameError, setIsLastnameError] = useState(false);
    const [isPhoneError, setIsPhoneError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);

    const [isCheckboxError, setIsCheckboxError] = useState(false);

    const [isCheckbox, setIsCheckbox] = useState(false);
    
    const [message, setMessage] = useState();
    const {t} = useTranslation();

    const nextStep = async () => {
        console.log(formData);
        if (!formData.name || !formData.lastname || !formData.phone || !formData.email || !isCheckbox) {
            if (!formData.name) {
                setIsNameError(true);
            } else {
                setIsNameError(false);
            }

            if (!formData.lastname) {
                setIsLastnameError(true);
            } else {
                setIsLastnameError(false);
            }

            if (!formData.phone) {
                setIsPhoneError(true);
            } else {
                setIsPhoneError(false);
            }

            if (!formData.email) {
                setIsEmailError(true);
            } else {
                setIsEmailError(false);
            }

            if (!isCheckbox) {
                setIsCheckboxError(true);
            } else {
                setIsCheckboxError(false);
            }

        } else {
            try {
                const response = await fetch('https://nomadfarm-24.store/api-checkUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ phone: formData.phone, email: formData.email })
                });

                const responseJson = await response.json();

                if (responseJson.success) {
                    setMessage();
                    setIsNameError(false);
                    setIsLastnameError(false);
                    setIsPhoneError(false);
                    setIsEmailError(false);
                    setIsCheckboxError(false);
                    onNext();
                } else {
                    setMessage(responseJson.message);
                }
            } catch {

            }
        }
    };

    return (
        <div>
            <div className='flex flex-row space-x-4'>
                <button onClick={onBack} className='hover:opacity-50 bg-[#EFF3F6]/80 h-7 w-7 rounded-full justify-center items-center flex'>
                    <IoIosArrowBack className='text-xl text-[#44CD8D]'/>
                </button>
                <p className='text-2xl text-[#0D0D0D] font-semibold'>{t("reg-modal.title")}</p>
            </div>
            <div className={ isNameFocus ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6' : ( isNameError ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6' )}>
                <p className={ isNameFocus ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>{t("reg-modal.name")}</p>
                <input value={formData.name} name='name' onChange={onChange} placeholder={t("reg-modal.name-placeholder")} onFocus={() => setIsNameFocus(true)} onBlur={() => setIsNameFocus(false)} className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
            </div>
            { isNameError && <p className='text-[#FF0000] text-lg text-center'>{t("auth-modal.error-message")}</p> }
            
            <div className={ isLastnameFocus ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6' : ( isLastnameError ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6')}>
                <p className={ isLastnameFocus ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>{t("reg-modal.surname")}</p>
                <input value={formData.lastname} name='lastname' onChange={onChange} placeholder={t("reg-modal.surname-placeholder")} onFocus={() => setIsLastnameFocus(true)} onBlur={() => setIsLastnameFocus(false)}  className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
            </div>
            { isLastnameError && <p className='text-[#FF0000] text-lg text-center'>{t("auth-modal.error-message")}</p> }

            <div className={ isPhoneFocus ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6' : ( isPhoneError ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6' )}>
                <p className={ isPhoneFocus ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>{t("reg-modal.phone-number")}</p>
                <input value={formData.phone} name='phone' onChange={onChange} placeholder={t("reg-modal.phone-number-placeholder")} onFocus={() => setIsPhoneFocus(true)} onBlur={() => setIsPhoneFocus(false)} className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
            </div>
            { isPhoneError && <p className='text-[#FF0000] text-lg text-center'>{t("auth-modal.error-message")}</p> }

            <div className={ isEmailFocus ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6' : ( isEmailError ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6')}>
                <p className={ isEmailFocus ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>Email</p>
                <input value={formData.email} name='email' onChange={onChange} placeholder={t("reg-modal.email-placeholder")} onFocus={() => setIsEmailFocus(true)} onBlur={() => setIsEmailFocus(false)}  className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
            </div>

            { isEmailError && <p className='text-[#FF0000] text-lg text-center'>{t("auth-modal.error-message")}</p> }
            <button onClick={nextStep} className='w-full p-3.5 bg-[#44CD8D] items-center justify-center flex rounded-2xl mt-6 hover:opacity-50'>
                <p className='text-white text-xl font-light'>{t("reg-modal.next-button")}</p>
            </button>
            { message && <p className='text-[#FF0000] text-lg text-center mt-4'>{message}</p> }
            <div className='flex flex-row space-x-3 items-center mt-4 justify-center'>
                <button onClick={() => setIsCheckbox(!isCheckbox)} className={ isCheckbox ? 'bg-[#44CD8D] w-7 h-7 rounded-lg flex justify-center items-center hover:opacity-50' : ( isCheckboxError ? 'border-[2.5px] border-[#FF0000] w-7 h-7 rounded-lg flex justify-center items-center hover:opacity-50': 'border-[2.5px] border-[#44CD8D] w-7 h-7 rounded-lg flex justify-center items-center hover:opacity-50') }>
                    <IoMdCheckmark className='text-white text-xl'/>
                </button>
                <p className='text-[#0D0D0D] text-md w-64'>{t("reg-modal.accept-title")}</p>
            </div>
        </div>
    )
};

export default Registration;