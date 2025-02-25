import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Branchtruck = () => {
  const { id } = useParams();
  const [truckOrders, setTruckOrders] = useState([]);

  useEffect(() => {
    const fetchTruckOrders = async () => {
      try {
        const response = await axios.get(`/api/branchtracker/${id}`);
        setTruckOrders(response.data.truckOrders);
      } catch (error) {
        console.error('Error fetching truck orders:', error);
      }
    };

    fetchTruckOrders();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Truck Orders for Branch {id}</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Order Details</th>
          </tr>
        </thead>
        <tbody>
          {truckOrders.map((order, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">{order.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Branchtruck;