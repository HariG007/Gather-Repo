
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import allBaseStations from "../DataSubcription/NearbyBasestation/BaseStationLocData.json";
import { calculateDistance } from "./NearbyBasestation/Calculation";
import { Container, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import Sidebar from "../../components/sidebar/Sidebar";

const FormContainer = styled("form")({
  display: "flex",
  backgroundColor: (theme) => theme.palette.primary.main,
  flexDirection: "column",
  alignItems: "center",
  marginTop: "5%",
  padding: "50px",
  maxWidth: "500px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
  borderRadius: "8px",
});

const TextFieldStyled = styled(TextField)({
  marginBottom: "16px",
});

const ButtonStyled = styled(Button)({
  // Add any styling you need for your buttons
  backgroundColor:"darkblue",
  color:"white",
  padding:"10px 60px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
});

function DataSubscriptionPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    mountPoint: "",
    duration: "",
    delay: "", // Change correctionType to delay
    correctionType: "", // Keep correctionType if it is still needed elsewhere
    dataFormat: "",
    dataRate: "",
    username: "",
    password: "",
    subscriptionName: "",
  });
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyBaseStations, setNearbyBaseStations] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(location);

        const nearbyStations = allBaseStations.filter((baseStation) => {
          const distance = calculateDistance(location, baseStation.location);
          return distance <= 10;
        });

        setNearbyBaseStations(nearbyStations);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  const sections = [
    ["mountPoint", "duration", "delay"], // Change correctionType to delay
    ["correctionType", "dataFormat", "dataRate"], // Change region to correctionType
    ["username", "password", "subscriptionName"],
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setFormData({
      mountPoint: "",
      duration: "",
      delay: "",
      correctionType: "",
      dataFormat: "",
      dataRate: "",
      username: "",
      password: "",
      subscriptionName: "",
    });
    setActiveStep(0);
  };

  return (
    <div style={{ display: "flex", width: "100%", paddingRight: "240px" }}>
      <Sidebar />
      <Container className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <span>Data Subscription</span>
        </div>

        <p></p>
        <center>
          <FormContainer
            onSubmit={
              activeStep === sections.length - 1 ? handleSubscribe : handleNext
            }
          >
            {sections[activeStep].map((field) => (
              <React.Fragment key={field}>
                <TextFieldStyled
                  name={field}
                  label={`Enter ${field}`}
                  variant="outlined"
                  fullWidth
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
                <p></p>
              </React.Fragment>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              {activeStep > 0 && (
                <ButtonStyled
                  onClick={handlePrevious}
                  style={{ marginRight: "10px" }}
                >
                  Previous
                </ButtonStyled>
              )}

              {activeStep < sections.length - 1 ? (
                <ButtonStyled type="button" onClick={handleNext}>
                  Next
                </ButtonStyled>
              ) : (
                <ButtonStyled type="submit">Subscribe</ButtonStyled>
              )}
            </div>
          </FormContainer>
        </center>
      </Container>
    </div>
  );
}

export default DataSubscriptionPage;