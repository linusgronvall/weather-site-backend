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
// Get current weather by city name
router.get('/current/city', cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
      [WEATHER_API_KEY_NAME]: WEATHER_API_KEY_VALUE,
    });
    const apiRes = await needle(
      'get',
      `${WEATHER_API_BASE_URL}?${params}&units=metric`
    );
    const data = apiRes.body;

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

// GET
// Get current weather by coordinates
router.get('/current/coords', cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
      [WEATHER_API_KEY_NAME]: WEATHER_API_KEY_VALUE,
    });
    console.log(params);

    const apiRes = await needle(
      'get',
      `${WEATHER_API_BASE_URL}?${params}&units=metric`
    );
    const data = apiRes.body;

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});
