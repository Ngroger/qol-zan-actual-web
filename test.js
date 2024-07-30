<div>
    <div className="flex flex-row items-start justify-between border-2 border-black w-9/12">
        <div className="space-y-1 border-2 border-black w-9/12">
            <div className="mobile:flex laptop:hidden flex-row items-center space-x-2">
                <p className="text-[#0D0D0D] mobile:text-md tablet:text-lg laptop:text-xl font-bold">{item.cost} тг.</p>
                <p className="mobile:text-xs tablet:text-md text-[#0D0D0D]/50 line-through">{item.oldCost} тг.</p>
            </div>
            <p className="text-wrap mobile:text-md tablet:text-xl laptop:text-2xl text-[#0D0D0D]">{item.title}</p>
            <p className="mobile:text-xs tablet:text-md mobile:w-full tablet:w-11/12 laptop:text-lg text-[#0D0D0D]">{item.description}</p>
        </div>
        <div className="flex flex-row space-x-4">
            <div className="mobile:hidden laptop:flex flex-col w-32 items-center justify-center space-y-0.2">
                <p className="text-[#0D0D0D] text-2xl font-bold">3 740 тг.</p>
                <p className="text-lg text-[#0D0D0D]/50 line-through">4 740 тг.</p>
            </div>
            <div className="mobile:w-4 mobile:h-4 tablet:w-6 laptop:w-8 tablet:h-6 laptop:h-8 border-[#44CD8D] mobile:rounded-[4px] laptop:rounded-lg border-2">

            </div>
        </div>
    </div>
    <div className="w-full flex items-center flex-row justify-between mt-4">
        <div className="mobile:p-1 mobile:px-4 tablet:p-1 tablet:px-4 laptop:p-2 laptop:px-6 flex flex-row bg-[#EFF3F6] rounded-xl items-center mobile:space-x-2 tablet:space-x-2 laptop:space-x-4">
            <button className="hover:opacity-50">
                <p className="text-[#000000]/50 mobile:text-xl tablet:text-xl laptop:text-3xl">-</p>
            </button>
            <button className="hover:opacity-50">
                <p className="text-[#44CD8D] mobile:text-lg tablet:text-lg laptop:text-2xl font-semibold">1</p>
            </button>
            <button className="hover:opacity-50">
                <p className="text-[#000000]/50 mobile:text-xl tablet:text-xl laptop:text-3xl">+</p>
            </button>
        </div>
        <div className="flex flex-row items-center space-x-4">
            <button className="hover:opacity-50">
                <FaRegTrashCan className="mobile:text-xl tablet:text-2xl laptop:text-3xl text-[#0D0D0D]/50"/>
            </button>
            <button className="hover:opacity-50">
                <LuHeart className="mobile:text-xl tablet:text-2xl laptop:text-3xl text-[#0D0D0D]/50"/>
            </button>
        </div>
    </div>
</div>