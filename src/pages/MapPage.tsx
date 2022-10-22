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
import ModalLogin from "../components/Modallogin";
import ModalFormUser from "../components/ModalFormUser";
import { useDispatch, useSelector } from "react-redux";
import { getPoints } from "../utils/redux/pointsSlice";
import { AppDispatch } from "../utils/redux/store";
import { authAction } from "../utils/redux/authSlice";
import ModalForm from "../components/ModalForm";

import icone from '../utils/icons/circle.svg'
import iconeOff from '../utils/icons/circleoff.svg'
import iconeUnd from '../utils/icons/circleund.svg'
import ModalPoints from "../components/ModalPoints";
import ModalEditUser from "../components/ModalEditUser";
import { getUser } from "../utils/redux/userByIdSlice";




const MapPage = () => {
  const [map, setMap] = React.useState<google.maps.Map>();
  const [position, setPosition] = React.useState<any>();
  const [openModalForm,  setOpenModalForm] = React.useState<boolean>(false);
  const [openModalInfo, setOpenModalInfo] = React.useState<boolean>(false);
  const [openModalLogin, setOpenModalLogin] = React.useState<boolean>(false);
  const [openModalFormUser,  setOpenModalFormUser] = React.useState<boolean>(false);
  const [openModalEditUser,  setOpenModalEditUser] = React.useState<boolean>(false);
  const [openModalPoints,  setopenModalPoints] = React.useState<boolean>(false);

  const [infos, setInfos] = React.useState<any>();


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
    markerPointForm();
  };
 
  useEffect(() => {
    dispatch(getPoints());
    if(auth?.user){
      const data = {token: auth?.user?.token, userId: auth?.user?._id }
      dispatch(getUser(data));
    }
  }, [position, dispatch]);
  
  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const markerPointForm = () =>{
    if(!auth.user){
      return setOpenModalLogin(true);
    }
    return setOpenModalForm(true);
  }

  const handleInfoModal = (point: any) =>{

    setInfos(point)
    return setOpenModalInfo(true)
  }

  return (
    <>
      <Header handleOpenEditUser={() => setOpenModalEditUser(true)} handleOpenLogin={() => setOpenModalLogin(true)} handleOpenPoints={()=> setopenModalPoints(true)} />
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
            options={{
              disableDoubleClickZoom: true,
              clickableIcons: false,
              styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                          { visibility: "off" }
                    ]
                }
            ]
            
            }}          
            
          >
            <ModalForm coord={position} open={openModalForm} handleClose={()=> setOpenModalForm(false)}/>
            <ModalInfo open={openModalInfo} infos={infos} handleClose={()=> setOpenModalInfo(false)} />
            <ModalLogin open={openModalLogin} handleCloseAuth={()=> setOpenModalLogin(false)} handleClose={()=> {setOpenModalLogin(false); setOpenModalFormUser(true)}} />
            <ModalFormUser open={openModalFormUser} handleCloseFormUser={()=> {setOpenModalFormUser(false); setOpenModalLogin(true)}} handleClose={()=> setOpenModalFormUser(false)}/>
            <ModalEditUser open={openModalEditUser} handleCloseFormUser={()=> {setOpenModalEditUser(false)}} handleClose={()=> setOpenModalEditUser(false)}/>

            <MarkerF position={position} title={'teste'}  icon={iconeUnd} onClick={markerPointForm} key={'x'} />
            <ModalPoints open={openModalPoints} handleClose={()=> setopenModalPoints(false) } />
           { 
           points.map((point: any) => {
           return <MarkerF 
              position={{lat: point.coord.lat , lng: point.coord.lng}} 
              title={point.title} onClick={()=> handleInfoModal(point)} 
              key={point._id} 
              icon={point.type === 'acessivel' ? icone : iconeOff}
            />
          })
            }

          </GoogleMap>
        </LoadScript>
      </div>
    </>

  );
};

export default MapPage;
