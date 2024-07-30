import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function PublicOfferPage() {
    const {t} = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='overflow-x-hidden mt-12'>
            <div className='mt-24 mobile:px-12 lg:px-28 space-y-4 mb-32'>
                <p className='text-2xl font-medium text-[#44CD8D]'>{t("public-offer-page.maintitle1")}</p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title1")}</p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text1")}<br/><br/>

                    {t("public-offer-page.text2")}<br/><br/>

                    {t("public-offer-page.text3")}<br/><br/>

                    {t("public-offer-page.text4")}<br/><br/>

                    {t("public-offer-page.text5")}<br/><br/>

                    {t("public-offer-page.text6")}<br/><br/>

                    {t("public-offer-page.text7")}<br/><br/>

                    {t("public-offer-page.text8")}<br/><br/>

                    {t("public-offer-page.text9")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title2")}</p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text10")}<br/><br/>

                    {t("public-offer-page.text11")}<br/><br/>

                    {t("public-offer-page.text12")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title3")}<br/><br/></p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text13")}<br/><br/>

                    {t("public-offer-page.text14")}<br/><br/>

                    {t("public-offer-page.text15")}<br/><br/>

                    {t("public-offer-page.text16")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title4")}</p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text17")}<br/><br/>

                    {t("public-offer-page.text18")}<br/><br/>

                    {t("public-offer-page.text19")}<br/><br/>

                    {t("public-offer-page.text20")}<br/><br/>

                    {t("public-offer-page.text21")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title5")}</p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text22")}<br/><br/>

                    {t("public-offer-page.text23")}<br/><br/>

                    {t("public-offer-page.text24")}<br/>
                    {t("public-offer-page.text25")}<br/><br/>
                    
                    {t("public-offer-page.text26")}<br/><br/>

                    {t("public-offer-page.text27")}<br/><br/>

                    {t("public-offer-page.text28")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title6")}</p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text29")}<br/><br/>

                    {t("public-offer-page.text30")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title7")}</p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text31")}<br/><br/>

                    {t("public-offer-page.text32")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title8")}</p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text33")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title9")}</p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text34")}<br/><br/>

                    {t("public-offer-page.text35")}<br/><br/>

                    {t("public-offer-page.text36")}<br/><br/>

                    {t("public-offer-page.text37")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title10")}</p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text38")}<br/><br/>

                    {t("public-offer-page.text39")}<br/><br/>

                    {t("public-offer-page.text40")}<br/><br/>

                    {t("public-offer-page.text41")}<br/><br/>

                    {t("public-offer-page.text42")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'> {t("public-offer-page.title11")}</p>
                <p className='text-xl font-medium text-black/25'>
                    {t("public-offer-page.text43")}<br/><br/>

                    {t("public-offer-page.text44")}<br/><br/>

                    {t("public-offer-page.text45")}<br/><br/>

                    {t("public-offer-page.text46")}<br/><br/>

                    {t("public-offer-page.text47")}<br/><br/>

                    {t("public-offer-page.text48")}<br/><br/>
                </p>
                <p className='text-xl font-medium text-[#44CD8D]'>{t("public-offer-page.title12")}</p>
                <p className='text-xl font-medium text-black/25'>
                    ТОО Колжан Маркет<br/>
                    БИН 240340004785<br/>
                    Актюбинская область, г.Актобе, пр.Алии Молдагуловой д 45 кв 93<br/>
                    KZ108562203136507992 в АО "БанкЦентрКредит", БИК KCJBKZKX<br/>
                    hazard1988@inbox.ru,+8 708 627 5934 <br/>
                </p>
            </div>
        </div>
    ) 
};

export default PublicOfferPage;