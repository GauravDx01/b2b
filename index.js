const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;


const accessToken = '00DO8000001NKS5!AQEAQLArXogdDdP0QhHPKufRWSci3sih.wFTzYimecQS5zPzUvKKMnmKXOpx7A38AGqMjpv0eVVhsr2N7dUd1CZuQVbrYD8u';
const instanceUrl = 'https://beautyfashionsales--dx.sandbox.my.salesforce.com';
const email = 'staff@designersx.com.dx';
const password = 'DesignersX575';
const consumerKey = '3MVG99OxTyEMCQ3hqNYB7_tfGjDs0Ap6mq7R1pESCy3N06VqumLGSh7Kk3iiz5f7H8V0cSlKLa6F6X8QTgmeJ';
const consumerSecret = '6D8C3C2BA86CA575F74EB0F9FC7237CD12D97AEEFBEE28DF87F1AC49A96E1464';

app.get('/api/accounts', async (req, res) => {
  try {
    const response = await axios.get(`${instanceUrl}/services/data/v56.0/query`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        q: `SELECT Id, Name, Account_ID__c, AccountNumber, OwnerId FROM Account WHERE ownerId = '0053b00000DgAVKAA3'`
      }
    });

    res.json({
      totalRecords: response.data.totalSize,
      records: response.data.records ,
      // nexturl: response.data.nextUrl
    });
  } catch (error) {
    console.error('Error fetching accounts: ', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});


// login api 
app.post('/api/login', async (req, res) => {
    try {
      const response = await axios.post('https://beautyfashionsales--dx.sandbox.my.salesforce.com/services/oauth2/token', null, {
        params: {
          grant_type: 'password',
          client_id: "3MVG99OxTyEMCQ3hqNYB7_tfGjDs0Ap6mq7R1pESCy3N06VqumLGSh7Kk3iiz5f7H8V0cSlKLa6F6X8QTgmeJ" ,
          client_secret: "6D8C3C2BA86CA575F74EB0F9FC7237CD12D97AEEFBEE28DF87F1AC49A96E1464",
          username: "staff@designersx.com.dx",
          password: "DesignersX575"
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      
      res.json({
        accessToken: response.data.access_token,
        instanceUrl: response.data.instance_url,
        id: response.data.id,
        tokenType: response.data.token_type,
        issuedAt: response.data.issued_at,
        signature: response.data.signature
      });
    } catch (error) {
      console.error('Error during login: ', error);
      res.status(500).json({ error: 'Failed to login' });
    }

})

// Manufacture ke lie 
app.get('/api/manufacture', async (req, res) => {
  try {
    const response = await axios.get(`${instanceUrl}/services/data/v56.0/query`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        q: `SELECT Id, Name FROM Manufacturer__c`
      }
    });

    res.json({
      totalRecords: response.data.totalSize,
      records: response.data.records
    });
  } catch (error) {
    console.error('Error fetching manufacturer data: ', error);
    res.status(500).json({ error: 'Failed to fetch manufacturer data' });
  }
});
// Order-type ke lie 
app.get('/api/order-type', async (req, res) => {
  try {
    const response = await axios.get(`${instanceUrl}/services/data/v56.0/query`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        q: `SELECT Id, Type, Values, Name FROM Order`
      }
    });

    res.json({
      totalRecords: response.data.totalSize,
      records: response.data.records
    });
  } catch (error) {
    console.error('Error fetching manufacturer data: ', error);
    res.status(500).json({ error: 'Failed to fetch manufacturer data' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
