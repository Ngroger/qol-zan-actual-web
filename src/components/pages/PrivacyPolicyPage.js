import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function PrivacyPolicyPage() {
    const {t} = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='overflow-x-hidden mt-12'>
            <div className='mt-24 mobile:px-12 lg:px-28 space-y-4 mb-32'>
                <p className='text-4xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.main-title1")}</p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title1")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text1")}<br/><br/>

                    {t('privacy-policy-page.text2')}<br/><br/>

                    {t("privacy-policy-page.text3")}<br/><br/>

                    {t("privacy-policy-page.text4")}<br/><br/>

                    {t("privacy-policy-page.text5")}<br/><br/>

                    {t("privacy-policy-page.text6")}<br/><br/>
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title2")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text7")}<br/><br/>

                    {t("privacy-policy-page.text8")}<br/><br/>
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title3")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text9")}<br/><br/>

                    {t("privacy-policy-page.text10")}<br/><br/>
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.text11")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text12")}<br/><br/>

                    {t("privacy-policy-page.text13")}<br/><br/>
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title4")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text14")}<br/><br/>
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title5")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text15")}<br/><br/>
                    {t("privacy-policy-page.text16")}<br/><br/>
                    {t("privacy-policy-page.text17")}<br/><br/>
                    {t("privacy-policy-page.text18")}<br/><br/>                
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title6")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text19")}<br/><br/>
                    {t("privacy-policy-page.text20")}<br/><br/>
                    {t("privacy-policy-page.text21")}<br/><br/>
                    {t("privacy-policy-page.text22")}<br/><br/>
                    {t("privacy-policy-page.text23")}<br/><br/>
                </p>
                <p className='text-4xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.maintitle2")}</p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title7")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text24")}

                    {t("privacy-policy-page.text25")}

                    {t("privacy-policy-page.text26")}

                    {t("privacy-policy-page.text27")}

                    {t("privacy-policy-page.text28")}

                    {t("privacy-policy-page.text29")}

                    {t("privacy-policy-page.text30")}
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title8")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text31")}
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title9")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text32")}
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title10")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text33")}
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title11")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text34")}
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title12")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text35")}
                </p>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("privacy-policy-page.title13")}</p>
                <p className='text-2xl font-medium text-black/25'>
                    {t("privacy-policy-page.text36")}
                </p>
            </div>
        </div>
    )
};

export default PrivacyPolicyPage;