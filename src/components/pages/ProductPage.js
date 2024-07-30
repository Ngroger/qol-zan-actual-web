import { LuHeart, LuUser2  } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { IoCopyOutline, IoStar } from "react-icons/io5";
import { SlQuestion } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa";
import Card from "../ux/Card";
import Comment from "../ux/Comments";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "../ux/Cards";
import AboutCustomer from "../ux/modals/AboutCustomer";
import ReviewWarningModal from "../ux/modals/ReviewWarningModal";
import WriteReview from "../ux/modals/WriteReview";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";
import categoriesData from '../../json/categories.json';
import ReactLoading from 'react-loading';

function Product() {
    const [data, setData] = useState([]);
    const [similiarProducts, setSimiliarProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const [photoPreview, setPhotoPreview] = useState();
    const [averageRating, setAverageRating] = useState();
    const [totalReviews, setTotalReviews] = useState();
    const [isOpenAboutCustomer, setIsOpenAboutCustomer] = useState(false);
    const [isOpenReviewWarningModal, setIsOpenReviewWarningModal] = useState(false);
    const [isOpenWriteReview, setIsOpenWriteReview] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);
    const {t} = useTranslation();
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const handleCopy = (text) => {
        console.log(text);
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000); // Скрываем сообщение через 2 секунды
            })
            .catch((error) => {
                console.error('Error copying to clipboard:', error);
            });
    };
    

    useEffect(() => {
        fetchUserInfo();
    }, [id]);

    const fetchUserInfo = async () => {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-getUserInfo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Устанавливаем токен в заголовке Authorization
                }
            });

            const responseJson = await response.json();

            if (responseJson.success) {
                setUserData(data.user);
            }
            fetchData();
            fetchIsFavourite();
            fetchSimiliarProducts();
        } catch {

        } finally {
            setIsLoading(false);
        }
    }

    const fetchIsFavourite = async () => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-isFavourite/${data.id}/${userData.id}`);

            const responseJson = await response.json();

            if (response.ok) {
                setIsFavourite(responseJson.isFavourite);
            }
        } catch {

        }
    };

    const addCartItem = async () => {
        const data = {
            productId: data.id,
            title: data.title,
            description: data.description,
            cost: data.newCost,
            oldCost: data.oldCost,
            count: '1', // Предполагаем, что добавляем один товар
            photoPreview: data.photoPreview1, // Предполагаем, что используем первый вариант фото
            userId: userData.id // Подставьте соответствующий идентификатор пользователя
        };

        console.log(data);

        try {
            const response = await fetch('https://nomadfarm-24.store/api-addCartItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseJson = await response.json();
            if (responseJson.success) {
                // window.location.reload();
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`https://nomadfarm-24.store/api-getProductInfo/${id}`);
            const responseJson = await response.json();
            if (response.ok) {
                setData(responseJson.productInfo[0]);
                setPhotoPreview(responseJson.productInfo[0].photoPreview1);
                setAverageRating(responseJson.averageRating);
                setTotalReviews(responseJson.totalReviews);
            } 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const fetchSimiliarProducts = async () => {
        try {
            const response = await fetch('https://nomadfarm-24.store/api-getAllProducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category: 'all' })
            });
            const responseData = await response.json();
            if (response.ok) {
                setSimiliarProducts(responseData.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

        // Преобразование averageRating в число с плавающей точкой и округление до меньшего целого
    const rating = Math.floor(parseFloat(averageRating));

    // Создание массива из 5 элементов для рендеринга звезд
    const stars = Array.from({ length: 5 }, (_, index) => (
        <IoStar key={index} className={`text-3xl ${index < rating ? 'text-[#FCD535]' : 'text-[#0D0D0D]/20'}`} />
    ));

    const handleFavourite = async () => {
        if (isFavourite) {
            const response = await fetch('https://nomadfarm-24.store/api-deleteFavourite', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderId: data.id, userId: userData.id })
            });

            const responseJson = await response.json();
        } else {
            const response = await fetch('https://nomadfarm-24.store/api-addFavourite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderId: data.id, userId: userData.id })
            });

            const responseJson = await response.json();
        }
    };

    return (
        <>
            { isLoading && (
                <div className="w-screen h-screen bg-[#44CD8D] flex justify-center items-center absolute z-[1000000]">
                    <ReactLoading type="spin" color="#FFF" height={25} width={25} />
                </div>
            ) }
            { !isLoading && (
                <div className="relative mt-8">
                    <div className="w-full h-full mobile:px-6 tablet:px-12 laptop:px-16 desktop:px-40 mt-28">
                        <p className="text-xl">
                            <button onClick={() => navigate('/main?cat=all')} className="hover:text-[#44CD8D]">{t('main-title')}</button>
                            { data.ruCategoryName && (
                                <>
                                    <IoIosArrowForward className="inline-block text-[#] mx-2" />
                                    <button onClick={() => navigate(`/main?cat=${data.category}`)} className="hover:text-[#44CD8D]">{t(`subcategories.${data.category}`)}</button>
                                </>
                            ) }
                            { data.ruSubcategoryName && (
                                <>
                                    <IoIosArrowForward className="inline-block text-[#] mx-2" />
                                    <button onClick={() => navigate(`/main?cat=${data.category}&sub=${data?.subcategory}`)} className="hover:text-[#44CD8D]">{t(`subSubcategories.${data.subcategory}`)}</button>
                                    
                                </>
                            ) }
                        </p>
                        <div className="flex mobile:flex-col desktop:flex-col desktop2:flex-row desktop:space-x-4 mt-6">
                            <div className="flex mobile:flex-col desktop:flex-col desktop2:flex-row desktop:space-x-2 mobile:h-[350px] tablet:h-[500px]">
                                <div className="mobile:hidden desktop2:block desktop:hidden space-y-2 px-2 overflow-y-auto h-full">
                                    <img onClick={() => setPhotoPreview(data.photoPreview1)} src={`http://nomadfarm-24.store/api-productImage/${data.photoPreview1}`} className="bg-[#BDBDBD] rounded-xl w-[155px] h-[170px] hover:opacity-50 object-cover"/>
                                    <img onClick={() => setPhotoPreview(data.photoPreview2)} src={`http://nomadfarm-24.store/api-productImage/${data.photoPreview2}`} className="bg-[#BDBDBD] rounded-xl w-[155px] h-[170px] hover:opacity-50 object-cover"/>
                                    <img onClick={() => setPhotoPreview(data.photoPreview3)} src={`http://nomadfarm-24.store/api-productImage/${data.photoPreview3}`} className="bg-[#BDBDBD] rounded-xl w-[155px] h-[170px] hover:opacity-50 object-cover"/>
                                    <img onClick={() => setPhotoPreview(data.photoPreview4)} src={`http://nomadfarm-24.store/api-productImage/${data.photoPreview4}`} className="bg-[#BDBDBD] rounded-xl w-[155px] h-[170px] hover:opacity-50 object-cover"/>
                                    <img onClick={() => setPhotoPreview(data.photoPreview5)} src={`http://nomadfarm-24.store/api-productImage/${data.photoPreview5}`} className="bg-[#BDBDBD] rounded-xl w-[155px] h-[170px] hover:opacity-50 object-cover"/>
                                </div>
                                <img src={`http://nomadfarm-24.store/api-productImage/${photoPreview}`} className="bg-[#BDBDBD] rounded-xl mobile:w-full desktop:w-full desktop2:w-[500px] h-full object-cover"/>
                                <div className="mobile:flex desktop:flex desktop2:hidden flex-row space-x-2 justify-center items-center mt-4">
                                    <button className="w-2.5 h-2.5 rounded-full bg-[#44CD8D]"/>
                                    <button className="w-2.5 h-2.5 rounded-full bg-[#44CD8D]/20 hover:opacity-50"/>
                                    <button className="w-2.5 h-2.5 rounded-full bg-[#44CD8D]/20 hover:opacity-50"/>
                                    <button className="w-2.5 h-2.5 rounded-full bg-[#44CD8D]/20 hover:opacity-50"/>
                                    <button className="w-2.5 h-2.5 rounded-full bg-[#44CD8D]/20 hover:opacity-50"/>
                                </div>
                            </div>
                            <div>
                                { reviews.length > 0 ? (
                                    <div className="mobile:flex desktop:flex desktop2:hidden flex-row justify-between items-center mb-2 mt-1">
                                        <div className="flex flex-row space-x-3 items-center">
                                            <IoStar className="text-3xl text-[#FFE55A]"/>
                                            <p className="text-[#000000] font-medium text-2xl">4.8</p>
                                            <p className="text-[#000000]/40 text-xl">531 оценок</p>
                                        </div>
                                        <button onClick={ userData ? () => handleFavourite() : () => alert(`${t("messages.please-auth")}`) } className="bg-[#EFF3F6]/80 p-3.5 flex justify-center items-center rounded-xl hover:opacity-50">
                                            { isFavourite ? (
                                                <FaHeart className="text-[#44CD8D] text-sm"/>
                                            ) : (
                                                <LuHeart className="text-[#464646]/80 text-sm"/>
                                            ) }
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mobile:flex desktop:flex desktop2:hidden flex-row justify-between items-center mb-2 mt-1">
                                        <div className="flex flex-row space-x-3 items-center">
                                            <IoStar className="text-3xl text-[#0D0D0D]/20"/>
                                            <p className="text-[#000000] font-medium text-2xl">0.0</p>
                                            <p className="text-[#000000]/40 text-xl">- оценок</p>
                                        </div>
                                        <button onClick={ userData ? () => handleFavourite() : () => alert(`${t("messages.please-auth")}`) } className="bg-[#EFF3F6]/80 p-3.5 flex justify-center items-center rounded-xl hover:opacity-50">
                                            { isFavourite ? (
                                                <FaHeart className="text-[#44CD8D] text-sm"/>
                                            ) : (
                                                <LuHeart className="text-[#464646]/80 text-sm"/>
                                            ) }
                                        </button>
                                    </div>
                                ) }
                                <p className="text-[#0D0D0D] text-3xl dekstop2:w-96">{data.title}</p>
                                <div className="border-[#EFF3F6] border-2 rounded-xl p-4 w-[395px] desktop2:flex mobile:hidden flex-col justify-center mt-4">
                                    <div className="flex flex-row space-x-2 items-center">
                                        <p className="text-[#0D0D0D] mobile:text-xl tablet:text-2xl font-bold">{data.newCost} тг</p>
                                        { data.oldCost && <p className="text-[#0D0D0D]/50 mobile:text-md tablet:text-xl font-normal line-through">{data.oldCost} тг</p> }
                                    </div>
                                    <div className="flex-row space-x-3 items-center mt-2 flex">
                                        <button className="bg-[#44CD8D] py-2.5 px-8 flex justify-center items-center rounded-xl hover:opacity-50">
                                            <p className="text-white text-xl">Купить</p>
                                        </button>
                                        <button onClick={ userData ? () => addCartItem() : () => alert(`${t("messages.please-auth")}`) } className="bg-[#EFF3F6]/80 py-2.5 px-8 flex justify-center items-center rounded-xl hover:opacity-50">
                                            <p className="text-[#0D0D0D]/80 text-xl">В корзину</p>
                                        </button>
                                        <button onClick={ userData ? () => handleFavourite() : () => alert(`${t("messages.please-auth")}`) } className="bg-[#EFF3F6]/80 p-3.5 flex justify-center items-center rounded-xl hover:opacity-50">
                                            { isFavourite ? (
                                                <FaHeart className="text-[#44CD8D] text-sm"/>
                                            ) : (
                                                <LuHeart className="text-[#464646]/80 text-sm"/>
                                            ) }
                                        </button>
                                    </div>
                                </div>
                                <p className="text-[#0D0D0D] text-xl desktop2:w-[532px] mt-4">{data.description}</p>
                                <div className="flex flex-row space-x-4 mt-2">
                                    <p className="text-[#0D0D0D]/50 text-xl">{t("cart-page.articule")}</p>
                                    <div className="flex flex-row items-center space-x-2">
                                        <p className="text-[#0D0D0D]/50 text-xl">{data.articule}</p>
                                        <button onClick={() => handleCopy(data.articule)} className="mobile:hidden tablet:block hover:opacity-50">
                                            <IoCopyOutline className="text-[#0D0D0D]/50 text-xl"/>
                                        </button>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-row space-x-4 mt-2">
                                    <p className="text-[#0D0D0D]/50 text-xl">{t("cart-page.customer")}</p>
                                    <div className="flex flex-row items-center space-x-2">
                                        <p className="text-[#0D0D0D]/50 text-xl">{data.costumer}</p>
                                        <button onClick={() => setIsOpenAboutCustomer(true)} className="hover:opacity-50">
                                            <SlQuestion className="text-[#0D0D0D]/50 text-xl"/>
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="mobile:hidden desktop2:flex flex-row w-full items-center justify-between mt-4">
                            <div className="flex flex-col space-y-1">
                                <div className="flex flex-row space-x-2 items-center">
                                    <p className="text-3xl text-[#000000] font-semibold">0.0</p>
                                    {stars}
                                    <p className="text-[#000000]/20 text-xl">- отзывов</p>
                                </div>
                            </div>
                            {/* <button onClick={() => setIsOpenWriteReview(true)} className="flex flex-row space-x-2 hover:opacity-50 items-center">
                                <FaRegEdit className="text-[#0D0D0D]/80 text-xl"/>
                                <p className="text-[#0D0D0D]/80 text-xl">Написать отзыв</p>
                            </button> */}
                        </div>
                        {/* <div className="flex flex-row items-center overflow-y-auto space-x-6 mt-6 pb-6">
                            { reviews.map((item, index) => (
                                <Comment data={item}/>
                            )) }
                        </div> */}
                        <div className="w-full">
                            <Cards data={similiarProducts} title="Похожий товар"/>
                        </div>
                    </div>
                    <div className="desktop2:hidden mobile:block w-full z-[100000] bottom-0 fixed">
                        <div className="w-full flex flex-row items-center bg-[#FFF] p-3 justify-between">
                            <div className="flex flex-row items-center space-x-4">
                                <button className="bg-[#44CD8D] py-2.5 tablet:px-6 mobile:px-3 desktop:px-8 flex justify-center items-center rounded-xl hover:opacity-50">
                                    <p className="text-white mobile:text-lg tablet:text-3xl  laptop:text-3xl desktop:text-3xl">{t("cart-page.buy-button")}</p>
                                </button>
                                <button className="bg-[#EFF3F6]/80 py-2.5 tablet:px-6 mobile:px-3 desktop:px-8 flex justify-center items-center rounded-xl hover:opacity-50">
                                    <p className="text-[#0D0D0D]/80 mobile:text-lg tablet:text-3xl laptop:text-3xl desktop:text-3xl">{t("cart-page.cart-button")}</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    { isOpenAboutCustomer && <AboutCustomer customerId={data.costumerId} onClose={() => setIsOpenAboutCustomer(false)}/> }
                    { isOpenReviewWarningModal && <ReviewWarningModal onClose={() => setIsOpenReviewWarningModal(false)}/> }
                    { isOpenWriteReview && <WriteReview title={data.title} onClose={() => setIsOpenWriteReview(false)}/> }
                </div>
            ) }
        </>
    )
};

export default Product;