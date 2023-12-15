import "./Map.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import "@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import Sidebar from "../../components/sidebar/Sidebar";

const MAX_ZOOM = 100;
const distanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
  // Haversine formula to calculate distance between two coordinates
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  return distance * 1000; // Convert to meters
};

const calculateDistanceAndAccuracy = (markers) => {
  if (markers.length >= 2) {
    const marker1 = markers[0];
    const marker2 = markers[1];

    const distance = distanceBetweenPoints(
      marker1.latitude,
      marker1.longitude,
      marker2.latitude,
      marker2.longitude
    );

    // Since there is no accuracy data in your marker, setting it to 0
    const accuracyInCentimeters = 0;

    return { distance, accuracyInCentimeters };
  }
  return { distance: 0, accuracyInCentimeters: 0 };
};

function MapView(prop) {
  const mapElement = useRef();
  const [mapLongitude] = useState(null);
  const [mapLatitude] = useState(null);
  const [map, setMap] = useState({});
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [Acc, setAcc] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [mapZoom, setMapZoom] = useState(13);
  const color = prop.markerColor ?? '#FF0000';
  const [markerText] = useState(prop.markerText ?? 'Rover Location');

  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState(0);
  const [accuracyInCentimeters, setAccuracyInCentimeters] = useState(0);


  useEffect(() => {
    const fetchMarkersData = async () => {
      try {
        const response = await axios.get("/Markers.json");
        setMarkers(response.data);
        if (response.data.length >= 2) {
          const deviceLocation = {
            latitude: lat,
            longitude: lng,
          };
  
          const marker1 = deviceLocation;
          const marker2 = response.data[1]; // Assuming the second marker from the array
  
          const { distance, accuracyInCentimeters } = calculateDistanceAndAccuracy([marker1, marker2]);
  
          setDistance(distance);
          setAccuracyInCentimeters(accuracyInCentimeters);
        }

      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };
    fetchMarkersData();
  }, []);

  useEffect(() => {
    const calculateDistanceAndAccuracy = () => {
      if (markers.length >= 2) {
        const marker1 = markers[0];
        const marker2 = markers[1];

        const calculatedDistance = distanceBetweenPoints(
          marker1.latitude,
          marker1.longitude,
          marker2.latitude,
          marker2.longitude
        );

        const accuracyInCentimeters = 0;

        setDistance(calculatedDistance);
        setAccuracyInCentimeters(accuracyInCentimeters);
      }
    };
    calculateDistanceAndAccuracy();
  }, [markers]);

  const addGreenMarkers = () => {
    if (map && markers.length > 0) {
      markers.forEach(({ latitude, longitude }) => {
        const greenMarker = new tt.Marker({
          color: 'green'
        })
          .setLngLat([longitude, latitude])
          .addTo(map);
        var popupOffsets = {
          top: [0, -10],
          bottom: [0, -50],
          left: [25, -35],
          right: [-25, -35],
        };

        var popup = new tt.Popup({
          offset: popupOffsets,
        }).setHTML("RTK Corrected Location");

        greenMarker.setPopup(popup);
      });
      console.log("Green markers added!");
    }
  };

  useEffect(() => {
    addGreenMarkers();
  }, [map, markers]);

  useEffect(() => {
    const fetchMarkersData = async () => {
      try {
        const response = await axios.get("/Markers.json");
        setMarkers(response.data);
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };
    fetchMarkersData();
  }, []);

  const handleClick = () => {
    setToggle(!toggle);
    updateMap(toggle);
  };

  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
    }
  };

  var moveMap = (Lng, Lat) => {
    map.flyTo({
      center: [Lng, Lat],
      zoom: 14
    });
  };

  var successHandler = function (position) {
    setStatus('Locating...');
    setStatus(null);
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
    setAcc(position.coords.accuracy);
    setStatus(position.coords.accuracy > 40 ? "The GPS accuracy is Low" : "The GPS accuracy is HIGH");
  };

  var errorHandler = function (errorObj) {
    setStatus('Unable to retrieve your location');
    alert(errorObj.code + ":" + errorObj.message);
    getLocation();
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      accuracy: {
        android: 'high',
        ios: 'bestForNavigation'
      },
      timeout: 35000,
      maximumAge: 1000,
      distanceFilter: 10,
    });
  };

  const addMarker = () => {
    const targetCoordinates = [lng, lat];

    const marker = new tt.Marker({
      color: color
    })
      .setLngLat(targetCoordinates)
      .addTo(map);

    var popupOffsets = {
      top: [0, 0],
      bottom: [0, -50],
      left: [25, -35],
      right: [-25, -35],
    };

    var popup = new tt.Popup({
      offset: popupOffsets,
    }).setHTML(markerText);

    marker.setPopup(popup);
    marker.togglePopup();
  };

  const updateMap = (toggle) => {
    if (toggle) {
      map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
      map.setZoom(mapZoom);
      moveMap(mapLongitude, mapLatitude);
      addMarker();
    } else {
      map.setCenter([parseFloat(lng), parseFloat(lat)]);
      map.setZoom(mapZoom);
      getLocation();
      moveMap(lng, lat);
      addMarker();
    }
  };

  const updateMaps2 = () => {
    map.setCenter([parseFloat(lng), parseFloat(lat)]);
    map.setZoom(mapZoom);
    addMarker();
  };

  useEffect(() => {
    let map = tt.map({
      key: "lA2ONWjNjuFjGxJC4oAlV2IQJrgTpAXi",
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: 12,
      language: "en-GB",
    });

    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    setMap(map);
    getLocation();
    return () => map.remove();
  }, []);

  const addPolylineBetweenMarkers = () => {
    if (map && markers.length >= 2) {
      const coordinates = markers.map(({ latitude, longitude }) => [longitude, latitude]);

      if (!map.getSource('polyline')) {
        map.addSource('polyline', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coordinates,
            },
          },
        });

        map.addLayer({
          id: 'polyline',
          type: 'line',
          source: 'polyline',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': 'rgba(0, 255, 0, 0.5)',
            'line-width': 5,
          },
        });
      } else {
        const source = map.getSource('polyline');
        if (source) {
          source.setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coordinates,
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    addPolylineBetweenMarkers();
  }, [map, markers]);
  
  return (
    <div className="mapContainer">
      <Container>
      <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <span>MapView</span>
        </div>
        {/* <Row className="topCenter">
          <Col xs="12">
            <Button color="primary" onClick={getLocation}>
              Use Current Location
            </Button>
          </Col>
        </Row> */}
      <Row>
        <Col xs="6">
          <div ref={mapElement} className="mapDiv" />
        </Col>
        <Col xs="6">
          <div className="coordinatesCard">
          <h4>Real Time Rover Data</h4>
            <ul className="list-group">
            <div className="jsonCoordinates">
              <p>{status}</p>
              {lat && <p>Latitude: {lat}</p>}
              {lng && <p>Longitude: {lng}</p>}
              {Acc && <p>Accuracy: {Acc}</p>}
              </div>
            </ul>
          </div>
          <div className="coordinatesInputs">
            <FormGroup>
              <Label for="longitude">Longitude</Label>
              <Input
                type="text"
                name="longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
              <Label for="latitude">Latitude</Label>
              <Input
                type="text"
                name="latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </FormGroup>
            <Row className="updateButton">
              <button onClick={updateMaps2}>
                Update Map
              </button>
            </Row>
            <div className="coordinatesCard">
                <h4>RTK Corrected Data</h4>
                {markers.map(({ latitude, longitude, name }, index) => (
             <div key={index} className="jsonCoordinates">
                <p>{name}</p>
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
            </div>
         ))}
      </div>

          <div className="distanceAndAccuracyCard">
            <h4>Distance and Accuracy</h4>
            <div className="jsonCoordinates">
            <p>Distance between markers: {distance.toFixed(2)} meters ({(distance * 100).toFixed(2)} cm)</p>
            <p>Accuracy of marker 1: {accuracyInCentimeters.toFixed(2)} cm</p>
            </div>
          </div>
          </div>

          
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default MapView;
