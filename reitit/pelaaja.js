module.exports = function (mysqlConnection) {
    const router = require("express").Router();
    router.get("/", (req, res) => {
        res.sendStatus(200);
    });
    return router;
};
