const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { testService } = require('../services');

const createTest = catchAsync(async (req, res) => {
  const test = await testService.createTest(req.body);
  res.status(httpStatus.CREATED).send(test);
});

const getTests = catchAsync(async (req, res) => {
  const myCustomLabels = {
    totalDocs: 'totalPages',
    docs: 'results',
  };
  var query = {};
  var options = {
    // pagination: false, //show all results
    // select: 'title date author',
    // sort: req.query.sortBy==null ? { name: -1 } : {req.query.sortBy: 1},
    populate: 'clinic_id',
    // lean: true,  //make query faster
    page: req.query.page==null ? 1 : req.query.page,
    limit: req.query.limit==null ? 10 : req.query.limit,
    customLabels: myCustomLabels,
  };

  const result = await testService.queryTests(query, options);
  res.send(result);  //to get user id from token   req.user.id
});


module.exports = {
    createTest,
    getTests,
};
