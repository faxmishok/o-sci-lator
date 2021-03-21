const asyncHandler = require('../middleware/asyncHandler');
const { PATH } = require('../constants/paths');
const evaluatex = require('evaluatex');

//@desc   Calculate sent expression
//@route  POST /calculate
exports.calculateExpression = asyncHandler(async (req, res, next) => {
  const { expression, variables } = req.body;

  //check if any variables are sent
  if (Object.keys(variables).length !== 0) {
    var vars = { ...variables };
    for (var key in variables) {
      vars[key] = parseInt(vars[key]);
    }
  }
  const fn = evaluatex(expression, vars, { latex: true });
  const result = fn();

  res.status(200).json({
    success: true,
    result: result,
  });
});
