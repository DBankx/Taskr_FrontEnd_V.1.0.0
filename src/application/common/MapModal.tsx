import React, {useCallback, useRef} from "react";
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box} from "@chakra-ui/react";
import MapGL from "react-map-gl";

interface IProps{
    isOpen: boolean;
    onClose: any;
}

const MapModal = ({isOpen, onClose}: IProps) => {
    const [viewport, setViewport] = React.useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });
    const mapRef = useRef(null);
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );
    const MAPBOX_TOKEN = "pk.eyJ1IjoiZGJhbmt4IiwiYSI6ImNrandpNnRpcTBpc24ycGxja3hjaHdudnAifQ.IsBBI65qv2qJKZPd0kIyYw";
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p>Apple</p>
                    <Box height="40vh">
                    <MapGL 
                        style={{overflow: "visible"}}
                        ref={mapRef}
                        width="100vw"
                        height="40vh"
                        onViewportChange={handleViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        {...viewport}
                        visible
                        
                    />
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default MapModal;