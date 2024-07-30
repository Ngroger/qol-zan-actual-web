function ChangeStatus({ onClose }) {
    return (
        <div className='fixed w-screen top-0 h-screen justify-center items-center flex'>
            <button className="bg-black/50 w-full h-full absolute z-10" onClick={onClose} />
            <div className='bg-white p-10 rounded-[40px] absolute z-50'>
                <p>Вы желаете временно снять этот товар с продажи?</p>
            </div>
        </div>
    )
};

export default ChangeStatus;