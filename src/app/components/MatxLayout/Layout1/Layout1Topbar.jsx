import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  styled,
  Avatar,
  Hidden,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery
} from "@mui/material";

import { NotificationProvider } from "app/contexts/NotificationContext";

import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";

import { Span } from "app/components/Typography";
import ShoppingCart from "app/components/ShoppingCart";
import { MatxMenu, MatxSearchBox, TButton, TIconButton } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";
import { themeShadows } from "app/components/MatxTheme/themeColors";

import { topBarHeight } from "app/utils/constant";

import {
  Home,
  Menu,
  Person,
  Settings,
  WebAsset,
  MailOutline,
  StarOutline,
  PowerSettingsNew
} from "@mui/icons-material";
import React from "react";

import WishListIcon from '@mui/icons-material/Favorite'
import { Typography } from "antd";

// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user, role } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate()

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  const TopbarRoot = styled("div")({
    top: 0,
    padding: !user || role==='USER' ? '0 6em' : '0',
    zIndex: 96,
    borderBottom: '0.1em solid gray',
    height: !user || role==='USER' ? 80 : topBarHeight,
    // boxShadow: themeShadows[8],
    transition: "all 0.3s ease"
  });

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          {
            !user || role==='USER' ?
              <React.Fragment>
                <Avatar />
                <Box display='flex' alignItems='center' gap='1.5em' marginLeft='2em'>
                  <a href='/home'><Typography style={{fontWeight: '500', fontSize: '15px', textDecoration: 'underline'}}>Home</Typography></a>
                  <a href='/colors'><Typography style={{fontWeight: '500', fontSize: '15px'}}>All Colors</Typography></a>
                  <a href='/product/filter-product'><Typography style={{fontWeight: '500', fontSize: '15px'}}>Products</Typography></a>
                  <a href='/about'><Typography style={{fontWeight: '500', fontSize: '15px'}}>About</Typography></a>
                  <a href='/contact'><Typography style={{fontWeight: '500', fontSize: '15px'}}>Contact</Typography></a>
                </Box>
              </React.Fragment> :
              <React.Fragment>
                <StyledIconButton onClick={handleSidebarToggle}>
                  <Menu />
                </StyledIconButton>

                <IconBox>
                  <StyledIconButton>
                    <MailOutline />
                  </StyledIconButton>

                  <StyledIconButton>
                    <WebAsset />
                  </StyledIconButton>

                  <StyledIconButton>
                    <StarOutline />
                  </StyledIconButton>
                </IconBox>
              </React.Fragment>
          }
        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />
          {
            !user ?
              <React.Fragment>
                <Box display='flex' gap='0.8em'>
                  <TButton
                    title='Login'
                    label='Log in'
                    variant="outlined"
                    color='error'
                    fun={() => navigate('/session/signin')}
                  ></TButton>
                  <TButton
                    title='Signup'
                    label='Sign up'
                    variant="contained"
                    color='error'
                  ></TButton>
                </Box>
              </React.Fragment> :
              <React.Fragment>
                <NotificationProvider>
                  <NotificationBar />
                </NotificationProvider>
                {
                  role==='USER'?
                    <React.Fragment>
                      <TIconButton
                        title="Wish List"
                        icon={WishListIcon}
                        variant='outlined'
                      ></TIconButton>
                      <ShoppingCart />
                    </React.Fragment>
                  : ''  
                }
              </React.Fragment>
          }
          {
            !user ?
            '' :
            <MatxMenu
              menuButton={
                <UserMenu>
                  {/* <Hidden xsDown>
                    <Span>
                      Hi <strong>{user?user.username:''}</strong>
                    </Span>
                  </Hidden> */}
                  <Avatar src={user?user.avatar:''} sx={{ cursor: "pointer" }} />
                </UserMenu>
              }>
              <StyledItem>
                <Link to="/">
                  <Home />
                  <Span>Home</Span>
                </Link>
              </StyledItem>

              <StyledItem>
                <Link to="/page-layouts/user-profile">
                  <Person />
                  <Span>Profile</Span>
                </Link>
              </StyledItem>

              <StyledItem>
                <Settings />
                <Span>Settings</Span>
              </StyledItem>

              <StyledItem onClick={logout}>
                <PowerSettingsNew />
                <Span>Logout</Span>
              </StyledItem>
            </MatxMenu>
          }
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
