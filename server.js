const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Store your public key securely in environment variables
const VAPI_PUBLIC_KEY = process.env.VAPI_PUBLIC_KEY;

// Endpoint to initialize a new Vapi instance
app.post('/api/initialize-vapi', async (req, res) => {
  try {
    // Get any configuration options from the request
    const { assistantId, phoneNumberId, customer } = req.body;
    
    if (!assistantId || !phoneNumberId) {
      return res.status(400).json({ error: 'assistantId and phoneNumberId are required' });
    }
    
    // Use the provided function tools to create a call
    const callResponse = await create_call({
      assistantId,
      phoneNumberId,
      customer,
      name: req.body.name || `Call-${Date.now()}`
    });
    
    // Return the call information to the client
    return res.json({ 
      success: true, 
      call: callResponse
    });
  } catch (error) {
    console.error('Error initializing Vapi:', error);
    return res.status(500).json({ 
      error: 'Failed to initialize Vapi', 
      message: error.message 
    });
  }
});

// Endpoint to get call status
app.get('/api/call/:callId', async (req, res) => {
  try {
    const { callId } = req.params;
    
    // Get call information using the tool
    const call = await get_calls({ id: callId });
    
    return res.json({ success: true, call });
  } catch (error) {
    console.error('Error getting call:', error);
    return res.status(500).json({ 
      error: 'Failed to get call information', 
      message: error.message 
    });
  }
});

// Endpoint to list calls
app.get('/api/calls', async (req, res) => {
  try {
    const { assistantId, limit } = req.query;
    
    // List calls with optional filtering
    const calls = await get_call({
      assistantId,
      limit: limit ? parseInt(limit) : undefined
    });
    
    return res.json({ success: true, calls });
  } catch (error) {
    console.error('Error listing calls:', error);
    return res.status(500).json({ 
      error: 'Failed to list calls', 
      message: error.message 
    });
  }
});

// Endpoint to get phone numbers
app.get('/api/phone-numbers', async (req, res) => {
  try {
    const phoneNumbers = await get_phonenumbers({});
    
    return res.json({ success: true, phoneNumbers });
  } catch (error) {
    console.error('Error getting phone numbers:', error);
    return res.status(500).json({ 
      error: 'Failed to get phone numbers', 
      message: error.message 
    });
  }
});

// Endpoint to get assistants
app.get('/api/assistants', async (req, res) => {
  try {
    const assistants = await get_assistants({});
    
    return res.json({ success: true, assistants });
  } catch (error) {
    console.error('Error getting assistants:', error);
    return res.status(500).json({ 
      error: 'Failed to get assistants', 
      message: error.message 
    });
  }
});

// Endpoint to delete a call
app.delete('/api/call/:callId', async (req, res) => {
  try {
    const { callId } = req.params;
    
    // Delete the call
    await delete_call({ id: callId });
    
    return res.json({ success: true, message: 'Call deleted successfully' });
  } catch (error) {
    console.error('Error deleting call:', error);
    return res.status(500).json({ 
      error: 'Failed to delete call', 
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});