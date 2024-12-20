import React from 'react'
import {useCarrierRegistration} from "../../context/CarrierContext";
import CarrierDetails from './CarrierDetails';
import TravelDetails from './TravelDetails';
import CarrierInfoConfirmation from "./CarrierInfoConfirmation"


function CarrierRegistration() {

  const {CarriercurrentState} = useCarrierRegistration();
  return (
    <div>
      {CarriercurrentState === 1 && <CarrierDetails/>}
      {CarriercurrentState === 2 && <TravelDetails/>}
      { CarriercurrentState === 3 && <CarrierInfoConfirmation/>} 
      
    </div>
  )
}

export default CarrierRegistration;