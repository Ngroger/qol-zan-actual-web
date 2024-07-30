import React, { useState } from 'react';
import Auth from '../Auth';
import Registration from '../Registration';
import PasswordStep from '../PasswordStep';
import PassRecovery from '../PassRecovery';

function AuthModal({ onClose }) {
    const [method, setMethod] = useState('auth');

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [regMessage, setRegMessage] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };    
    
    const reg = async () => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                // Регистрация прошла успешно, сохраняем токен в куки
                document.cookie = `auth_token=${data.auth_token}; path=/`;
                window.location.reload();
                setRegMessage();
            } else {
                // Регистрация не удалась, вы можете обработать ошибку здесь
                setRegMessage(data.message);
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };

    return (
        <div className='fixed w-screen top-0 h-screen justify-center items-center flex'>
            <button className="bg-black/50 w-full h-full absolute z-10" onClick={onClose} />
            <div className='bg-white mobile:p-6 tablet:p-8 laptop:p-10 rounded-[40px] mobile:w-10/12 tablet:w-6/12 laptop:w-5/12 desktop:w-4/12 desktop2:w-3/12 absolute z-50'>
                { method === 'auth' && <Auth onRecovery={() => setMethod('recovery')} onReg={() => setMethod('reg')}/> }
                { method === 'reg' && <Registration formData={formData} onChange={handleChange} onNext={() => setMethod('pass')}  onBack={() => setMethod('auth')}/> }
                { method === 'pass' && <PasswordStep formData={formData} onChange={handleChange} onBack={() => setMethod('reg')} reg={reg} regMessage={regMessage}/> }
                { method === 'recovery' && <PassRecovery onAuth={() => setMethod('auth')}/> }
            </div>
        </div>
    )
};

export default AuthModal;
