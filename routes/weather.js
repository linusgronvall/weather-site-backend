const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

// Environment variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Init cache
let cache = apicache.middleware;

router.get('/city', cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
      [API_KEY_NAME]: API_KEY_VALUE,
    });
    const apiRes = await needle(
      'get',
      `${API_BASE_URL}?${params}&units=metric`
    );
    const data = apiRes.body;

    // Log request to public API
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/coords', cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
      [API_KEY_NAME]: API_KEY_VALUE,
    });
    console.log(params);

    const apiRes = await needle(
      'get',
      `${API_BASE_URL}?${params}&units=metric`
    );
    const data = apiRes.body;

    // Log request to public API
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
