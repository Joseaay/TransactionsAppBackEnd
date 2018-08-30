
var express = require('express')
var router = express.Router()
var env = process.env.NODE_ENV || 'development';
var template = require('../config')[env].api.responseTemplate
var csv = require('csvtojson')
var appRoot = require('app-root-path');

router.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    return csv()
        .fromFile(appRoot.path + '/app/static/transactions.csv')
        .then((csvJsonObj) => {
            return res.json({
                ...template,
                code: template.code,
                result: {
                    transactions:
                        csvJsonObj.map(item => {
                            return {
                                ...item,
                                amount: {
                                    value: item.amount,
                                    currency: item.currency,
                                }
                            }
                        }),
                }
            });
        })
});

module.exports = router
