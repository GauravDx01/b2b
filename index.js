const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

const router = require('./routes/routes')

const cors = require('cors')
app.use(cors())

const email = 'staff@designersx.com.dx';
const password = 'DesignersX575';
const consumerKey = '3MVG99OxTyEMCQ3hqNYB7_tfGjDs0Ap6mq7R1pESCy3N06VqumLGSh7Kk3iiz5f7H8V0cSlKLa6F6X8QTgmeJ';
const consumerSecret = '6D8C3C2BA86CA575F74EB0F9FC7237CD12D97AEEFBEE28DF87F1AC49A96E1464';
app.use('/api' , router)




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





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
