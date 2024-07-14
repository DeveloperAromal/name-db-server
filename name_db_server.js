// require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());

// Initialize Supabase client using environment variables
const supabaseUrl = 'https://rfyjdozdievuivqdfieg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeWpkb3pkaWV2dWl2cWRmaWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkxMjgzNjYsImV4cCI6MjAzNDcwNDM2Nn0.7-MB8ZwCH8vm9Udff5ZPT1b3rPXwLinU4im_9YQG85A';
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/name', async (req, res) => {
  const email = req.query.email; // Assume email is passed as a query parameter
  if (!email) {
    return res.status(400).send('Email query parameter is required');
  }

  try {
    console.log(`Fetching data for email: ${email}`);
    const { data: userData, error } = await supabase
      .from("users")
      .select("name, date_of_birth")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).send('Internal Server Error');
    }

    if (!userData) {
      return res.status(404).send('User not found');
    }

    // Respond with the user's name and date of birth
    res.json({ name: userData.name, date_of_birth: userData.date_of_birth });

  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`name_db_server is running on http://localhost:${port} 🎉`);
});
