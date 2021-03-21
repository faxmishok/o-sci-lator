const routerConf = (express, app) => {
  app.use('/upload', require('../routes/upload'));
  app.use('/calculate', require('../routes/calculate'));
};

module.exports = routerConf;
