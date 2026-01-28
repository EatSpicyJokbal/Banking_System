import { createUser, findUser } from './user.service.js';
import { successResponse, regStatus, errorResponse } from '../utils/response.js';

const registerUser = async (req, res, next) => {
    try{
        
        const {
            email, 
            username, 
            password,
            first_name,
            last_name,
            middle_name,
            date_of_birth,
            phone_number
        } = req.body;

        const newUser = await createUser({username, email, phone_number, first_name, middle_name, last_name, date_of_birth, password});

        return regStatus(res, newUser, 201);
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try{

        const {
            username,
            password
        } = req.body;

        const loginSuccessful = await findUser({username, password});

        return successResponse(res, loginSuccessful, 200 );
    } catch (error) {
        next(error);
    }
}

export default { registerUser, loginUser };