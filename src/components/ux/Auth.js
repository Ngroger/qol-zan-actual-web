import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdCheckmark } from "react-icons/io";

function Auth({ onReg, onRecovery }) {
    const [isLoginFocus, setIsLoginFocus] = useState(false);
    const [isPasswordFocus, setIsPasswordFoucs] = useState(false);

    const [login, onChangeLogin] = useState();
    const [password, onChangePassword] = useState();

    const [isLoginError, setIsLoginError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const [isRememberMe, setIsRememberMe] = useState(false);

    const [message, setMessage] = useState();
    const {t} = useTranslation();

    const auth = async () => {
        if (!login && !password) {
            if (!login) {
                setIsLoginError(true);
            } else {
                setIsLoginError(false);
            }
            if (!password) {
                setIsPasswordError(true);
            } else {
                setIsPasswordError(false);
            }
        } else {
            setIsLoginError(false);
            setIsPasswordError(false);
            try {
                const response = await fetch('https://nomadfarm-24.store/api-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ login: login, password: password })
                });
                const data = await response.json();
                if (data.success) {
                    // Регистрация прошла успешно, сохраняем токен в куки
                    setMessage();
                    document.cookie = `auth_token=${data.token}; path=/`;
                    window.location.reload();
                } else {
                    // Регистрация не удалась, вы можете обработать ошибку здесь
                    setMessage(data.message)
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        }
    };

    return (
        <div className=''>
            <p className='text-2xl text-[#0D0D0D] font-semibold'>{t("auth-modal.title")}</p>
            <div className={ isLoginFocus ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6' : ( isLoginError ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6' )}>
                <p className={ isLoginFocus ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>{t("auth-modal.login-title")}</p>
                <input value={login} onChange={e => onChangeLogin(e.target.value)} placeholder={t("auth-modal.login-placeholder")} onFocus={() => setIsLoginFocus(true)} onBlur={() => setIsLoginFocus(false)} className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
            </div>
            { isLoginError && <p className='text-[#FF0000] text-lg text-center'>{t("auth-modal.error-message")}</p> }
            <div className={ isPasswordFocus ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6' : ( isPasswordError ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6')}>
                <p className={ isPasswordFocus ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>{t("auth-modal.password-title")}</p>
                <input type='password' value={password} onChange={e => onChangePassword(e.target.value)} placeholder={t("auth-modal.password-placeholder")} onFocus={() => setIsPasswordFoucs(true)} onBlur={() => setIsPasswordFoucs(false)}  className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
            </div>
            { isPasswordError && <p className='text-[#FF0000] text-lg text-center'>{t("auth-modal.error-message")}</p> }
            <button onClick={auth} className='w-full p-3.5 bg-[#44CD8D] items-center justify-center flex rounded-2xl mt-6 hover:opacity-50'>
                <p className='text-white text-xl font-light'>{t("auth-modal.login-button")}</p>
            </button>
            <button onClick={onRecovery} className='w-full p-1 items-center justify-center flex rounded-2xl mt-2 hover:opacity-50'>
                <p className='text-[#0D0D0D] text-xl font-light'>{t("auth-modal.password-recovery-button")}</p>
            </button>
            { message && <p className='text-[#FF0000] text-lg text-center'>{message}</p> }
            <div className='flex flex-row space-x-3 items-center mt-4'>
                <button onClick={() => setIsRememberMe(!isRememberMe)} className={ isRememberMe ? 'bg-[#44CD8D] w-7 h-7 rounded-lg flex justify-center items-center hover:opacity-50' : 'border-[2.5px] border-[#44CD8D] w-7 h-7 rounded-lg flex justify-center items-center hover:opacity-50' }>
                    <IoMdCheckmark className='text-white text-xl'/>
                </button>
                <p className='text-[#0D0D0D] text-xl'>{t("auth-modal.remember-me-button")}</p>
            </div>
            <p className='mobile:text-md tablet:text-lg text-center text-[#0D0D0D] mt-4 w-full'>{t("auth-modal.do-you-have-account")} <span onClick={onReg} className='text-[#2D9AFF] hover:opacity-50 cursor-pointer'>{t("auth-modal.create-account")}</span></p>
        </div>
    )
};

export default Auth;