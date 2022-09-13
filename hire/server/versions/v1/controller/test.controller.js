const testService = require("../../../services/test.service");

const getTests = async (req, res) => {
    try {
        const tokenParams = req.token;
        const response = await testService.getTests(tokenParams);
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getTakeTest = async (req, res) => {
    try {
        const queryParams = req.query;
        const tokenParams = req.token;
        if (queryParams.instance_id != undefined) {
            const response = await testService.getTakeTest({
                ...queryParams,
                ...tokenParams
            });
            return res.status(200).send(response);
        }
        return res.status(200).send({ status: 1, message: "Instance id is missing" })
    } catch (err) {
        res.status(500).send(err.message);
    }
}

/**
 * @method POST
 * @param { o_id, email, role_id, batch_id } params
 * @description
 * * Method to auto assign test to user based on test_id.
 * @access public
 * @returns status
 */
const assignTest = async (req, res) => {
    try {
        const params = req.body;
        if(params.o_id && params.email && params.role_id && params.batch_id) {
            const response = await testService.assignTest(params);
            return res.status(200).send(response);
        }
        return res.status(200).send({ status: 0, message: "Required params are missing" });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports = { getTests, getTakeTest, assignTest };