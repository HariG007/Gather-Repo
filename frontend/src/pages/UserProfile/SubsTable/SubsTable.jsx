import React from 'react';
import './SubsTable.css';
import { Link } from 'react-router-dom';

const SubsTable = () => {
  const subscriptionData = [
    { serialPortNo: 'COM1', baseStation: 'Station A', mountPoint: 'Point A', status: 'Active' },
    { serialPortNo: 'COM2', baseStation: 'Station B', mountPoint: 'Point B', status: 'Not Active' },
    { serialPortNo: 'COM3', baseStation: 'Station C', mountPoint: 'Point C', status: 'Not Active' },
    { serialPortNo: 'COM4', baseStation: 'Station D', mountPoint: 'Point D', status: 'Not Active' },
  ];

  return (
    <div style={{ width: '1400px',paddingTop:'105px',marginRight:'10px'}} className="container-xl px-4 mt-4">
         
      <div className="card mb-4" style={{paddingBottom:'60px'}}>
        <div className="card-header">• • •
        <Link style={{textDecoration:'none'}} to={'/datasubcription'}><button style={{padding:'10px 20px ',borderRadius:'5px',color:'white',marginTop:'10px',background:'darkblue',marginLeft:'380px',width:'230px'}}>Add Data Subscription+</button></Link>

        </div>
        <div className="card-body p-0">
          <div className="table-responsive table-billing-history">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th className="border-gray-200" scope="col">Serial Port No</th>
                  <th className="border-gray-200" scope="col">Base Station</th>
                  <th className="border-gray-200" scope="col">Mount Point</th>
                  <th className="border-gray-200" scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {subscriptionData.map((subscription, index) => (
                  <tr key={index}>
                    <td>{subscription.serialPortNo}</td>
                    <td>{subscription.baseStation}</td>
                    <td>{subscription.mountPoint}</td>
                    <td>
                      <span className={`badge ${subscription.status === 'Active' ? 'bg-success' : 'bg-light text-dark'}`}>
                        {subscription.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubsTable;
