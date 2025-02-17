import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Function to call the API
const callApi = async () => {
    const payload = {
        schemaVersion: "1.0",
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
        channelName: "WEB",
        serviceName: "API_PURCHASE",
        serviceParams: {
            merchantUid: process.env.MERCHANT_UID,
            apiUserId: process.env.API_USER_ID,
            apiKey: process.env.API_KEY,
            paymentMethod: "MWALLET_ACCOUNT",
            payerInfo: {
                accountNo: "2526111111"
            },
            transactionInfo: {
                referenceId: uuidv4(),
                invoiceId: "154",
                amount: "10",
                currency: "USD",
                description: "Sample transaction description"
            }
        }
    };

    try {
        const response = await axios.post('https://api.example.com/asm', payload);
        console.log('API Response:', response.data);
    } catch (error) {
        console.error('Error calling API:', error);
    }
};

// Call the function
callApi();