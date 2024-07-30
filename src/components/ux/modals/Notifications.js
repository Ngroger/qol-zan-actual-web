import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Notifications({ onClose }) {
    const [isNotification, setIsNotification] = useState(true);
    const {t} = useTranslation();
    return (
        <div className="bg-white border-[#EFF3F6] border-2 w-96 rounded-2xl absolute z-10 p-4 shadow-lg flex flex-col">
            <div className="flex flex-row justify-between border-b-2 border-b-[#0D0D0D]/20 items-center pb-2">
                <p className="text-[#0D0D0D] text-xl">{t("notifications-page.notification-title")}</p>
                <button onClick={() => setIsNotification(!isNotification)} className={ isNotification ? "w-[42px] p-1 items-end flex justify-end rounded-full bg-[#44CD8D]/20 hover:opacity-50" : "w-[42px] p-1 items-start flex justify-start rounded-full bg-[#EFF3F6]/50 hover:opacity-50" }>
                    <div className={ isNotification ? "h-4 w-4 rounded-full bg-[#44CD8D]" : "h-4 w-4 rounded-full bg-[#0D0D0D]/20"}/>
                </button>
            </div>
            <div className='mt-2 space-y-2 overflow-x-auto h-[20vh] pr-4 flex flex-col justify-center items-center'>
                <p className='text-lg font-bold text-center'>{t("notifications-page.empty-list-title")}</p>
                <p className='text-md text-center'>{t("notifications-page.empty-list-subtitle")}</p>
            </div>
        </div>
    )
};

export default Notifications;
