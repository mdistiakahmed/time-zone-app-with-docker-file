import Typography from '@mui/material/Typography';
import { FormInputText } from '../../forms/FormInputText';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from '@mui/material';
import useSignUpData from './useSignUpData';

const Signup = () => {
    const { handleSubmit, control, handleSignUpFormSubmit, busy } =
        useSignUpData();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={handleSubmit(handleSignUpFormSubmit)}
                    id="signupForm"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormInputText
                                name="email"
                                control={control}
                                label="Email"
                                required={true}
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="password"
                                control={control}
                                label="Password"
                                type="password"
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="confirmPassword"
                                control={control}
                                label="Confirm Password"
                                type="password"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        loading={busy}
                        endIcon={<LoginIcon />}
                        loadingPosition="end"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Signup;
