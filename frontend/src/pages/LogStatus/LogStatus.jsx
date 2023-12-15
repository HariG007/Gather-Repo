import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import '../LogStatus/LogStatus.css';
import { CSVLink } from 'react-csv';
import Sidebar from "../../components/sidebar/Sidebar";
import ExportButton from "../../elements/ExportButton/ExportButton";
export default function LogTable() {
  const column = [
    {
      name: "Timestamp (IST)",
      selector: (row) => row.timestamp,
      width: "200px",
    },
    {
      name: "Correction Type",
      selector: (row) => row.correctionType,
      width: "150px",
    },
    {
      name: "Source",
      selector: (row) => row.source,
      width: "150px",
    },
    {
      name: "Mount Point",
      selector: (row) => row.mountPoint,
      width: "150px",
    },
    {
      name: "Latitude (°N)",
      selector: (row) => row.latitude,
      width: "100px",
    },
    {
      name: "Longitude (°E)",
      selector: (row) => row.longitude,
      width: "100px",
    },
    {
      name: "Elevation (m)",
      selector: (row) => row.elevation,
      width: "100px",
    },
    {
      name: "Correction Data",
      selector: (row) => row.correctionData,
      width: "200px",
    },
  ];
  // Define a function to retrieve data from local storage
  const getDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("logData");
    return savedData ? JSON.parse(savedData) : [];
  };
  const [data, setData] = useState(getDataFromLocalStorage());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    // Store the data in local storage when the component updates
    localStorage.setItem("logData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    // Here, you should fetch or set your log data, which would be an array of objects similar to the example values provided.
    // For this example, I'll use the example log entries as the initial data.
    const initialData = [
      {
        timestamp: "2023-10-29 15:30:00 IST",
        correctionType: "RTCM 3.2",
        source: "Local Base",
        mountPoint: "DELGNSS01",
        latitude: "28.612347° N",
        longitude: "77.234566° E",
        elevation: "210.5 m",
        correctionData:
          "RTCM 1077 ( 156): staid=    0 2023/10/29  15:30:00 nsat= 9 nsig = 1 iod=0 ncell= 9 sync=1",
      },
      {
        timestamp: "2023-10-29 15:31:00 IST",
        correctionType: "RTCM 3.2",
        source: "Regional Ref.",
        mountPoint: "DELGNSS01", // Matching mount point
        latitude: "28.612346° N", // Matching latitude
        longitude: "77.234566° E", // Matching longitude
        elevation: "98.0 m",
        correctionData:
          "RTCM 1087 ( 112): staid=    0 2023/10/29  15:31:00 nsat= 6 nsig = 1 iod=0 ncell= 6 sync=0",
      },
      {
        timestamp: "2023-10-29 15:32:00 IST",
        correctionType: "RTCM 3.2",
        source: "Local Base",
        mountPoint: "DELGNSS01", // Matching mount point
        latitude: "28.612344° N", // Matching latitude
        longitude: "77.234567° E", // Matching longitude
        elevation: "109.2 m",
        correctionData:
          "RTCM 1077 ( 156): staid=    0 2023/10/29  15:32:00 nsat= 6 nsig = 1 iod=0 ncell= 6 sync=0", // Updated staid and timestamp
      },
      {
        timestamp: "2023-10-29 15:33:00 IST",
        correctionType: "RTCM 3.3",
        source: "National Ref.",
        mountPoint: "DELGNSS01", // Matching mount point
        latitude: "28.612345° N", // Matching latitude
        longitude: "77.234567° E", // Matching longitude
        elevation: "95.8 m",
        correctionData:
          "RTCM 1077 ( 156): staid=    0 2023/10/29  15:33:00 nsat= 9 nsig = 1 iod=0 ncell= 9 sync=1", // Updated staid and timestamp
      },
      {
        timestamp: "2023-10-27 12:43:00 IST",
        correctionType: "RTCM 3.2",
        source: "Local Base",
        mountPoint: "DELGNSS01", // Same mountPoint
        latitude: "28.612345° N", // Same latitude
        longitude: "77.234567° E", // Same longitude
        elevation: "102.5 m",
        correctionData:
          "RTCM 1087 ( 112): staid=    0 2023/10/27  12:43:00 nsat= 6 nsig = 1 iod=0 ncell= 6 sync=0",
      },
      {
        timestamp: "2023-10-29 12:42:00 IST",
        correctionType: "RTCM 3.2",
        source: "Regional Ref.",
        mountPoint: "DELGNSS01", // Same mountPoint
        latitude: "28.612345° N", // Same latitude
        longitude: "77.234567° E", // Same longitude
        elevation: "105.0 m",
        correctionData: " RTCM 1077 ( 156): staid=    0 2023/10/29  12:42:00 nsat= 9 nsig = 1 iod=0 ncell= 9 sync=1",
      },
      {
        timestamp: "2023-10-27 12:37:00 IST",
        correctionType: "RTCM 3.3",
        source: "National Ref.",
        mountPoint: "DELGNSS01", // Same mountPoint
        latitude: "28.612345° N", // Same latitude
        longitude: "77.234567° E", // Same longitude
        elevation: "88.9 m",
        correctionData:
          "RTCM 1087 ( 112): staid=    0 2023/10/27  12:37:00 nsat= 6 nsig = 1 iod=0 ncell= 6 sync=0",
      },
      {
        timestamp: "2023-10-29 12:36:00 IST",
        correctionType: "RTCM 3.3",
        source: "Regional Ref.",
        mountPoint: "DELGNSS01", // Same mountPoint
        latitude: "28.612345° N", // Same latitude
        longitude: "77.234567° E", // Same longitude
        elevation: "96.7 m",
        correctionData:
          "RTCM 1077 ( 156): staid=    0 2023/10/29  12:36:00 nsat= 9 nsig = 1 iod=0 ncell= 9 sync=1"
      },
      {
        timestamp: "2023-10-27 18:55:00 IST",
        correctionType: "RTCM 3.3",
        source: "Local Base",
        mountPoint: "KOLGNSS09",
        latitude: "22.345678° N",
        longitude: "88.123456° E",
        elevation: "110.2 m",
        correctionData:
          "RTCM 1077 ( 156): staid=    0 2023/10/27  18:55:00 nsat= 9 nsig = 1 iod=0 ncell= 9 sync=1",
      },
      {
        timestamp: "2023-10-27 18:53:00 IST",
        correctionType: "RTCM 3.2",
        source: "National Ref.",
        mountPoint: "KOLGNSS09",
        latitude: "22.345678° N",
        longitude: "88.123456° E",
        elevation: "97.5 m",
        correctionData:
          "RTCM 1087 ( 112): staid=    0 2023/10/27  18:53:00 nsat= 6 nsig = 1 iod=0 ncell= 6 sync=0",
      },

      // Add more log entries here...
    ];
    setData(initialData);
    setFilter(initialData);
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      return (
        item.timestamp.toLowerCase().includes(search.toLowerCase()) ||
        item.correctionType.toLowerCase().includes(search.toLowerCase()) ||
        item.source.toLowerCase().includes(search.toLowerCase()) ||
        item.mountPoint.toLowerCase().includes(search.toLowerCase())
        // Add similar lines for other properties you want to filter by
      );
    });
    setFilter(result);
  }, [search]);

  return (
    <div style={{display:'flex',width:'100%',marginBottom:'100px',marginTop:'30px'}}>
    <Sidebar/>
    <div className="container">
      <React.Fragment>
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <span>Logging Table</span>
        </div>
        <div>
          {/* Button for exporting data to JSON */}
          <button
          style={{marginRight:'20px'}}
            onClick={() => {
              const jsonContent = JSON.stringify(data);
              const blob = new Blob([jsonContent], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'logData.json');
              document.body.appendChild(link);
              link.click();
            }}
          >
            <ExportButton lable={"Export to JSON"}/>
          </button>
          

          {/* CSV Export button */}
          
          <CSVLink data={data}  filename={'logData.csv'}>
          <ExportButton lable={"Export to CSV"}/>
            </CSVLink>
        
        </div>

        <DataTable
          columns={column}
          data={filter}
          pagination
          selectableRows
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="w-25 form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
          subHeaderAlign="right"
        />

      </React.Fragment>
    </div>
    </div>
  );

}