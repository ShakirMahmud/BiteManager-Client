// src/components/GlobalReach.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { Globe, MapPin, UtensilsCrossed } from 'lucide-react';

// Custom marker icon configuration
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Set the default icon
L.Marker.prototype.options.icon = DefaultIcon;

const GlobalReach = () => {
    // Restaurant locations data
    const restaurantLocations = [
        { 
            position: [23.8103, 90.4125], 
            name: "Dhaka", 
            restaurants: 250,
            description: "Capital city with vibrant culinary scene and diverse food culture"
        },
        { 
            position: [22.3511, 91.7854], 
            name: "Chittagong", 
            restaurants: 120,
            description: "Coastal city known for its seafood and rich maritime cuisine"
        },
        { 
            position: [24.8949, 91.8687], 
            name: "Sylhet", 
            restaurants: 80,
            description: "Famous for traditional Sylheti cuisine and tea gardens"
        },
        { 
            position: [23.6345, 89.8243], 
            name: "Rajshahi", 
            restaurants: 60,
            description: "Cultural hub with unique local culinary traditions"
        },
        { 
            position: [22.7204, 89.2398], 
            name: "Khulna", 
            restaurants: 75,
            description: "Gateway to the Sundarbans with distinctive regional flavors"
        }
    ];

    return (
        <div className="py-16 bg-light-card dark:bg-dark-card overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ 
                        opacity: 1, 
                        y: 0
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut"
                    }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl lg:text-4xl font-bold text-light-primary dark:text-light-primary mb-4">
                        Our Global Restaurant Network
                    </h2>
                    <p className="text-gray-500 dark:text-light-text-muted text-base md:text-lg max-w-2xl mx-auto">
                        Connecting food lovers with amazing restaurants across major cities
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Interactive Map */}
                    <motion.div 
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ 
                            opacity: 1, 
                            x: 0
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut"
                        }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="w-full aspect-video rounded-xl overflow-hidden shadow-lg"
                    >
                        <MapContainer 
                            center={[23.8103, 90.4125]} 
                            zoom={6.5} 
                            scrollWheelZoom={false}
                            style={{ 
                                height: '100%', 
                                width: '100%',
                                maxWidth: '100%'
                            }}
                            className="h-full w-full"
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {restaurantLocations.map((location, index) => (
                                <Marker key={index} position={location.position}>
                                    <Popup>
                                        <div>
                                            <h3 className="font-bold">{location.name}</h3>
                                            <p>{location.restaurants} Restaurants</p>
                                            <p className="text-sm italic">{location.description}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </motion.div>

                    {/* Stats and Information */}
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ 
                            opacity: 1, 
                            x: 0
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut"
                        }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="space-y-6"
                    >
                        {/* City Coverage */}
                        <div className="flex items-center space-x-4 bg-light-background dark:bg-dark-background p-6 rounded-xl shadow-md">
                            <Globe className="text-light-primary dark:text-dark-primary w-12 h-12" />
                            <div>
                                <h3 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                                    5 Major Cities
                                </h3>
                                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                    Extensive coverage across the United States
                                </p>
                            </div>
                        </div>

                        {/* Restaurant Count */}
                        <div className="flex items-center space-x-4 bg-light-background dark:bg-dark-background p-6 rounded-xl shadow-md">
                            <UtensilsCrossed className="text-light-primary dark:text-dark-primary w-12 h-12" />
                            <div>
                                <h3 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                                    7+ Branches
                                </h3>
                                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                    Growing network of partner restaurants
                                </p>
                            </div>
                        </div>

                        {/* Nationwide Presence */}
                        <div className="flex items-center space-x-4 bg-light-background dark:bg-dark-background p-6 rounded-xl shadow-md">
                            <MapPin className="text-light-primary dark:text-dark-primary w-12 h-12" />
                            <div>
                                <h3 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                                    Nationwide Presence
                                </h3>
                                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                    Expanding our restaurant management platform
                                </p>
                            </div>
                         </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default GlobalReach;