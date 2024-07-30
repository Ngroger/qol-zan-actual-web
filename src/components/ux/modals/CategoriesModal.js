import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import categoriesData from '../../../json/categories2.json';
import { IoIosArrowBack } from "react-icons/io";

function CategoriesModal({ onClose }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubCategory] = useState(null);
    const [selectedSubSubcategory, setSelectedSubSubcategory] = useState(null);
    const [selectedSlugCategory, setSelectedSlugCategory] = useState();
    const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState();
    const [selectedSubSubcategorySlug, setSelectedSubSubcategorySlug] = useState();
    const { t } = useTranslation();
    const categories = categoriesData.categories;
    const navigate = useNavigate();

    const handleCategoryClick = (caregory, slug) => {
        setSelectedCategory(caregory);
        setSelectedSubSubcategory(null);
        setSelectedSubCategory(null);
        setSelectedSlugCategory(slug);
        navigate(`/main?cat=${slug}`);
    };
    
    const setSubcategory = (subcategory, slug) => {
        setSelectedSubCategory(subcategory);
        setSelectedSubcategorySlug(slug);
        setSelectedSubSubcategory(null);
        navigate(`/main?cat=${selectedSlugCategory}&sub=${slug}`);
        
    }

    const setSubSubcategory = (subSubcategory, slug) => {
        setSelectedSubSubcategory(subSubcategory);
        setSelectedSubSubcategorySlug(slug);
        navigate(`/main?cat=${selectedSlugCategory}&sub=${selectedSubcategorySlug}&subSub=${slug}`);
    };

    const setItem = (slug) => {
        navigate(`/main?cat=${selectedSlugCategory}&sub=${selectedSubcategorySlug}&subSub=${selectedSubSubcategorySlug}&item=${slug}`);
        onClose();
    }

    return (
        <div className='absolute z-[10000] w-screen top-0 h-screen justify-center flex'>
            <button className="bg-black/25 fixed w-full h-full z-[1000000]" onClick={onClose} />
            <div className="bg-white p-3 mobile:w-80 laptop:w-auto rounded-xl fixed top-20 z-[10000000] flex flex-row border-[2px] border-[#44CD8D]">
                <div className={`flex flex-col row-1 categories overflow-y-auto ${selectedCategory ? 'hidden' : 'block'} lg:block pr-3`}>
                    {categories.map((category) => (
                        <button
                            key={category.category}
                            className="flex flex-row items-center space-x-2 p-2.5 px-3.5 group hover:bg-[#44CD8D] hover:w-full hover:rounded-xl"
                            onClick={() => handleCategoryClick(category, category.slug)}
                        >
                            <p className='mobile:text-lg text-left group-hover:text-white laptop:text-lg desktop:text-xl text-[#0D0D0D]'>{t(`categories.${category.slug}`)}</p>
                        </button>
                    ))}
                </div>
                { selectedCategory && (
                    <div className={`flex ${selectedSubcategory ? 'hidden' : 'block'} laptop:block mr-4`}>
                        <button onClick={() => (setSelectedCategory(null), setSelectedSubCategory(null), setSelectedSubSubcategory(null))} className='hover:opacity-50 w-8 h-8 rounded-full bg-[#e8e6e6] justify-center items-center flex'>
                            <IoIosArrowBack className='text-xl text-[#44CD8D]'/>
                        </button>
                    </div>
                ) }
                {selectedCategory && (
                    <div className={`flex ml-2 flex-col row-1 categories overflow-y-auto ${selectedSubcategory ? 'hidden' : 'block'} laptop:block pr-3`}>
                        {selectedCategory.subcategories.map((subcategory) => (
                            <button 
                                key={subcategory.name}
                                className="flex flex-row items-center space-x-2 p-2.5 px-3.5 group hover:bg-[#44CD8D] hover:w-full hover:rounded-xl" 
                                onClick={() => setSubcategory(subcategory, subcategory.slug)}
                            >
                                <p className='mobile:text-lg text-left group-hover:text-white laptop:text-lg desktop:text-xl text-[#0D0D0D]'>{t(`subcategories.${subcategory.slug}`)}</p>
                            </button>
                        ))}
                    </div>
                )}
                { selectedSubcategory && (
                    <div className={`flex ${selectedSubSubcategory ? 'hidden' : 'block'} laptop:block mr-4`}>
                        <button onClick={() => (setSelectedSubCategory(null), setSelectedSubSubcategory(null))} className='hover:opacity-50 w-8 h-8 rounded-full bg-[#e8e6e6] justify-center items-center flex'>
                            <IoIosArrowBack className='text-xl text-[#44CD8D]'/>
                        </button>
                    </div>
                ) }
                { selectedSubcategory && (
                    <div className={`flex ml-2 flex-col row-1 categories overflow-y-auto ${selectedSubSubcategory ? 'hidden' : 'block'} laptop:block pr-3`}>
                        {selectedSubcategory.subSubcategories.map((subcategory) => (
                            <button 
                                key={subcategory.name}
                                className="flex flex-row items-center space-x-2 p-2.5 px-3.5 group hover:bg-[#44CD8D] hover:w-full hover:rounded-xl" 
                                onClick={() => setSubSubcategory(subcategory, subcategory.slug)}
                            >
                                <p className='mobile:text-lg text-left group-hover:text-white laptop:text-lg desktop:text-xl text-[#0D0D0D]'>{t(`subSubcategories.${subcategory.slug}`)}</p>
                            </button>
                        ))}
                    </div>
                ) }
                { selectedSubSubcategory && (
                    <div className='flex mr-4'>
                        <button onClick={() => setSelectedSubSubcategory(null)} className='hover:opacity-50 w-8 h-8 rounded-full bg-[#e8e6e6] justify-center items-center flex'>
                            <IoIosArrowBack className='text-xl text-[#44CD8D]'/>
                        </button>
                    </div>
                ) }
                { selectedSubSubcategory && (
                    <div className="flex ml-2 flex-col row-1 subcategories pr-3">
                        {selectedSubSubcategory.items.map((subcategory) => (
                            <button 
                                key={subcategory.name}
                                onClick={() => setItem(subcategory.slug)}
                                className="flex flex-row items-center space-x-2 p-2.5 px-3.5 group hover:bg-[#44CD8D] hover:w-full hover:rounded-xl" 
                            >
                                <p className='mobile:text-lg text-left group-hover:text-white laptop:text-lg desktop:text-xl text-[#0D0D0D]'>{t(`items.${subcategory.slug}`)}</p>
                            </button>
                        ))}
                    </div>
                ) }
            </div>
        </div>
    );
}

export default CategoriesModal;
