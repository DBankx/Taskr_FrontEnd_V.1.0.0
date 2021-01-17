import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useRef, useCallback } from 'react'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { observer } from 'mobx-react-lite'
import { SimpleGrid } from '@chakra-ui/react'

// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = "pk.eyJ1IjoiZGJhbmt4IiwiYSI6ImNrandpNnRpcTBpc24ycGxja3hjaHdudnAifQ.IsBBI65qv2qJKZPd0kIyYw";

const LocationFinder = () => {
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });
    const geocoderContainerRef = useRef(null);
    const mapRef = useRef(null);
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    return (
        <div style={{width: "100%"}}>
            <SimpleGrid style={{height: "30vh"}} templateColumns={{xl: "2fr 1.5fr", md: "1fr 1fr", lg: "2fr 1.5fr", sm: "1fr"}} spacing="15px">
            <div
                ref={geocoderContainerRef}
                className="geocoder__input"
            />
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <Geocoder
                    mapRef={mapRef}
                    containerRef={geocoderContainerRef}
                    onViewportChange={handleViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    position="top-left"
                    placeholder="Search by location or postcode"
                    zoom={14}
                    // onResult={(res: any) => console.log(res)}
                />
            </MapGL>
            </SimpleGrid>
        </div>
    );
};

export default observer(LocationFinder);