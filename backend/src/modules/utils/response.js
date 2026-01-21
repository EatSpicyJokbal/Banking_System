

const successResponse = (res, {
    data = null,
    message = 'Success',
    statusCode = 200
} = {}) => {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data
    });
};

const regStatus = (res, {
    data = null,
    message = 'Registration Successful',
    statusCode = 201
} = {}) => {
    return res.status(statusCode).json({
        status: 'registration successful',
        message,
        data
    })
}

const errorResponse = (res, {
    data = null,
    message = 'Something went wrong',
    statusCode = 400
} = {}) => {
    return res.status(statusCode).json({
        status: 'something went wrong',
        message,
        data
    })
}

export {successResponse, regStatus, errorResponse};