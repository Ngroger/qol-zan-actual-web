import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function AboutCustomer({ onClose, customerId }) {
    const { t } = useTranslation();
    const [customerInfo, setCustomerInfo] = useState({});

    useEffect(() => {
        fetchCustomerInfo();
    }, [])

    const fetchCustomerInfo = async () => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-getCustomerInfo/${customerId}`);

            const responseJson = await response.json();

            if (responseJson.success) {
                setCustomerInfo(responseJson.customerInfo[0]);
                console.log("responseJson.customerInfo", responseJson.customerInfo[0]);
            }
        } catch {

        }
    }

    
    return (
        <div className="w-screen h-screen justify-center items-center fixed z-[10000] left-0 top-0 bottom-0 right-0 flex">
            <button onClick={onClose} className="w-full h-full absolute z-[100000] bg-black/50"/>
            <div className="bg-white rounded-[40px] w-96 p-8 absolute z-[1000000]">
                <p className="text-black font-bold text-2xl">{t("about-customer.title")}</p>
                <div className="flex flex-col space-y-4 mt-4">
                    <div className="">
                        <p className="text-xl font-bold">{t("about-customer.shop-name")}</p>
                        <p className="text-xl font-light">{customerInfo?.companyName}</p>
                    </div>
                    <div className="">
                        <p className="text-xl font-bold">{t("about-customer.bin")}</p>
                        <p className="text-xl font-light">{customerInfo?.bin}</p>
                    </div>
                    <div className="">
                        <p className="text-xl font-bold">{t("about-customer.status")}</p>
                        <p className="text-xl font-light">{customerInfo?.statusFacror}</p>
                    </div>
                    <div className="">
                        <p className="text-xl font-bold">{t("about-customer.owner")}</p>
                        <p className="text-xl font-light">{customerInfo?.owner}</p>
                    </div>
                    <div className="">
                        <p className="text-xl font-bold">{t("about-customer.phone-number")}</p>
                        <p className="text-xl font-light">{customerInfo?.contactPhone}</p>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                        <p className="text-xl font-bold">{t("about-customer.verify")} -</p>
                        <p className="text-xl font-bold text-[#44CD8D]">Да</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AboutCustomer;