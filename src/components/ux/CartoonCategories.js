import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import categoriesData from '../../json/categories2.json';

function CartoonCategories({ clearData }) {
    const categories = categoriesData.categories;
    const {t} = useTranslation();
    return (
        <div className='w-full flex justify-center items-center mt-12'>
            <div className=" flex flex-row justify-center space-x-12 items-start flex-wrap">
                { categories.map((item, index) => (
                    <Link key={index} onClick={() => clearData()} to={`/main?cat=${item.slug}`} className="flex flex-col justify-center items-center space-y-1 hover:opacity-50 m-2">
                        <img className='w-16 h-16 object-contain' src={require(`../../img/icons/preview/${item.image}`)}/>
                        <p className='text-center text-[#0D0D0D] w-24'>{t(`categories.${item.slug}`)}</p>
                    </Link>
                )) }
            </div>
        </div>
    )
};

export default CartoonCategories;