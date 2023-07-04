import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginData from '../../model/LoginData';
import InputResult from '../../model/InputResult';
import { Alert, Snackbar } from '@mui/material';
import { useRef, useState } from 'react';
import { StatusType } from '../../model/StatusType';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
type Props = {
  submitFn: (nEmployees: number) => Promise<InputResult>
}

const GenerateEmployeesForm: React.FC<Props> = ({ submitFn }) => {
  const [open, setOpen] = useState(false)
  const message = useRef<string>("");
  const severity = useRef<StatusType>("success");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nEmployees: number = +(data.get("nEmployees") as string);
    const result = await submitFn(nEmployees);
    message.current = (result.message || "")
    message.current && setOpen(true)
    severity.current = result.status
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Generate employees
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              helperText={`enter number of employees in range [${1}-${50}]`}
              inputProps={{
                min: `${1}`,
                max: `${50}`
              }}
              defaultValue={1}
              margin="normal"
              required
              fullWidth
              name="nEmployees"
              label="Number of employees"
              type="number"
              id="nEmployees"
              autoComplete="number of employees"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Generate
            </Button>
          </Box>
          <Snackbar open={open} autoHideDuration={6e3} onClose={() => setOpen(false)}>
            <Alert severity={severity.current} onClose={() => setOpen(false)}>
              {message.current}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider >
  );
}

export default GenerateEmployeesForm;