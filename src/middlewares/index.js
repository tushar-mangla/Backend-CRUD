const { errorHandler } = require("../utils/helper");


const authenticateUser = (req, res, next) => {
    try {
        //get the jwt token from the headers
        const authToken = req.headers.authorization;
        //verify Jwt token and get the user object by decoding the token and assign the user to the res.locals

        if (!authToken) {
            return errorHandler(res, "Invalid Token.", 403);
        }

        res.locals.user = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        next();

    } catch (error) {
        if (error instanceof JWTEXPIREDERROR) {
            return errorHandler(res, "Unauthorized. Token Expired.", 401);
        } else if (error instanceof jwt.JsonWebTokenError) {
            return errorHandler(res, "Unauthorized. Invalid Token.", 401);
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Authorization logic middleware
const authorizeUser = (roles) => {
    return (req, res, next) => {
        const userRole = res.locals.user.role;
        //if user role is not in the roles array return error
        if (!roles.includes(userRole)) {
            return errorHandler(res, "You are not allowed to view this.", 403);
        }
        next();
    };
};


module.exports = { authenticateUser, authorizeUser }