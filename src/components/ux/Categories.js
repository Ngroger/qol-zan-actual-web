import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import categoriesData from '../../json/categories2.json';
import queryString from "query-string";

function Categories({ clearData }) {
    const { t } = useTranslation();
    const { category } = useParams();
    const location = useLocation();
    const categories = categoriesData.categories;
    const queryParams = queryString.parse(location.search);
    const navigate = useNavigate();

    const [hoveredCategory, setHoveredCategory] = useState(null);

    useEffect(() => {
        console.log(queryParams.cat);
    }, [location.search])

    return (
        <div className="w-full mt-4 flex flex-row justify-center items-center">
            <div className='flex flex-row items-start flex-wrap justify-center'>
                {categories.map((item, index) => (
                    <div 
                        className='group relative' 
                        key={index} 
                        onMouseEnter={() => setHoveredCategory(item.slug)} 
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        <Link 
                            onClick={() => clearData()} 
                            to={`/main?cat=${item.slug}`} 
                            className="flex m-2 flex-col justify-center items-center space-y-1 hover:opacity-50"
                        >
                            <img 
                                className='w-14 h-14 object-contain rounded-xl' 
                                src={require(`../../img/categories/preview/${item.image}`)} 
                                alt={item.slug} 
                            />
                            <p className='text-center text-[#0D0D0D] w-32'>{t(`categories.${item.slug}`)}</p>
                        </Link>
                        {hoveredCategory === item.slug && (
                            <div className='absolute bottom-0 transform translate-y-full p-2 mobile:hidden laptop:flex flex-col z-[10000] bg-white border-[1px] border-[#44CD8D] rounded-xl'>
                                {item.subcategories.map((subItem, subIndex) => (
                                    <button onClick={() => navigate(`/main?cat=${item.slug}&sub=${subItem.slug}`)} key={subIndex} className='hover:bg-[#44CD8D] hover:rounded-xl px-4 py-1'>
                                        <p className='text-lg text-left hover:text-white text-[#0D0D0D]'>{t(`subcategories.${subItem.slug}`)}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Categories;
