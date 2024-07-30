import React, { useEffect } from 'react';

function ProfileMap({ latitude, longitude }) {
    useEffect(() => {
        // Создаем новую карту
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude },
            zoom: 10, // Устанавливаем начальный масштаб карты
        });

        // Добавляем маркер на карту
        new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: 'User Location', // Заголовок маркера
        });
    }, [latitude, longitude]); // Зависимости для повторного рендера при изменении координат

    return (
        <div className='rounded-2xl' id="map" style={{ width: '100%', height: '400px' }}></div>
    );
}

export default ProfileMap;
