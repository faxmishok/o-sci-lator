const routerConf = (express, app) => {
  app.use('/upload', require('../routes/upload'));
};

module.exports = routerConf;
