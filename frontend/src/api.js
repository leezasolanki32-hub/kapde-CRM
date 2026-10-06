import axios from 'axios';
import { API_BASE_URL } from './config';

const getHeaders = (userId) => {
    return {
        'user-id': userId
    };
};

export const api = {
    // Orders
    getOrders: async (userId) => {
        const response = await axios.get(`${API_BASE_URL}/api/orders`, { headers: getHeaders(userId) });
        return response.data;
    },
    createOrder: async (userId, orderData) => {
        const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData, { headers: getHeaders(userId) });
        return response.data;
    },
    
    // Customers (from connections)
    getCustomers: async (userId) => {
        const response = await axios.get(`${API_BASE_URL}/api/connections?category=Customer`, { headers: getHeaders(userId) });
        return response.data;
    },
    createCustomer: async (userId, customerData) => {
        const response = await axios.post(`${API_BASE_URL}/api/connections`, { ...customerData, category: 'Customer' }, { headers: getHeaders(userId) });
        return response.data;
    },
    
    // Invoices
    getInvoices: async (userId) => {
        const response = await axios.get(`${API_BASE_URL}/api/invoices`, { headers: getHeaders(userId) });
        return response.data;
    },
    
    // Quotations
    getQuotations: async (userId) => {
        const response = await axios.get(`${API_BASE_URL}/api/quotations`, { headers: getHeaders(userId) });
        return response.data;
    },

    // Purchase Orders
    getPurchaseOrders: async (userId) => {
        const response = await axios.get(`${API_BASE_URL}/api/purchase-orders`, { headers: getHeaders(userId) });
        return response.data;
    },

    // Supplier Invoices
    getSupplierInvoices: async (userId) => {
        const response = await axios.get(`${API_BASE_URL}/api/supplier-invoices`, { headers: getHeaders(userId) });
        return response.data;
    },

    // Credit Notes
    getCreditNotes: async (userId) => {
        const response = await axios.get(`${API_BASE_URL}/api/credit-notes`, { headers: getHeaders(userId) });
        return response.data;
    }
};
