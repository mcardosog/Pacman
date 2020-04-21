var express = require("express");
var router = express.Router();

const MonkeyLearn = require('monkeylearn')
const ml = new MonkeyLearn('ca636033ae891b5e12b7356bd1858c96820b19d1')

router.get("/:input", function(req, res, next) {
    const model_id = 'cl_bx2fW4Xi'
    let data = [req.params.input];
    ml.classifiers.classify(model_id, data).then(response => {
        let x = response.body
        console.log(x[0].classifications[0].tag_name);
        res.send(x[0].classifications[0].tag_name);
    }).catch((err)=>{
       console.log(err);
    });
});

module.exports = router;