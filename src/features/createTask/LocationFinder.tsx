import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, {useState, useRef, useCallback} from 'react'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { observer } from 'mobx-react-lite'
import {SimpleGrid, useMediaQuery} from '@chakra-ui/react'
import {LocationIcon} from "../../infrastructure/icons/Icons";

const MAPBOX_TOKEN = "pk.eyJ1IjoiZGJhbmt4IiwiYSI6ImNrandpNnRpcTBpc24ycGxja3hjaHdudnAifQ.IsBBI65qv2qJKZPd0kIyYw";

interface IProps{
    setFieldValue: any;
    setFieldError: any;
    addressErrors: any;
    values: any;
}

const LocationFinder : React.FC<IProps> = ({setFieldValue, setFieldError, addressErrors, values}) => {
    const [isMobile] = useMediaQuery("(max-width: 500px)");
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
    const handleResultSelection = useCallback((result) => {
        setFieldValue("address", result.result.place_name);
        const postCodeContext = result.result.context.find((context: any) => context.id.startsWith("postcode"));
        setFieldValue("postCode", postCodeContext ? postCodeContext.text : "");
    }, [])

    const clearField = useCallback(() => {
        if(values.address === "") {
        setFieldError("address", "Please put in a valid address")
    }}, []);
    
    return (
        <div style={{height: "100%"}}>
            <SimpleGrid className="location__finder" style={isMobile && values.address !== "" ? {height: "100%"} : {height: "100%"}} templateColumns={{xl: "2fr 1.5fr", md: "1fr 1fr", lg: "2fr 1.5fr", sm: "1fr"}} spacing="15px">
                <div>
                        <div>
                    <div
                ref={geocoderContainerRef}
                className="geocoder__input"
                style={addressErrors ? {border: "1px solid #E12120"} : {}}
            />
                    {addressErrors && (
                        <small className="form__error">{addressErrors}</small>
                    )}
                    </div>
                    
                    {values.address && <div className="address__box">
                        <small style={{color: "#3D3373", display: "flex"}}>
                            <LocationIcon boxSize={6} color="#3D3373" />
                            <span style={{marginLeft: "1em"}}>Your task will be posted in</span> 
                        </small>
                        <p>{values.address}</p>
                        <p><span className="text__bold text__silent">Postcode:</span> {values.postCode}</p>
                    </div>}
                </div>
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="30vh"
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <Geocoder
                    mapRef={mapRef}
                    containerRef={geocoderContainerRef}
                    onViewportChange={handleViewportChange}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    placeholder="Search by location or postcode"
                    zoom={14}
                    onResult={handleResultSelection}
                    marker={true}
                    onClear={clearField}
                    clearAndBlurOnEsc={true}
                    name="address"
                />
            </MapGL>
            </SimpleGrid>
        </div>
    );
};

export default observer(LocationFinder);