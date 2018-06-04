module.exports.sendJsonResponse = (res, status, content) => {
    content.statusCode = status;
    content.success = (status > 100 && status < 300) ? true : false;
    res.status(status);
    res.json(content);
}