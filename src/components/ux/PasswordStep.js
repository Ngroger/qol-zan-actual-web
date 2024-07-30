import React, { useState } from 'react';
import { IoMdCheckmark, IoIosArrowBack } from "react-icons/io";

function PasswordStep({ formData, onChange, reg, onBack, regMessage }) {
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [isConfirmPasswordFocus, setIsCofirmPasswordFocus] = useState(false);

    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isConfirmPasswordError, setIsConfrimPasswordError] = useState(false);

    const [isUncorrectPasswords, setIsUncorrectPassword] = useState(false);

    const check = () => {
        if (!formData.password && !formData.confirmPassword) {
            if (!formData.password) {
                setIsPasswordError(true);
            } else {
                setIsPasswordError(false);
            }
            if (!formData.confirmPassword) {
                setIsConfrimPasswordError(true);
            } else {
                setIsConfrimPasswordError(false);
            }
        } else {
            setIsPasswordError(false);
            setIsConfrimPasswordError(false);
            if (formData.password !== formData.confirmPassword) {
                setIsUncorrectPassword(true);
            } else {
                setIsUncorrectPassword(false);
                reg();
            }
        }
    };

    return (
        <div>
            <div className='flex flex-row space-x-4'>
                <button onClick={onBack} className='hover:opacity-50 bg-[#EFF3F6]/80 h-7 w-7 rounded-full justify-center items-center flex'>
                    <IoIosArrowBack className='text-xl text-[#44CD8D]'/>
                </button>
                <p className='text-2xl text-[#0D0D0D] font-semibold'>Регистрация</p>
            </div>
            <div className={ isPasswordFocus ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6' : ( isPasswordError ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6' )}>
                <p className={ isPasswordFocus ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>Пароль</p>
                <input type='password' value={formData.password} name='password' onChange={onChange} placeholder='Введите пароль' onFocus={() => setIsPasswordFocus(true)} onBlur={() => setIsPasswordFocus(false)} className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
            </div>
            { isPasswordError && <p className='text-[#FF0000] text-lg text-center'>Поле обязательно к заполнению</p> }
            <div className={ isConfirmPasswordFocus ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6' : ( isConfirmPasswordError ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6')}>
                <p className={ isConfirmPasswordFocus ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>Подтвердите пароль</p>
                <input type='password' value={formData.confirmPassword} name='confirmPassword' onChange={onChange} placeholder='Введите пароль еще раз' onFocus={() => setIsCofirmPasswordFocus(true)} onBlur={() => setIsCofirmPasswordFocus(false)}  className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
            </div>
            { isConfirmPasswordError && <p className='text-[#FF0000] text-lg text-center'>Поле обязательно к заполнению</p> }
            { isUncorrectPasswords && !isConfirmPasswordError && !isPasswordError && <p className='text-[#FF0000] text-lg text-center'>Пароли не соответствуют</p> }
            <button onClick={check} className='w-full p-3.5 bg-[#44CD8D] items-center justify-center flex rounded-2xl mt-6 hover:opacity-50'>
                <p className='text-white text-xl font-light'>Зарегистрироваться</p>
            </button>
        </div>
    )
};

export default PasswordStep;