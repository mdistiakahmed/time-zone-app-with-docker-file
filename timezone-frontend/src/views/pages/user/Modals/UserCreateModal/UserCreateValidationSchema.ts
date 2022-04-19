import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';

export const USER_CREATE_VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    email: yup.string().email().required('Please enter email'),
    password: yup.string().min(6, 'Minimum 6 Characters'),
    role: yup.string().required('Please select role'),
});
