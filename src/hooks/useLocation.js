import { useState, useEffect, useCallback } from 'react';

/**
 * Shared hook for user geolocation
 * Replaces duplicate location logic in Header, HomeNew, and ChatWidget
 */
export const useUserLocation = () => {
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState('Hyderabad');
    const [loading, setLoading] = useState(true);

    const detectLocation = useCallback(async () => {
        if (!navigator.geolocation) {
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const coords = { lat: latitude, lng: longitude };
                setLocation(coords);
                localStorage.setItem('user_location', JSON.stringify(coords));

                // Reverse geocode for city name
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    const detectedCity = data.address.city || data.address.town || data.address.village || 'Hyderabad';
                    setCity(detectedCity);
                } catch (error) {
                    console.error('Reverse geocoding failed:', error);
                }
                setLoading(false);
            },
            (error) => {
                console.log('Geolocation error:', error.message);
                setLoading(false);
            },
            { timeout: 10000, enableHighAccuracy: true, maximumAge: 300000 }
        );
    }, []);

    useEffect(() => {
        detectLocation();
    }, [detectLocation]);

    return { location, city, setCity, loading, detectLocation };
};

export default useUserLocation;
