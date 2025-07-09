import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Restaurant } from "@/types/restarurant";

interface Props {
    restaurants: Restaurant[];
    userPos: [number, number] | null;
}



const LocationSearchFilter: React.FC<Props> = ({ restaurants, userPos }) => {


    if (!userPos) {
        return <p className="text-center text-gray-500 py-4">Fetching your location...</p>;
    }

    return (
        <div className="w-1/2 h-[300px] rounded-lg overflow-hidden">
            <MapContainer center={userPos} zoom={13} className="h-full w-full z-0">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* User Location Marker */}
                <Marker
                    position={userPos}
                    icon={
                        new L.Icon({
                            iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s",
                            iconSize: [40, 40],
                            iconAnchor: [20, 40],
                            popupAnchor: [0, -40],
                            className: "rounded-full border-2 border-blue-500 shadow-lg",
                        })
                    }
                >
                    <Popup>You are here</Popup>
                </Marker>

                {/* Nearest Restaurant Markers */}
                {restaurants.map((restaurant) => {
                    const [lat, lng] = restaurant.location.split(",").map(Number);
                    const icon = new L.DivIcon({
                        html: `
        <div style="text-align: center; max-width: 60px; overflow: hidden; white-space: nowrap;">
            <img 
                src="/${restaurant.logo}" 
                style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%; border: 2px solid #333; display: block; margin: 0 auto;" 
            />
            <div style="font-size: 11px; line-height: 1.1; word-wrap: break-word;">
                ${restaurant.name}
            </div>
        </div>
    `,
                        iconSize: [50, 60],
                        iconAnchor: [25, 50],
                        className: "restaurant-label-icon",
                    });

                    return (
                        <>
                            <Marker key={restaurant.id} position={[lat, lng]} icon={icon}>
                                <Popup>
                                    <strong>{restaurant.name}</strong><br />
                                    Cuisine: {restaurant.cuisine_type}<br />
                                    Type: {restaurant.restaurant_type}<br />
                                    Distance: {restaurant?.distance?.toFixed(2)} km<br />
                                    <a href={`http://${restaurant?.tenant?.domain?.domain}:8000`}
                                        className="text-blue-500 hover:underline"
                                        target="_blank" >
                                        Visit site
                                    </a>
                                </Popup>
                            </Marker>

                            {/* Arrow/Line from user to restaurant */}
                            <Polyline
                                positions={[userPos, [lat, lng]]}
                                pathOptions={{ color: "blue", weight: 2, dashArray: "4" }}
                            />
                        </>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default LocationSearchFilter;
