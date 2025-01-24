const errorHandle = (error, req, res) => {
    console.log(error)

    const status = error.status || 500;
    const message = error.message || 'Algo salió mal, por favor intente nuevamente';

    return res.status(status).json({
        success: false,
        message,
    });
};

export default errorHandle;