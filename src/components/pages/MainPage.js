import React, { useEffect, useState } from "react";
import Categories from "../ux/Categories";
import Cards from "../ux/Cards";
import CartoonCategories from "../ux/CartoonCategories";
import Footer from "../ux/Footer";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import queryString from "query-string";

function MainPage() {
    const [data, setData] = useState([]);
    const location = useLocation();
    const { category } = useParams();
    const { t } = useTranslation();
    const queryParams = queryString.parse(location.search);

    useEffect(() => {
        fetchData();
    }, [location.search]);

    const fetchData = async () => {
        const queryParams = queryString.parse(location.search);
        const cat = queryParams.cat;
        const sub = queryParams.sub;
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-getAllProducts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category: cat, subcategory: sub })
            });
            const responseData = await response.json();
            if (response.ok) {
                // Группировка продуктов по полю 'topic'
                const groupedData = groupByTopic(responseData.data);
                setData(groupedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Функция для группировки продуктов по полю 'topic'
    const groupByTopic = (products) => {
        return products.reduce((result, product) => {
            const { topic, ...rest } = product;
            if (!result[topic]) {
                result[topic] = [];
            }
            result[topic].push(rest);
            return result;
        }, {});
    };

    return (
        <div className="mobile:mt-24 tablet:mt-32">
            <Categories clearData={() => setData([])} />
            <div className="w-full flex justify-center items-center flex-col">
                {
                    Object.keys(data).length === 0 ? (
                        <div className="h-[50vh] flex flex-col justify-center items-center">
                            <p className="text-2xl font-semibold text-center">{t("main-page.empty-list-title")}</p>
                            <p className="text-xl text-center">{t("main-page.empty-list-subtitle")}</p>
                        </div>
                    ) : (
                        Object.entries(data).map(([topic, products]) => (
                            <div className="w-10/12" key={topic}>
                                <Cards data={products} title={topic} />
                            </div>
                        ))
                    )
                }
            </div>
            <CartoonCategories clearData={() => setData([])} />
        </div>
    );
}

export default MainPage;
