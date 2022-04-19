import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

interface FormInputProps {
    name: string;
    control: any;
    label: string;
    setValue?: any;
    type?: string;
    required?: boolean;
    disabled?: boolean;
}

export const FormInputText = ({
    name,
    control,
    label,
    type = 'text',
    required = false,
    disabled = false,
}: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    type={type}
                    variant="outlined"
                    required={required}
                    disabled={disabled}
                />
            )}
        />
    );
};
