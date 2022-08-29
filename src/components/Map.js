import React from "react";
import { Map, TileLayer, Marker, GeoJSON } from "react-leaflet";
//import { ZoomControl, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import data from "../data/json_120m/json_3.json";
import bcod from "../data/boundary_coordinates.json";
// import dataMax from "../data/OK_geoJSON_1km.json";
import 'materialize-css'
import { Switch, Row, Col, TextInput, Button, Icon, Preloader } from 'react-materialize';
import L from 'leaflet';
import '../index.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000')


socket.on("connect", () => {
  console.log(`you connected with id: ${socket.id}`)
})

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
const mapPosition = [36.58245213849015, -97.94723510742189];
// const mapPosition = [36.7844521, -102.5487837];
const zoom = 16;


const mapStyle = {
  fillColor: "red",
  fillOpacity: 0.5,
  opacity: 1,
  color: "black",
  weight: 2,
}

/*const mapStyle_no_outline = {
  fillColor: "red",
  fillOpacity: 0.5,
  opacity: 0.5,
  color: "red"
}*/

const mapData = {
  position: 'absolute',
  zIndex: 5
};

const largeFont = {
  fontSize: 25,
  color: "#16a085"
}

const smallFont = {
  fontSize: 15,
  color: "#16a085"
}
const formDataS = {
  position: 'absolute',
  left: '65vw',
  top: '5vh',
  height: '90vh',
  width: '30vw',
  backgroundColor: 'white',
  borderRadius: '10px',
  zIndex: 20
};

/*const header = {
  position: 'absolute',
  textAlign: 'center',
  left: '10vw',
  height: '12vh',
  width: '60vw',
  backgroundColor: 'white',
  color: 'teal',
  borderRadius: '10px',
  zIndex: 20
};*/

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
      overlayData: [],
      showMarker: false,
      areaID: true,
      resultProcessId: false,
      showLoader: false,
      marker: {
        lat: mapPosition[0],
        lng: mapPosition[1]
      },
      mapStyleChnage: mapStyle,
      zoomLevelControl: data,
      isMarch2019: false,
      isMarch2020: false,
      cntwht: false,
      whtfl: false,
      whtsgfl: false,
      pid: null,
      planting: null,
      fertpl: null,
      simls: null,
      price: null,
      Nprice: null,
      reqObject: {
        pid: null,
        planting: null,
        fertpl: null,
        simls: null,
        price: null,
        Nprice: null
      },
    };
  }

  componentDidMount() {
    console.log("Printing Bounds: " + JSON.stringify(this.map.leafletElement.getBounds()));
    var jsonData = []
    for (let i = 0; i < data.features.length; i++) {
      if (data.features[i].geometry.coordinates[0][0][0] > this.map.leafletElement.getBounds()._southWest.lng
        && data.features[i].geometry.coordinates[0][4][0] < this.map.leafletElement.getBounds()._northEast.lng
        && data.features[i].geometry.coordinates[0][0][1] > this.map.leafletElement.getBounds()._southWest.lat
        && data.features[i].geometry.coordinates[0][4][1] < this.map.leafletElement.getBounds()._northEast.lat)
        jsonData.push(data.features[i])
    }
    
    for (let i = 0; i < data.features.length; i++) {
      if(bcod.filelist[i]){
        console.log(bcod.filelist[i].sw[1])
      }
    }
    
  
    this.setState({ overlayData: jsonData })
  }


  getBoundstoJson = (e) => {
    console.log("loading ....");
  }

  startOverlay = (e) => {
    console.log("start: " + this.state.showOverlay)
    let value = e.target.checked
    this.setState({ showOverlay: value })
  }

  addMarker = (e) => {
    console.log(this.state.marker);
    if (!this.state.showLoader) {
      this.setState({ marker: e.latlng, showMarker: true })
    }
    console.log(e.latlng.lat.toFixed(4) + ", " + e.latlng.lng.toFixed(4));
  }

  updateInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  onEachFeature = (feature, layer) => {
    layer.on("click", L.bind(this.toggleMarker, null, feature));
  }

  toggleMarker = (feature) => {
    this.setState({ areaID: feature.properties.KS_OK1km })
    console.log("Printing areaID below: " + this.state.areaID)
  }

  handleChange = (e) => {
    console.log(e)
    if (e === "March2019") {
      console.log("If case March2019 ...")
      this.setState({ isMarch2019: true, isMarch2020: false, simls: "March2019" })
    } else if (e === "March2020") {
      console.log("Else if case March2020 ...")
      this.setState({ isMarch2019: false, isMarch2020: true, simls: "March2020" })
    }
  };

  handleRotation = (e) => {
    console.log(e)
    if (e === "cntwht") {
      console.log("If case cntwht ...")
      this.setState({ cntwht: true, whtsgfl: false, whtfl: false })
    } else if (e === "whtfl") {
      console.log("Else if case whtfl ...")
      this.setState({ cntwht: false, whtsgfl: false, whtfl: true })
    } else if (e === "whtsgfl") {
      console.log("Else if case whtsgfl ...")
      this.setState({ cntwht: false, whtsgfl: true, whtfl: false })
    }
  };


  // Change on zoom change the geojson file
  // getMapZoom = (e) => {
  //   console.log(e.target._zoom);
  //   var zoom = parseInt(e.target._zoom)
  //   if (zoom > 14) {
  //     console.log("zoom more than 14")
  //     this.setState({ zoomLevelControl: data, mapStyleChnage: mapStyle })
  //   } else {
  //     console.log("zoom less than 14")
  //     this.setState({ zoomLevelControl: dataMax, mapStyleChnage: mapStyle_no_outline })
  //   }
  // }

  onMove(event) {
    console.log("loading ...." + JSON.stringify(this.map.leafletElement.getBounds()));
    console.log("printing data: " + JSON.stringify(data.features[0].geometry.coordinates[0]))
    var jsonData = []
    for (let i = 0; i < data.features.length; i++) {
      if (data.features[i].geometry.coordinates[0][0][0] > this.map.leafletElement.getBounds()._southWest.lng
        && data.features[i].geometry.coordinates[0][4][0] < this.map.leafletElement.getBounds()._northEast.lng
        && data.features[i].geometry.coordinates[0][0][1] > this.map.leafletElement.getBounds()._southWest.lat
        && data.features[i].geometry.coordinates[0][4][1] < this.map.leafletElement.getBounds()._northEast.lat)
        // console.log("print value" + JSON.stringify(data.features[i]))
        jsonData.push(data.features[i])
    }
    this.setState({ overlayData: jsonData })
    if (this.state.showOverlay === true) {
      this.setState({ showOverlay: false })
      setTimeout(() => {
        this.setState({ showOverlay: true })
      }, 10);
    }
  }

  runModel = () => {
    const reqObj = {
      pid: this.state.areaID,
      planting: this.state.planting,
      fertpl: this.state.fertpl,
      simls: this.state.simls,
      price: this.state.price,
      Nprice: this.state.Nprice
    }
    this.setState({reqObject: reqObj});
    this.setState({ areaID: null, showLoader: true })
    console.log(JSON.stringify(this.state.reqObject))
    socket.emit('runcode', this.state.reqObject, message => {
      console.log(message)
      if (message && message === 'Result failed') {
        console.log("printing Req status if")
        this.setState({ resultProcessId: false, showLoader: false })
      } else {
        console.log("printing Req status else")
        this.setState({ resultProcessId: true, showLoader: false })
      }
    })
  }

  render() {

    return (
      <div className="map-container">
        {/* <div style={header}>
          <Row>
            <Col><h3>Nitrogen Recomendation Tool</h3></Col>
            <Col><img alt="" src="/images/umd.png" width="100" /></Col>
            <Col><div style={{ position: 'relative', top: '5vh' }}> <img alt="" src="/images/USDA.png" width="100" /> </div></Col>
          </Row>
        </div> */}
        <div className="mapData" style={mapData}>
          <Map
            ref={(ref) => { this.map = ref; }}
            center={mapPosition}
            zoom={zoom}
            scrollWheelZoom={false}
            onClick={this.addMarker}
            onMoveEnd={this.onMove.bind(this)}
          // onZoomend={this.getMapZoom}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {this.state.marker && this.state.showMarker &&
              <Marker key={`marker`} position={this.state.marker} />
            }
            {this.state.showOverlay && <GeoJSON
              style={this.state.mapStyleChnage}
              data={this.state.overlayData}
              // data={this.state.zoomLevelControl.features}
              onEachFeature={this.onEachFeature}
            />}
          </Map>
        </div>
        <div className="formData" style={formDataS}>
          <Row>
            <Col className="teal white-text" s={12}>
              <h3 style={{ textAlign: 'center' }} >Crop Information</h3>
            </Col>
          </Row>
          <Row>
            <Col s={2} ></Col>
            <Col s={2} style={smallFont}><strong>Overlay</strong></Col>
            <Col s={4} >
              <Switch
                id="Switch-1"
                offLabel="Off"
                onChange={(e) => this.startOverlay(e)}
                onLabel="On" />
            </Col>
          </Row>
          <Row>
            <Col s={1} ></Col>
            <Col s={5} >
              <strong><TextInput style={largeFont} disabled label="Latitude"
                //  onChange={(e) => this.manLatChange(e)} 
                value={this.state.marker && this.state.marker.lat.toFixed(8)} />
              </strong>
            </Col>
            <Col s={5} >
              <strong><TextInput style={largeFont} disabled label="Longitude"
                // onChange={(e) => this.manLngChange(e)} 
                value={this.state.marker && this.state.marker.lng.toFixed(7)} />
              </strong>
            </Col>
          </Row>
          <Row>
            <Col s={1} ></Col>
            <Col s={5} >
              <TextInput id="TextInput-1" label="Date (MM/YY)" onChange={(e) => this.setState({ planting: e.target.value })} />
            </Col>
            <Col s={5} >
              <TextInput id="TextInput-2" label="Fertilizer Amount" onChange={(e) => this.setState({ fertpl: e.target.value })} />
            </Col>
          </Row>
          <Row>
            <Col s={1} ></Col>
            <Col s={5} >
              <Radio checked={this.state.isMarch2019} label="March2019" onClick={(e) => this.handleChange("March2019")} value="a" name="radio-button-1" />
              March2019</Col>
            <Col s={5} >
              <Radio checked={this.state.isMarch2020} label="March2020" onClick={(e) => this.handleChange("March2020")} value="b" name="radio-button-2" />
              March2020
            </Col>
          </Row>
          <Row>
            <Col s={1} ></Col>
            <Col s={4} >
              <Radio checked={this.state.cntwht} label="cntwht" onClick={(e) => this.handleRotation("cntwht")} value="a" name="radio-button-1" />
              Continuous wheat</Col>
            <Col s={3} >
              <Radio checked={this.state.whtfl} label="whtfl" onClick={(e) => this.handleRotation("whtfl")} value="b" name="radio-button-2" />
              Wheat Fallow
            </Col>
            <Col s={4} >
              <Radio checked={this.state.whtsgfl} label="whtsgfl" onClick={(e) => this.handleRotation("whtsgfl")} value="c" name="radio-button-3" />
              Wheat Sorghum Fallow</Col>
          </Row>
          <Row>
            <Col s={1} ></Col>
            <Col s={5} >
              <TextInput id="TextInput-3" label="Price" onChange={(e) => this.setState({ price: e.target.value })} />
            </Col>
            <Col s={5} >
              <TextInput id="TextInput-4" label="Nitrogen Price" onChange={(e) => this.setState({ Nprice: e.target.value })} />
            </Col>
          </Row>
          <Row>
            <Col s={1} ></Col>
            <Col s={5} >
              <Button node="button" type="submit" waves="light" disabled={(this.state.areaID && !this.state.showLoader) ? false : true} onClick={this.runModel}>
                Run Model
                <Icon right> send  </Icon>
              </Button></Col>
            <Col s={2} >
              {this.state.showLoader && <Preloader
                active
                color="blue"
                flashing={false}
                size="small"
              />}
            </Col>
            <Col s={5} >
              <Link to="/results" style={{ textDecoration: 'none' }}>
                {this.state.resultProcessId && <Button node="button" type="submit" waves="light">
                  View Results
                  <Icon right> insert_chart  </Icon>
                </Button>}</Link></Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
