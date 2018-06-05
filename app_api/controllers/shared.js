module.exports.sendJsonResponse = (res, status, content) => {
    content.statusCode = status;
    content.success = (status > 100 && status < 300) ? true : false;
    content.reason = getReason(status);
    res.status(status);
    res.json(content);
}

let getReason = (status) => {
    let reason = '';
    switch (status) {
        case 400:
            reason = '[Bad Request]';
            break;
        case 500:
            reason = '[Server Error]';
            break;
        case 503:
            reason = '[Server Unavailable]';
            break;
    }
    return reason;
};