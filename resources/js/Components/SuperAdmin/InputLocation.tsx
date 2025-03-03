import { useState ,useEffect} from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L,{ LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    data: { restrolocation: string };
    setData: (field: string, value: string) => void;
    errors: { restrolocation?: string };
}
const customIcon = new L.Icon({
    iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLWpKF15e9IOybOvdjfWrhpX2GRt4N2M0Axg&s",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
// Component to pick location on the map
const LocationPicker: React.FC<{ setData: (field: string, value: string) => void }> = ({ setData }) => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    useMapEvents({
        click(e: LeafletMouseEvent) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            setPosition([lat, lng]);
            setData("restrolocation", `${lat}, ${lng}`);
        },
    });

    return position ? <Marker position={position} icon={customIcon} /> : null;
};

const LocationInput: React.FC<Props> = ({ data, setData, errors }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultPosition, setDefaultPosition] = useState<[number, number]>([51.505, -0.09]); // Default to London

    // Auto-complete the map: Use input value or fallback to current location
    useEffect(() => {
        if (data.restrolocation) {
            // If user already provided a location, use it
            const [lat, lng] = data.restrolocation.split(",").map(Number);
            if (!isNaN(lat) && !isNaN(lng)) {
                setDefaultPosition([lat, lng]);
            }
        } else {
            // If no input, get current location
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setDefaultPosition([position.coords.latitude, position.coords.longitude]);
                    },
                    () => console.warn("Geolocation permission denied",)
                );
            }
        }
    }, [data.restrolocation]);
    return (
        <div className="w-full">
            <InputLabel htmlFor="restroLiscience_no" value="restroLiscience_no" />
            <div className="mt-2 relative">
                <TextInput
                    id="restroLiscience_no"
                    name="restroLiscience_no"
                    value={data.restrolocation}
                    className="block w-full pl-3 pr-10 py-2   relative"
                    autoComplete="restroLiscience_no"
                    onChange={(e) => setData('restroLiscience_no', e.target.value)}
                    required
                />
                <FontAwesomeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 " onClick={() => setIsModalOpen(true)} icon={faLocationDot} flip="horizontal" size="lg" />
                <InputError message={errors.restrolocation} className="mt-2" />
            </div>

            {/* Map Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-2">Select Location</h2>
                        <div className="h-60">
                            <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full w-full">
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={defaultPosition} icon={customIcon}></Marker>
                                <LocationPicker setData={setData} />
                            </MapContainer>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-indigo-500 text-white rounded-md" onClick={() => setIsModalOpen(false)}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationInput;
