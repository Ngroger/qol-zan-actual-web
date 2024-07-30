import Cards from '../ux/Cards';
import { IoIosArrowBack } from 'react-icons/io';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function CategoriesPage() {
    const [subCategoriesOpen, setSubCategoriesOpen] = useState(null);
    const [subCategory, setSubCategory] = useState();

    const handleCategoryClick = (index, title) => {
        if (subCategoriesOpen === index) {
            setSubCategoriesOpen(null);
            setSubCategory(null)
        } else {
            setSubCategoriesOpen(index);
            setSubCategory(title)
        }
    };

    const categories = [
        { id: 1, title: 'Овощи & фрукты', subCategories: ['Свежие овощи', 'Экзотические фрукты', 'Сушеные фрукты'] },
        { id: 2, title: 'Молочные Продукты & Яйца', subCategories: ['Молоко', 'Сливки', 'Кисломолочные продукты'] },
        { id: 3, title: 'Мясо & Птица & Рыба', subCategories: ['Говядина', 'Курица', 'Лосось'] },
        { id: 4, title: 'Зерновые & мучные изделия', subCategories: ['Хлеб', 'Макароны', 'Кукурузные хлопья'] },
        { id: 5, title: 'Продукты для заботы о себе', subCategories: ['Косметика', 'Витамины', 'Массажные масла'] },
        { id: 6, title: 'Соусы и консервация', subCategories: ['Помидорный соус', 'Фруктовое варенье', 'Оливки'] },
        { id: 7, title: 'Мясо & Птица & Рыба', subCategories: ['Свинина', 'Утка', 'Форель'] },
        { id: 8, title: 'Здоровое питание & Детское питание', subCategories: ['Злаки', 'Фруктовые пюре', 'Детские витамины'] },
    ];
    
    return (
        <div className='mt-28'>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-10/12 flex flex-row items-center justify-between">
                    <div className='flex flex-row space-x-4'>
                        { subCategoriesOpen !== null ? (
                            <button onClick={() => (setSubCategoriesOpen(null), setSubCategory(null))} className='hover:opacity-50 bg-[#EFF3F6]/80 h-7 w-7 rounded-full justify-center items-center flex'>
                                <IoIosArrowBack className='text-xl text-[#44CD8D]'/>
                            </button>
                        ) : (
                            <Link to='/' className='hover:opacity-50 bg-[#EFF3F6]/80 h-7 w-7 rounded-full justify-center items-center flex'>
                                <IoIosArrowBack className='text-xl text-[#44CD8D]'/>
                            </Link>
                        ) }
                        <p className='text-2xl text-[#0D0D0D] font-semibold'>{ subCategory ? subCategory : 'Категории'}</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-row justify-center items-center mt-4 flex-wrap">
                {subCategoriesOpen == null && categories.map((category, index) => (
                    <button key={index} onClick={() => handleCategoryClick(index, category.title)} className="flex flex-col justify-center items-center space-y-1 hover:opacity-50 m-2">
                        <img className='w-14 h-14 object-contain rounded-xl' src={require(`../../img/categories/CartoonCategory (${category.id}).png`)}/>
                        <p className='text-center flex-nowrap text-[#0D0D0D] w-24'>{category.title}</p>
                    </button> 
                ))}
                
            </div>
            <div className="flex flex-col">
                {subCategoriesOpen !== null && categories[subCategoriesOpen]?.subCategories.map((subCategory, index) => (
                    <button key={index} className="flex flex-row group hover:bg-[#44CD8D] py-4 px-10 items-center space-x-2">
                        <p className='text-2xl text-[#0D0D0D] group-hover:text-white'>{subCategory}</p>
                    </button>
                ))}
            </div>
            {/* <Cards title="Похоже на то, что вы смотрели"/> */}
        </div>
    )
};

export default CategoriesPage;