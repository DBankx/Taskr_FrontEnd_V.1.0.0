import React, {useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";

interface IProps{
    lat: number;
    lon: number;
}

mapboxgl.accessToken = "pk.eyJ1IjoiZGJhbmt4IiwiYSI6ImNrandpNnRpcTBpc24ycGxja3hjaHdudnAifQ.IsBBI65qv2qJKZPd0kIyYw"; 

const FormMap : React.FC<IProps> = ({lat, lon}) => {
   const mapContainer = useRef(null); 
    
    useEffect(() => {
        const map = new mapboxgl.Map({
            style: 'mapbox://styles/mapbox/streets-v11',
            container: mapContainer.current!,
            center: [lat, lon],
            zoom: 2
        })

        map.addControl(new mapboxgl.NavigationControl());

        const el = document.createElement("div");
        el.className = "marker";

        new mapboxgl.Marker(el).setLngLat([lat, lon]).addTo(map);

    }, [lat, lon])
    
    return (
        <div>
            <div className="formMap" ref={mapContainer}></div>
        </div>
    )
}

export default FormMap;