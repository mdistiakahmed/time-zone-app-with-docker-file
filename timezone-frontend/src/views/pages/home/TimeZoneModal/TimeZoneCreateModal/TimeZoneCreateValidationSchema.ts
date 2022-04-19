import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';

export const TIMEZONE_CREATE_VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    name: yup.string().required('Please enter name'),
    city: yup.string().required('Please enter city'),
    hourDiff: yup
        .number()
        .min(-14, 'Min value -14')
        .max(12, 'Max value 12')
        .required('Please enter hour difference to GMT'),
    minuteDiff: yup
        .number()
        .min(0, 'Min value 0')
        .max(59, 'Max value 59')
        .required('Please enter minute difference to GMT'),
});
