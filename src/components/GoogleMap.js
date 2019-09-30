import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { Typography } from "@material-ui/core";

import "./GoogleMap.css";

const style = {
  width: "100%",
  height: "auto",
  margin: "40px auto"
};

function GoogleMap(props) {
  return (
    <>
      <div className="result-search">
        <Typography variant="h4">{props.logradouro}</Typography>
        <Typography>{props.bairro}</Typography>
        <Typography>{props.localidade}</Typography>
        <Typography>{props.cep}</Typography>
      </div>

      <Map
        google={props.google}
        style={style}
        zoom={16}
        initialCenter={props.centroDoMapa}
        center={props.centroDoMapa}
      >
        <Marker
          title={"Minha localização"}
          name={"location"}
          position={props.centroDoMapa}
        />
      </Map>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA6WLiraDtwQIUCYmhgnFjAam5dI-rPVMA"
})(GoogleMap);
