// // const pg = require('pg');
// // const queries = require("../controllers/queries.js")

// // const getWhiskeys = (req, res) => {
// //   console.log('whiskey controller running')
// //   client.query(queries.getWhiskeys, (err, results) =>
// //     {if (err) {
// //       console.log("query failed")
// //     } else {
// //       res.status(200).json(results)
// //       console.log(res.rows[0])
// //     }
// //    })}

// // module.exports = {getWhiskeys};

const db = require('../DB/whiskeyModel');

// creating a whiskeyController object to add our methods
const whiskeyController = {};

// middleware to get whiskeys 
whiskeyController.getWhiskeys = (req, res, next) => {
  const getQuery = 'SELECT * FROM scotches'

  db.query(getQuery)
   .then(data => {
    res.locals.whiskeys = data.rows;
    return next();
   })
   .catch(err => next({
    log: 'whiskeyController.getWhiskeys',
    message: {err: 'Invalid database query'}
   }))

 };


 whiskeyController.addWhiskeys = async (req, res, next) => {
  try {

    const {
      id,
      title,
      list_img_url,
      region,
      price,
      rating,
      description,
    } = req.body.whisky 
    console.log('this is req.body.whisky.id', req.body.whisky.id)
    console.log('WHISKEY CONTROLLER');
    const values = [id, title, list_img_url, region, price, rating, description]
    const addQuery = `INSERT INTO scotches(id,title,img_url,region,price,rating,description)
                           VALUES ($1, $2, $3, $4, $5, $6, $7);` 
    
    const addWhiskeys = await db.query(addQuery, values)
    res.locals.addWhiskey = addWhiskeys;
     console.log('this is the added whiskey', req.body.whisky)
    return next()
  } catch (err) {
    return next({
      log: `whiskeyController.addWhiskeys: ERROR: ${err}`,
      status: 400,
      message: { err: 'Error occured in whiskeyController.addWhiskeys.' },
    });
   }
  
 }

whiskeyController.deleteWhiskeys =  async(req, res, next) => {
// const id = await req.params;
  console.log('MIDDLEWARE deleteWhiskey');
  // console.log('id is', id)
      console.log('this is req.body',req.body)
      console.log('this is req.body.id',req.body.id)
    // console.log('query is', req.query)
  try {
    const deleteQuery = `DELETE FROM scotches WHERE id=${req.body.id}` 
const deleteWhiskeys = await db.query(deleteQuery)
res.locals.deleteWhiskeys = deleteWhiskeys;

}  catch (err) {
  return next({
    log: `whiskeyController.deleteWhiskeys: ERROR: ${err}`,
    status: 400,
    message: { err: 'Error occured in whiskeyController.deleteWhiskeys.' },
  });
 }
}






module.exports = whiskeyController;