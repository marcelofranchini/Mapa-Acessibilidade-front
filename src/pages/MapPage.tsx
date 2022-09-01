import React, { useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  LoadScript,

} from "@react-google-maps/api";
import { REACT_APP_GOOGLE_API_KEY } from "../App";
import "./MapPage.css";
import Header from "../components/header";
import ModalInfo from "../components/ModalInfo";
import ModalForm from "../components/ModalForm";
import ModalLogin from "../components/Modallogin";
import ModalFormUser from "../components/ModalFormUser";


const MapPage = () => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const [position, setPosition] = React.useState<any>();
  const [openModalForm,  setOpenModalForm] = React.useState<boolean>(false);
  const [openModalInfo, setOpenModalInfo] = React.useState<boolean>(false);
  const [openModalLogin, setOpenModalLogin] = React.useState<boolean>(false);
  const [openModalFormUser,  setOpenModalFormUser] = React.useState<boolean>(false);

  


  const center = {
    lat: -23.5468951,
    lng: -47.2005923,
  };

  const handlerPoint = (ev:any) => {
    setPosition({
      lat: ev.latLng?.lat() ,
      lng: ev.latLng?.lng(),
    })
  };

  useEffect(() => {
    
  }, [position]);

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };
  const image =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  return (
    <>
      <Header />
      <div className="map">

        <LoadScript
          googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
          libraries={["places"]}
        >

          <GoogleMap
            onLoad={onMapLoad}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={position || center}
            zoom={15}
            onDblClick={handlerPoint}
          >
            <ModalForm open={openModalForm} handleClose={()=> setOpenModalForm(false)}/>
            <ModalInfo open={openModalInfo} handleClose={()=> setOpenModalInfo(false)} />
            <ModalLogin open={openModalLogin} handleClose={()=> setOpenModalLogin(false)} />
            <ModalFormUser open={openModalFormUser} handleClose={()=> setOpenModalFormUser(false)}/>

            <MarkerF position={position} title={'teste'} onClick={()=>{setOpenModalLogin(true)}} key={'x'} />
          </GoogleMap>
        </LoadScript>
      </div>
    </>

  );
};

export default MapPage;
