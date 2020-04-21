var express = require("express");
var router = express.Router();

const MonkeyLearn = require('monkeylearn')
const ml = new MonkeyLearn('5f03052dd89ec3b68b2fcb030b7109a6022c2914')

router.get("/:input", function(req, res, next) {
    const model_id = 'cl_oSrfpf84'
    let data = [req.params.input];
    ml.classifiers.classify(model_id, data).then(response => {
        let x = response.body
        res.send(x[0].classifications[0].tag_name);
    }).catch((err)=>{
       console.log(err);
    });
});

module.exports = router;