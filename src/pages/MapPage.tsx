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
import { useDispatch, useSelector } from "react-redux";
import { getPoints } from "../utils/redux/pointsSlice";
import { AppDispatch } from "../utils/redux/store";
import { authAction } from "../utils/redux/authSlice";


const MapPage = () => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const [position, setPosition] = React.useState<any>();
  const [openModalForm,  setOpenModalForm] = React.useState<boolean>(false);
  const [openModalInfo, setOpenModalInfo] = React.useState<boolean>(false);
  const [openModalLogin, setOpenModalLogin] = React.useState<boolean>(false);
  const [openModalFormUser,  setOpenModalFormUser] = React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const points: any = useSelector((state : any) => state.points.list)
  const auth: any = useSelector((state : any) => state.auth)
  
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
    dispatch(getPoints());
  }, [position, dispatch]);
  
  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const markerPointForm = () =>{
    console.log(auth.user)
    if(!auth.user){
      return setOpenModalLogin(true);
    }
    return setOpenModalForm(true);
  }

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
            <ModalLogin open={openModalLogin} handleCloseAuth={()=> setOpenModalLogin(false)} handleClose={()=> {setOpenModalLogin(false); setOpenModalFormUser(true)}} />
            <ModalFormUser open={openModalFormUser} handleClose={()=> setOpenModalFormUser(false)}/>

            <MarkerF position={position} title={'teste'} onClick={markerPointForm} key={'x'} />
          </GoogleMap>
        </LoadScript>
      </div>
    </>

  );
};

export default MapPage;
