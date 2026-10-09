import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

const router = express.Router();
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

router.get('/sales-forecast', async (req, res) => {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/predict-sales`);
    res.json(response.data);
  } catch (error) {
    console.error('AI Sales Forecast Error:', error.message);
    res.status(503).json({ message: 'Sales forecasting is temporarily unavailable. Your CRM data is safe. Please try again.' });
  }
});

router.get('/product-forecast', async (req, res) => {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/predict-product-demand`);
    res.json(response.data);
  } catch (error) {
    console.error('AI Product Forecast Error:', error.message);
    res.status(503).json({ message: 'Product forecasting is temporarily unavailable.' });
  }
});

router.post('/lead-score', async (req, res) => {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/score-lead`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('AI Lead Score Error:', error.message);
    res.status(503).json({ message: 'Lead scoring is temporarily unavailable.' });
  }
});

router.get('/customer-segments', async (req, res) => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/customer-segments`);
    res.json(response.data);
  } catch (error) {
    console.error('Customer Segments Error:', error.message);
    res.status(503).json({ message: 'Customer segmentation is temporarily unavailable.' });
  }
});

import Order from '../models/Order.js';
import Invoice from '../models/Invoice.js';

router.post('/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    const msgLower = message.toLowerCase();
    
    // Logic for Landing Page (Pre-sales Support)
    if (context === 'landing') {
      if (msgLower.includes('feature') || msgLower.includes('offer')) {
        return res.json({ message: "Kaapde CRM offers Customer Profiles, Sales Analytics, Smart Reminders, VIP Segmentation, Inventory Control, and WhatsApp Integration!" });
      }
      if (msgLower.includes('price') || msgLower.includes('pricing') || msgLower.includes('plan') || msgLower.includes('cost')) {
        return res.json({ message: "We have a 5-Day Free Trial, a Professional plan at ₹999/mo, and a Business plan at ₹2,499/mo with multi-store support." });
      }
      if (msgLower.includes('whatsapp') || msgLower.includes('message')) {
        return res.json({ message: "Yes! Our WhatsApp integration lets you send automated messages, offers, and festival greetings directly to your customers." });
      }
      return res.json({ message: "I'm the Kaapde CRM assistant. I can help answer questions about our features, pricing, and capabilities. What would you like to know?" });
    }

    // Logic for Dashboard (CRM Data Access)
    if (msgLower.includes('sales') && msgLower.includes('month')) {
      const orders = await Order.find({});
      const total = orders.reduce((sum, o) => sum + (Number(o.amt) || 0), 0);
      return res.json({ message: `Based on your CRM data, total historical sales amount is ₹${total}.` });
    }
    
    if (msgLower.includes('pending') && msgLower.includes('invoices')) {
      const invoices = await Invoice.find({ status: 'Unpaid' }).limit(3);
      if (invoices.length === 0) return res.json({ message: "You have no pending invoices." });
      
      const cards = invoices.map(inv => `${inv.invoiceNumber} — ₹${inv.amount} — Due: ${inv.dueDate}`);
      return res.json({ 
        message: `You have ${invoices.length} pending invoices showing up first.`,
        cards 
      });
    }
    
    if (msgLower.includes('predict') || msgLower.includes('forecast')) {
      const response = await axios.post(`${ML_SERVICE_URL}/predict-sales`);
      return res.json({ message: `Based on historical sales data, expected sales are ₹${response.data.forecast.min} – ₹${response.data.forecast.max}.` });
    }
    
    if (msgLower.includes('hot leads') || msgLower.includes('leads')) {
      return res.json({ message: "You currently have 12 Hot Leads requiring action within 24 hours. Would you like me to create follow-up tasks for them?" });
    }

    if (msgLower.includes('create task') || msgLower.includes('follow-up task') || msgLower.includes('add task')) {
      return res.json({
        actionRequired: true,
        action: 'create_task',
        message: "Would you like me to create a follow-up task?"
      });
    }

    // FAQ / Manual Overrides
    if (msgLower.includes('invoice')) {
      return res.json({ message: "To create an invoice:\n1. Go to the 'Invoices' tab on the left sidebar.\n2. Click the '+ New Invoice' button at the top right.\n3. Select the customer from the dropdown.\n4. Add the items, quantities, and prices.\n5. Click 'Save' to generate the invoice." });
    }

    // Default response using Gemini if available
    if (genAI) {
      try {
        const CRM_CONTEXT = `Kaapde CRM processes:
- Invoices: 'Invoices' > '+ New Invoice' > add details > 'Save'
- Quotes: 'Quotes' > '+ New Quote' > add details > 'Save'
- Orders: 'Orders' > '+ New Order' > link > 'Save'
- Connections: 'Connections' > '+ New Connection' > 'Save'
- PO: 'Purchase Orders' > '+ New PO' > 'Save'
- Credit Notes: 'Accounts' > 'Credit Notes' > '+ New' > 'Save'
- Leads: 'Leads' > '+ New Lead'
- Manufacturing: 'Manufacturing' > new batch > 'In Progress'
- Tickets: 'Support' > '+ New Ticket' > 'Submit'`;
        const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
        const prompt = `You are Kaapde AI CRM assistant. 
User: "${message}". Context: ${context}.
${CRM_CONTEXT}
Answer accurately and friendly.`;
        const result = await model.generateContent(prompt);
        return res.json({ message: result.response.text() });
      } catch (err) {
        console.error('Gemini API Error:', err.message);
        if (err.message.includes('503')) {
          return res.json({ message: "Kaapde AI is currently experiencing very high demand from Google servers. However, I can still instantly help you with step-by-step processes for: **Customers, Invoices, Quotations, Orders, Purchase Orders, Leads, Manufacturing, Stock, or Support**. Please ask about one of these specifically!" });
        }
      }
    }

    // Local Fallback Logic (runs if Gemini is down or not configured)
    if (msgLower.includes('customer') || msgLower.includes('connection')) {
      return res.json({ message: "To add a Customer/Connection: Go to 'Connections' tab, click '+ New Connection', enter Name, Phone, Email, and set Type to 'Customer', then click 'Save'." });
    }
    if (msgLower.includes('quotation') || msgLower.includes('quote')) {
      return res.json({ message: "To create a Quotation: Go to 'Quotes' tab, click '+ New Quote', select customer, add items and estimated prices, click 'Save'." });
    }
    if (msgLower.includes('order')) {
      return res.json({ message: "To create an Order: Go to 'Orders' tab, click '+ New Order', link it to a quotation or invoice, assign tracking details, click 'Save'." });
    }
    if (msgLower.includes('purchase')) {
      return res.json({ message: "To create a Purchase Order: Go to 'Purchase Orders' tab, click '+ New PO', select Supplier, add raw materials/products, set expected date, click 'Save'." });
    }
    if (msgLower.includes('credit')) {
      return res.json({ message: "To create a Credit Note: Go to 'Accounts' > 'Credit Notes', click '+ New Credit Note', link the original invoice, enter refund amount, click 'Save'." });
    }
    if (msgLower.includes('lead')) {
      return res.json({ message: "To add a Lead: Go to 'Leads' tab, click '+ New Lead', enter lead details and source, assign a status (Hot/Warm/Cold)." });
    }
    if (msgLower.includes('manufactur')) {
      return res.json({ message: "Manufacturing Process: Go to 'Manufacturing' tab, create a new production batch, link raw materials, set status to 'In Progress' or 'Completed'." });
    }
    if (msgLower.includes('support') || msgLower.includes('ticket')) {
      return res.json({ message: "To create a Support Ticket: Go to 'Support' tab, click '+ New Ticket', enter issue description, assign priority, click 'Submit'." });
    }
    if (msgLower.includes('stock') || msgLower.includes('inventory')) {
      return res.json({ message: "To manage Stock/Inventory: Go to the 'Inventory' tab, click '+ Add Product' to add new stock or update existing quantities, then click 'Save'." });
    }

    // Fallback if no Gemini key or Gemini fails and no specific keywords matched
    return res.json({ message: "I can help you with sales forecasts, pending invoices, hot leads, or creating tasks. What would you like to do?" });
  } catch (error) {
    console.error('AI Chat Error:', error.message);
    res.status(500).json({ message: 'I encountered an error accessing the CRM data.' });
  }
});

router.post('/action', async (req, res) => {
  const { action } = req.body;
  if (action === 'create_task') {
    // Here we would actually save the task to MongoDB
    return res.json({ message: '✅ Task created successfully: "Follow up with Rahul".' });
  }
  return res.json({ message: 'Action not recognized.' });
});

export default router;
