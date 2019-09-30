import React, { Component } from "react";
import { Typography, InputBase, Button } from "@material-ui/core";
import api from "../services/api";
import mapsApi from "../services/mapsApi";
import "./Header.css";

import GoogleMap from "./GoogleMap";
class Header extends Component {
  state = {
    logradouro: "",
    bairro: "",
    localidade: "",
    cep: "",
    cepDigitado: "",
    centroDoMapa: {}
  };

  async componentWillMount() {
    const geocodeResponse = await mapsApi.get(
      `json?address=02047-000&key=AIzaSyA6WLiraDtwQIUCYmhgnFjAam5dI-rPVMA`
    );
    this.setState({
      centroDoMapa: {
        lat: geocodeResponse.data.results[0].geometry.location.lat,
        lng: geocodeResponse.data.results[0].geometry.location.lng
      }
    });
  }

  handleSearch = async cep => {
    cep = cep.replace("-", "");
    let formattedCep = cep.slice(0, 5) + "-" + cep.slice(5, cep.length);

    const viacepResponse = await api.get(`${formattedCep}/json/`);
    const geocodeResponse = await mapsApi.get(
      `json?address=${formattedCep}&key=AIzaSyA6WLiraDtwQIUCYmhgnFjAam5dI-rPVMA`
    );
    this.setState({
      logradouro: viacepResponse.data.logradouro,
      bairro: viacepResponse.data.bairro,
      localidade: `${viacepResponse.data.localidade} - ${
        viacepResponse.data.uf
      }`,
      cep: viacepResponse.data.cep,
      centroDoMapa: {
        lat: geocodeResponse.data.results[0].geometry.location.lat,
        lng: geocodeResponse.data.results[0].geometry.location.lng
      }
    });
  };

  updateInputValue = event => {
    this.setState({ cepDigitado: event.target.value });
  };

  render() {
    return (
      <>
        <header id="main-header">
          <div className="header-content">
            <div className="title">
              <Typography variant="h2">Consultar</Typography>
            </div>

            <div className="search">
              <Typography>CEP</Typography>

              <InputBase
                className="search-input"
                placeholder="Digite o CEP"
                onChange={this.updateInputValue}
              />

              <Button
                variant="contained"
                color="primary"
                className="search-button"
                onClick={() => {
                  this.handleSearch(this.state.cepDigitado);
                }}
              >
                <Typography>Buscar</Typography>
              </Button>
            </div>
          </div>
        </header>

        <div
          className="map-container"
          Style="position: relative;height: 24em;margin: 30px;"
        >
          <GoogleMap
            logradouro={this.state.logradouro}
            bairro={this.state.bairro}
            localidade={this.state.localidade}
            cep={this.state.cep}
            centroDoMapa={this.state.centroDoMapa}
          />
        </div>
      </>
    );
  }
}

export default Header;
