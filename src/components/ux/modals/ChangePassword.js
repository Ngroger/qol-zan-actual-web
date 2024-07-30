import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function ChangePassword({ userId, onClose }) {
    const [oldPassword, onChangeOldPassword] = useState();
    const [newPassword, onChangeNewPassowrd] = useState();
    const [confrimPassword, onChangeConfrimPassword] = useState();
    const [messasge, setMessage] = useState();
    const {t} = useTranslation();

    const changePassword = async () => {
        if (newPassword === confrimPassword) {
            setMessage();
            try {
                const response = await fetch("https://nomadfarm-24.store/api-changePassword", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId, oldPassword: oldPassword, newPassword: newPassword })
                });

                const responseJson = await response.json();

                if (responseJson.success) {
                    setMessage();
                    alert(`${t("messages.password-change-success")}`);
                    onClose();
                } else {
                    setMessage(responseJson.message);
                }
            } catch {

            }
        } else {
            setMessage("Пароли не совпадают");
        }
    }

    return (
        <div className="w-screen h-screen justify-center items-center fixed z-[10000] left-0 top-0 bottom-0 right-0 flex">
            <button onClick={onClose} className="w-full h-full absolute z-[100000] bg-black/50"/>
            <div className="bg-white rounded-[40px] mobile:w-10/12 tablet:w-6/12 laptop:w-5/12 desktop:w-3/12 p-8 absolute z-[1000000]">
                <p className="text-black font-bold mobile:text-xl desktop:text-2xl">{t("change-pass-modal.title")}</p>
                <div className="flex flex-col space-y-2 mt-4">
                    <p className="text-black/80 mobile:text-lg laptop:text-lg desktop:text-xl font-bold">{t("change-pass-modal.old-pass-title")}</p>
                    <div className="w-full border-[1px] border-black/20 p-2 px-4 rounded-xl">
                        <input type="password" value={oldPassword} onChange={(e) => onChangeOldPassword(e.target.value)} className="mobile:text-lg laptop:text-lg desktop:text-xl outline-none bg-transparent w-full" placeholder={t("change-pass-modal.old-pass-placeholder")}/>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <p className="text-black/80 mobile:text-lg laptop:text-lg desktop:text-xl font-bold">{t("change-pass-modal.new-pass-title")}</p>
                    <div className="w-full border-[1px] border-black/20 p-2 px-4 rounded-xl">
                        <input type="password" value={newPassword} onChange={(e) => onChangeNewPassowrd(e.target.value)} className="mobile:text-lg laptop:text-lg desktop:text-xl outline-none bg-transparent w-full" placeholder={t("change-pass-modal.new-pass-placeholder")}/>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <p className="text-black/80 mobile:text-lg laptop:text-lg desktop:text-xl font-bold">{t("change-pass-modal.confirm-pass-title")}</p>
                    <div className="w-full border-[1px] border-black/20 p-2 px-4 rounded-xl">
                        <input type="password" value={confrimPassword} onChange={(e) => onChangeConfrimPassword(e.target.value)} className="mobile:text-lg laptop:text-lg desktop:text-xl outline-none bg-transparent w-full" placeholder={t("change-pass-modal.confirm-pass-placeholder")}/>
                    </div>
                </div>
                <button onClick={() => changePassword()} className="hover:opacity-50 p-2 justify-center items-center w-full rounded-xl bg-[#44CD8D] mt-6">
                    <p className="mobile:text-lg tablet:text-xl text-white">{t("code-modal.change-password-button")}</p>
                </button>
                { messasge && <p className="text-red-500 text-center text-lg mt-6">{messasge}</p> }
            </div>
        </div>
    )
};

export default ChangePassword;