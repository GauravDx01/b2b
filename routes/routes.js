const express = require('express');
const router = express.Router();
const axios = require('axios');
const accessToken = "00DO8000001NKS5!AQEAQIY28RJymfKIuxwWfq6.mgk1Qa6Rk.fkgWufAzdsf6CDGzDyhQRy68gmSoLxQHUuJ9tmBb9ER7x.jGHDbCFUnNxOzl9.";
const instanceUrl = 'https://beautyfashionsales--dx.sandbox.my.salesforce.com';

router.get('/accounts', async (req, res) => {
    try {
      const response = await axios.get(`${instanceUrl}/services/data/v56.0/query`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          q: `SELECT Id, Name,Manufacturers_Names__c, Account_ID__c, AccountSource, AccountNumber, OwnerId from account where Active_Closed__c ='Active Account' `
        }
      });
  
      res.json({
        totalRecords: response.data.totalSize,
        records: response.data.records,
      });
    } catch (error) {
      console.error('Error fetching accounts: ', error);
      res.status(500).json({ error: 'Failed to fetch accounts' });
    }
  });

//   manufacturer ki api 
router.get('/manufacture/:id', async (req, res) => {
    const { id } = req.params; // Extract id as a string
    try {
      const response = await axios.get(`${instanceUrl}/services/data/v56.0/query`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          q: `SELECT Id, Name, OwnerId, CreatedById FROM Manufacturer__c WHERE OwnerId = '${id}' AND IsActive__c ='active'`
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
  router.get('/products', async (req, res) => {
    try {
      const response = await axios.get(`${instanceUrl}/services/data/v56.0/query`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          q: `SELECT Id, Name, Image_On_File__c, ProductUPC__c, ProductCode, Retail_Price__c, Product_Image__c, Tester_Margin__c, Category__c, Cost__c ,  	webkul_es_mage__Product_image__c ,Ship_Date__c , CreatedById
FROM Product2 
WHERE ManufacturerName__c = 'RMS Beauty' 
AND IsActive = true 
AND Category__c != 'PREORDER'`  
        }
      });
  
      res.json({
        totalRecords: response.data.totalSize,
        records: response.data.records
      });
    } catch (error) {
      console.error('Error fetching products data:', error.response ? error.response.data : error.message);
      res.status(500).json({ 
        error: 'Failed to fetch products data', 
        details: error.response ? error.response.data : error.message || 'No details available' 
      });
    }
  });
  
  
  module.exports = router;
  