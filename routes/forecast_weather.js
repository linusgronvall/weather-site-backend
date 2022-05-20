const url = require('url');
const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache = require('apicache');

// Environment variables
const WEATHER_API_BASE_URL = process.env.WEATHER_API_BASE_URL;
const WEATHER_API_KEY_NAME = process.env.WEATHER_API_KEY_NAME;
const WEATHER_API_KEY_VALUE = process.env.WEATHER_API_KEY_VALUE;

// Init cache
let cache = apicache.middleware;

// GET
// Get forecasted weather by city name
router.get('/forecast/city', cache('2 minutes'), async (req, res) => {
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

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

// GET
// Get forecasted weather by coordinates
router.get('/forecast/coord', cache('2 minutes'), async (req, res) => {
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

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = router;
