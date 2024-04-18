import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { 
  IconButton, 
  AppBar, 
  Box, 
  Toolbar, 
  Typography 
} from '@mui/material';

import './Header.scss';

export function Header() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Expenses App
          </Typography>

          <IconButton aria-label="LogoutOutlined" onClick={handleSignOut}>
            <Logout className='logout'/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}