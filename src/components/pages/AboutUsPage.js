import { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

function AboutUsPage() {
    const {t} = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='overflow-x-hidden mt-12'>
            <div className='mt-24 mobile:px-12 lg:px-28 space-y-4 mb-32 flex flex-col'>
                <p className="text-2xl font-bold w-full text-[#0d0d0d] uppercase">
                    <Trans
                        i18nKey="about-us-page.main-title1"
                        components={{ highlight: <span className="text-[#44cd8d]" /> }}
                    />
                </p>
                <p className="text-2xl font-bold w-full text-[#0d0d0d] uppercase">
                    <Trans
                        i18nKey="about-us-page.main-title2"
                        components={{ highlight: <span className="text-[#44cd8d]" /> }}
                    />
                </p>
                <div className="flex flex-col">
                    <p className="text-2xl text-[#0d0d0d] font-bold">{t("about-us-page.title-1")}</p>
                    <div className="flex mobile:flex-col mobile:space-y-2 laptop:space-y-0 laptop:flex-row justify-between mt-2">
                        <p className="text-xl text-[#0d0d0d] mobile:w-full laptop:w-5/12">{t("about-us-page.text-1")}</p>
                        <p className="text-xl text-[#0d0d0d] mobile:w-full laptop:w-5/12">{t("about-us-page.text-2")}</p>
                    </div>
                </div>
                <img className="w-full h-[50vh] object-cover my-6 rounded-2xl" src={require("../../img/Lanscape.png")}/>
                <div className="flex flex-col">
                    <p className="text-2xl text-[#0d0d0d] font-bold">{t("about-us-page.title-2")}</p>
                    <div className="flex mobile:flex-col laptop:flex-row justify-between mt-2 mobile:space-y-4 laptop:space-y-0">
                        <div className="mobile:w-full laptop:w-5/12 space-y-1">
                            <p className="text-5xl font-bold text-[#44cd8d]">01</p>
                            <p className="text-xl text-[#0d0d0d]">{t("about-us-page.text-3")}</p>
                        </div>
                        <div className="mobile:w-full laptop:w-5/12 space-y-1">
                            <p className="text-5xl font-bold text-[#44cd8d]">02</p>
                            <p className="text-xl text-[#0d0d0d]">{t("about-us-page.text-4")}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-2xl text-[#0d0d0d] font-bold">{t("about-us-page.title-3")}</p>
                    <div className="flex mobile:flex-col laptop:flex-row justify-between mt-2 mobile:space-y-4 laptop:space-y-0">
                        <div className="mobile:w-full laptop:w-5/12 space-y-1">
                            <p className="text-5xl font-bold text-[#44cd8d]">03</p>
                            <p className="text-xl text-[#0d0d0d]">{t("about-us-page.text-5")}</p>
                        </div>
                        <div className="mobile:w-full laptop:w-5/12 space-y-1">
                            <p className="text-5xl font-bold text-[#44cd8d]">04</p>
                            <p className="text-xl text-[#0d0d0d]">{t("about-us-page.text-6")}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-2xl text-[#0d0d0d] font-bold">{t("about-us-page.title-4")}</p>
                    <div className="flex mobile:flex-col laptop:flex-row justify-between mt-2 mobile:space-y-4 laptop:space-y-0">
                        <div className="mobile:w-full laptop:w-5/12 space-y-1">
                            <p className="text-5xl font-bold text-[#44cd8d]">05</p>
                            <p className="text-xl text-[#0d0d0d]">{t("about-us-page.text-7")}</p>
                        </div>
                        <div className="mobile:w-full laptop:w-5/12 space-y-1">
                            <p className="text-5xl font-bold text-[#44cd8d]">06</p>
                            <p className="text-xl text-[#0d0d0d]">{t("about-us-page.text-8")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
};

export default AboutUsPage;
