import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import ReactCodeInput from "react-code-input";
import { useTranslation } from "react-i18next";

function PassRecovery({ onAuth }) {
    const [method, setMethod] = useState('email');
    const [phone, onChangePhone] = useState();
    const [email, onChangeEmail] = useState();

    const [isPhoneFocus, setIsPhoneFocus] = useState(false);
    const [isEmailFocus, setIsEmailFocus] = useState(false);
    
    const [isPhoneError, setIsPhoneError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);

    const [newPassword, onChangeNewPassword] = useState();
    const [isFocusNewPassword, setIsFocusNewPassword] = useState(false);
    const [confirmPassword, onChangeConfirmPassword] = useState();
    const [isFocusConfirmPassword, setIsFocusConfirmPassword] = useState(false);

    const [step, setStep] = useState(1);
    const [code, setCode] = useState();

    const [message, setMessage] = useState();
    const {t} = useTranslation();

    const isMobile = window.innerWidth < 768

    const handleChange = (value) => {
        setCode(value);
    };

    const sendEmail = async () => {
        if(!email) {
            setIsEmailError(true);
        } else {
            setIsEmailError(false);
            try {
                const response = await fetch('https://nomadfarm-24.store/api-passwordRecovery', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ methodRecovery: 'email', recoveryValue: email })
                });
                const data = await response.json();
                if (data.success) {
                    setStep(2);
                    setMessage();
                } else {
                    if (data.message === 'Пользователь с таким email не найден') {
                        setMessage(data.message)
                    } else {
                        setMessage();
                    }
                }
            } catch (error) {
                console.error('Error sending code:', error);
            }
        }
    }

    const sendSms = async () => {
        if(!phone) {
            setIsPhoneError(true);
        } else {
            setIsPhoneError(false);
            
        }
    }

    const sendCode = async () => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-verifyRecoveryCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recoveryCode: code })
            });
            const data = await response.json();
            if (data.success) {
                setMessage();
                setStep(3)
            } else {
                setMessage(data.message)
            }
        } catch (error) {
            console.error('Error sending code:', error);
        }
    };

    const changePassword = async () => {
        if (newPassword === confirmPassword) {
            setMessage();
            try {
                const response = await fetch('https://nomadfarm-24.store/api-updatePassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, newPassword: newPassword  })
                });
    
                const data = await response.json();
                if (data.success) {
                    setMessage()
                    alert(t("messages.password-change-success-two"));
                    onAuth();
                } else {

                }
                
            } catch (error) {
                console.error('Error changed passwod:', error);
            }
        } else {
            setMessage(t("messages.failed-compire-passwords"))
        }
    }
    
    return (
        <div className='space-y-5'>
            { step === 1 && (
                <>
                    <p className='text-2xl text-[#0D0D0D] font-semibold'>{t("pass-recovery-modal.title")}</p>
                    <p className="text-[#0D0D0D] text-lg">{t("pass-recovery-modal.subtitle")}</p>
                    <div className="flex flex-row space-x-2 items-center">
                        <button onClick={() => setMethod('email')} className="w-6 h-6 border-[#0D0D0D]/20 border-2 rounded-full hover:opacity-50 flex justify-center items-center">
                            { method === 'email' && <div className="bg-[#44CD8D] h-3.5 w-3.5 rounded-full"/> }
                        </button>
                        <p className="text-[#0D0D0D] text-lg">{t("pass-recovery-modal.selector")}</p>
                    </div>
                    <p className="text-[#0D0D0D] text-lg">{t("pass-recovery-modal.description")}</p>
                    { method === 'sms' && (
                        <div className={ isPhoneFocus ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6 mb-6' : ( isPhoneError ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6 mb-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6 mb-6' )}>
                            <p className={ isPhoneFocus ? 'text-[#44CD8D] text-xl bg-white px-1 absolute z-10 -mt-7' : 'text-[#0D0D0D]/20 text-xl bg-white px-1 absolute z-10 -mt-7' }>Номер телефона</p>
                            <input value={phone} onChange={e => onChangePhone(e.target.value)} placeholder='Введите номер телефона' onFocus={() => setIsPhoneFocus(true)} onBlur={() => setIsPhoneFocus(false)} className='text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
                        </div>
                    ) }
                    { method === 'email' && (
                        <div className={ isEmailFocus ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6 mb-6' : ( isEmailError ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6 mb-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6 mb-6' )}>
                            <p className={ isEmailFocus ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>Email</p>
                            <input value={email} onChange={e => onChangeEmail(e.target.value)} placeholder={t("reg-modal.email-placeholder")} onFocus={() => setIsEmailFocus(true)} onBlur={() => setIsEmailFocus(false)} className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
                        </div>
                    ) }
                    <button onClick={ method === 'sms' ? sendSms : sendEmail } className='w-full p-3.5 bg-[#44CD8D] items-center justify-center flex rounded-2xl mt-6 hover:opacity-50'>
                        <p className='text-white text-xl font-light'>{t("pass-recovery-modal.next-button")}</p>
                    </button>
                    { message && <p className="text-center text-red-500 text-xl">{message}</p> }
                </>
            ) }
            { step === 2 && (
                <>
                    <p className='text-2xl text-[#0D0D0D] font-semibold'>{t("code-modal.title")}</p>
                    <div className="w-full justify-center items-center flex">
                    <ReactCodeInput
                        fields={6}
                        value={code}
                        onChange={handleChange}
                        inputStyle={{
                            width: isMobile ? '35px' : '50px', // Устанавливаем ширину каждой ячейки
                            height: isMobile ? '35px' : '50px', // Устанавливаем высоту каждой ячейки
                            margin: '5px', // Устанавливаем отступ между ячейками
                            fontSize: '24px', // Размер шрифта в ячейках
                            textAlign: 'center', // Выравнивание текста по центру
                            borderRadius: '10px', // Скругление углов ячеек
                            border: '1px solid #CFCFCF', // Стиль границы ячеек,
                            outline: 'none', // Убираем обводку при фокусе
                            '&:focus': {
                                borderColor: '#44CD8D', // Цвет границы при фокусе
                            },
                        }}
                        autoFocus // Автоматически фокусировать первую ячейку при загрузке
                    />
                    </div>
                    <button onClick={() => sendCode()} className='w-full p-3.5 bg-[#44CD8D] items-center justify-center flex rounded-2xl mt-6 hover:opacity-50'>
                        <p className='text-white text-xl font-light'>{t("code-modal.next-button")}</p>
                    </button>
                    { message && <p className="text-center text-red-500 text-xl">{message}</p> }
                </>
            ) }
            { step === 3 && (
                <>  
                    <p className='text-2xl text-[#0D0D0D] font-semibold'>{t("code-modal.title")}</p>
                    <div className={ isFocusNewPassword ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6 mb-6' : ( isFocusNewPassword ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6 mb-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6 mb-6' )}>
                        <p className={ isFocusNewPassword ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>{t("code-modal.new-password")}</p>
                        <input type="password" value={newPassword} onChange={e => onChangeNewPassword(e.target.value)} placeholder={t("code-modal.new-password-placeholder")} onFocus={() => setIsFocusNewPassword(true)} onBlur={() => setIsFocusNewPassword(false)} className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
                    </div>
                    <div className={ isFocusConfirmPassword ? 'w-full border-[1px] border-[#44CD8D] py-2.5 px-4 rounded-2xl mt-6 mb-6' : ( isFocusConfirmPassword ? 'w-full border-[1px] border-[#FF0000] py-2.5 px-4 rounded-2xl mt-6 mb-6' : 'w-full border-[1px] border-[#0D0D0D]/20 py-2.5 px-4 rounded-2xl mt-6 mb-6' )}>
                        <p className={ isFocusConfirmPassword ? 'text-[#44CD8D] mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' : 'text-[#0D0D0D]/20 mobile:text-lg tablet:text-xl bg-white px-1 absolute z-10 mobile:-mt-6 tablet:-mt-7' }>{t("code-modal.confirm-password")}</p>
                        <input type="password" value={confirmPassword} onChange={e => onChangeConfirmPassword(e.target.value)} placeholder={t("code-modal.confirm-password-placeholder")} onFocus={() => setIsFocusConfirmPassword(true)} onBlur={() => setIsFocusConfirmPassword(false)} className='mobile:text-lg tablet:text-xl text-[#0D0D0D] outline-none bg-transparent w-full'/>
                    </div>
                    <button onClick={() => changePassword()} className='w-full p-3.5 bg-[#44CD8D] items-center justify-center flex rounded-2xl mt-6 hover:opacity-50'>
                        <p className='text-white text-xl font-light'>{t("code-modal.change-password-button")}</p>
                    </button>
                    { message && <p className="text-center text-red-500 text-xl">{message}</p> }
                </>
            ) }
        </div>
    )
};

export default PassRecovery;
