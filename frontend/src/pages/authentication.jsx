import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#FF9839', // MeetX Orange
        },
        secondary: {
            main: '#2c3e50',
        },
    },
});

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            console.log(err);
            let message = (err.response?.data?.message) || "Something went wrong";
            setError(message);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                
                {/* Left Side: Professional Image/Overlay */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                    }}
                >
                    {/* Glassmorphism Overlay on the image */}
                    <Box sx={{ p: 4, bgcolor: 'rgba(0,0,0,0.5)', borderRadius: 2, textAlign: 'center', backdropFilter: 'blur(5px)' }}>
                        <Typography variant="h3" fontWeight="bold">MeetX ❤️</Typography>
                        <Typography variant="h6">The Future of Video Collaboration</Typography>
                    </Box>
                </Grid>

                {/* Right Side: Authentication Form */}
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
                            {formState === 0 ? "Welcome Back!" : "Join MeetX"}
                        </Typography>

                        <div style={{ marginBottom: '20px' }}>
                            <Button 
                                variant={formState === 0 ? "contained" : "outlined"} 
                                sx={{ mr: 1, borderRadius: '20px' }} 
                                onClick={() => { setFormState(0); setError(""); }}
                            >
                                Sign In
                            </Button>
                            <Button 
                                variant={formState === 1 ? "contained" : "outlined"} 
                                sx={{ borderRadius: '20px' }} 
                                onClick={() => { setFormState(1); setError(""); }}
                            >
                                Sign Up
                            </Button>
                        </div>

                        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal" required fullWidth label="Full Name"
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            )}

                            <TextField
                                margin="normal" required fullWidth label="Username"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                            />
                            
                            <TextField
                                margin="normal" required fullWidth label="Password"
                                type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}

                            <Button
                                type="button" fullWidth variant="contained"
                                sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </ThemeProvider>
    );
}