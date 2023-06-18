const express = require('express');
const router = express.Router();
const boxscore = require('../services/boxscore');

router.get('/', async (req, res, next) => {
  console.log('連線成功');
  res.status(200).json({
    message: 'success'
  });
});

router.post('/', async (req, res, next) => {
  try {
    const url = req.body.url;
    const data = await boxscore(url);
    res.status(200).json({
      message: 'success',
      data
    });
  }
  catch (err) {
    res.status(404).json({
      message: 'failed'
    });
  }
});

module.exports = router;
