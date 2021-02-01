import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import SettingsIcon from '@material-ui/icons/Settings';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import logo from '../Assets/Step Up Careers Logo.svg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    root2: {
        flexGrow: 1,
    },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  imageStyle:{
    marginTop: '10px',
    marginBottom: '10px'
  },
//   toolbar: theme.mixins.toolbar,
  toolbar:{
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '800px',
  },
  content: {
    flexGrow: 1,
    // backgroundColor: '#eeeeee',
    padding: theme.spacing(3),
  },
}));


export default function TempNavigation({...props}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };
  React.useEffect(()=>{
      console.log(props.children)
  })

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      {/* <div className={classes.root2}>
        <AppBar position="fixed" className={classes.appBar}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
      </div> */}
      {/* <AppBar
        position="fixed"
        title={<h1>Hello</h1>}
      /> */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <center><a href="/"><img className={classes.imageStyle} src={logo} width={"80%"}/></a>
        <div className={classes.toolbar}>
        <Divider/><br/>
        <List>
          {['Home', 'Job Search', 'Goals', 'Settings'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>
                    {text === "Home"?
                        <HomeIcon/>
                    :text === "Job Search"?
                        <WorkIcon/>
                    :text === "Goals"?
                        <AccessibilityIcon/>
                    : <SettingsIcon/>
                    }
                </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </div></center>
      </Drawer>
    </div>
  );
}
