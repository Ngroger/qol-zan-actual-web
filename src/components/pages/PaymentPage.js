import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function PaymentPage() {
    const {t} = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='overflow-x-hidden mt-12'>
            <div className='mt-24 mobile:px-12 lg:px-28 space-y-4 mb-32'>
                <p className='text-4xl font-medium text-[#44CD8D]'>{t("payments.maintitle1")}</p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("payments.title")}</p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("payments.title1")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("payments.text1")}
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("payments.title2")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("payments.text2")}<br/><br/>

                    {t("payments.text3")}<br/><br/>

                    {t("payments.text4")}<br/><br/>
                </p>
            </div>
        </div>
    ) 
};

export default PaymentPage;
