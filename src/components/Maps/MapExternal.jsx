import PopupMarker from "components/PopupMarker";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "react-tabs/style/react-tabs.css";
import useStore from "store/mapStore";
import LocationButton from "./LocationButton";
import styles from "./custom-marker-and-popup.module.css";
import { useMeasure, useCss } from "react-use";

const center = [37.09024, -95.712891];
const points = [
  {
    id: "1",
    lat: 0,
    lng: 0,
    title: "Marker 1",
  },
];
const MyMarkers = () => {
  const markerData = useStore((state) => state.markerData);
  const [markerPoints, setMarkerPoints] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    if (markerData) {
      setMarkerPoints(markerData);
      setPopupOpen(true);
    }
  }, [markerData]);
  return markerPoints && markerPoints.length > 0
    ? markerPoints.map((item, index) => (
        <PointMarker
          key={index}
          content={index}
          center={{ lat: item.lat, lng: item.lng }}
          openPopup={popupOpen}
        />
      ))
    : null;
};

const PointMarker = ({ center, content, openPopup }) => {
  const [position, setPosition] = useState(null);
  const [popupOpened, setPopupOpened] = useState(false);
  const [popupVisible, setPopupVisible] = useState("hidden");
  const popupStyles = useCss({
    visibility: popupVisible,
    animation: "fadeIn ease 1s",
    WebkitAnimation: "fadeIn ease 1s",
    MozAnimation: "fadeIn ease 1s",
    OAnimation: "fadeIn ease 1s",
    msAnimation: "fadeIn ease 1s",
  });
  const map = useMapEvents({
    popupopen(e) {

      // setPosition(e.target._popup._latlng);
      /*     var px = map.project(e.target._popup._latlng);
      // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      px.y -= e.target._popup._container.clientHeight / 2;
      console.log("POPUP OPEN!", px);
      map.panTo(map.unproject(px), { animate: true }); */
    },
    popupclose(e) {
      setTimeout(() => {
        //map-popup-show map-popup-hide
        setPopupVisible("hidden");
      }, 1000);
    },
  });
  const markerRef = useRef(null);
  useEffect(() => {
    if (openPopup) {
      let open = markerRef.current.isPopupOpen();
  
      //  map.fitBounds([[center.lat, center.lng]], {padding: [50, 50], maxZoom: 13})

    map.fitBounds([[center.lat, center.lng]], { padding: [50, 50], maxZoom: 13 });
        markerRef.current.openPopup();
           var px = map.project(markerRef.current._popup._latlng);
           // find the height of the popup container, divide by 2, subtract from the Y axis of marker locations
           px.y -= markerRef.current._popup._container.clientHeight / 2;
           console.log("POPUP OPEN!", px);
           map.panTo(map.unproject(px), { animate: true, duration: 0.2, easeLinearity: 0.5 });
    }
  }, [map, center, openPopup]);

  function onPopupOpen() {
    console.log("onPopupOpen");
    setPopupOpened(true);
  }

  return (
    <Marker ref={markerRef} position={center}>
      <Popup minWidth={300} position={position} className={styles.newPopup} keepInView={false} autoPan={true}>
        <PopupMarker content={content} />
      </Popup>
    </Marker>
  );
};

const PlaceHolder = () => {
  return <div style={{ minWidth: "500px", backgroundColor: "red", minHeight: "500px" }}>test</div>;
};
const MapExternal = () => {
  const [selected, setSelected] = useState();
  const [map, setMap] = useState(null);

  return (
    <>
      <MapContainer
        whenCreated={setMap}
        center={center}
        zoom={3}
        scrollWheelZoom={true}
        zoomControl={false}
        placeholder={<PlaceHolder />}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`}
        />
        <MyMarkers />
        <LocationButton map={map} />
      </MapContainer>
    </>
  );
};
export default MapExternal;
