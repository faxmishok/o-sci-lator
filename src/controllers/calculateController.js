const asyncHandler = require('../middleware/asyncHandler');
const { PATH } = require('../constants/paths');
const evaluatex = require('evaluatex');
const mathjs = require('mathjs');

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

//@desc  Calculate Matrix API
//@route POST /calculate/matrix
exports.calculateMatrix = asyncHandler(async (req, res, next) => {
  const { opName, resultArray, resultArraySecond } = req.body;

  var result,
    m1 = resultArray,
    m2 = resultArraySecond;

  if (opName == '+') {
    result = mathjs.add(m1, m2);
  } else if (opName == '-') {
    m2 = mathjs.multiply(m2, -1);
    result = mathjs.add(m1, m2);
  } else if (opName == '*') {
    result = mathjs.multiply(m1, m2);
  } else if (opName == '/') {
    var invMatrix = mathjs.inv(m2);
    result = mathjs.multiply(m1, invMatrix);
  }

  // console.log(result);

  res.status(200).json({
    success: true,
    result: result,
  });
});
