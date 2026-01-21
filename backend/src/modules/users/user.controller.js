import createUser from './user.service.js';
import { successResponse, regStatus, errorResponse } from '../utils/response.js';

const registerUser = async (req, res, next) => {
    try{
        console.log('Request body:', req.body);  // Debug log
        
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

        console.log('Extracted values:', {email, username, password, first_name, last_name, middle_name, date_of_birth, phone_number});  // Debug log

        // Validate required fields
        if (!password || !email || !username) {
            return errorResponse(res, {
                message: 'Missing required fields: email, username, password',
                statusCode: 400
            });
        }

        const newUser = await createUser({username, email, phone_number, first_name, middle_name, last_name, date_of_birth, password});

        return successResponse(res, newUser, 201);
    } catch (error) {
        next(error);
    }
}

export default { registerUser };