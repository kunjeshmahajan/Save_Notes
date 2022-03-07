import React from 'react'
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutline, SubjectOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import format from 'date-fns/format';
import { Avatar } from '@material-ui/core';

const drawerWidth =240

const useStyles = makeStyles((theme)=>{
    return{
        page:{
            background:'#f9f9f9',
            width:'100%',
            padding:theme.spacing(3)
        },
        drawer:{
            width: drawerWidth
        },
        drawerPaper:{
            width: drawerWidth
        },
        root:{
            display:'flex'
        },
        active:{
            background:"#f4f4f4"
        },
        title:{
            padding:theme.spacing(2)
        },
        appbar:{
            width:`calc(100% - ${drawerWidth}px)`
        },
        toolbar:theme.mixins.toolbar,
        date:{
            flexGrow:1
        },
        avatar:{
            marginLeft: theme.spacing(2)
        }
    }
   
})
export default function Layout({children}) {

    const classes = useStyles()
    const history =useHistory()
    const location = useLocation()

    const menuItems=[
        {
            text:"My Notes",
            icon:<SubjectOutlined color="secondary"/>,
            path:'/'
        },
        {
            text:"Create New Note",
            icon:<AddCircleOutline color="secondary"/>,
            path:'/create'
        }
    ]

  return (
    <div className={classes.root} >


      {/* App Bar */}
      <AppBar
        className={classes.appbar}
        elevation={0}
      >
          <Toolbar>
          <Typography className={classes.date}>
                  Today is {format(new Date(),'do MMMM y')}
              </Typography>
          <Typography >
                  Kunjesh
              </Typography>
              <Avatar src = "/Perso.jpeg" className={classes.avatar}/>
              
          </Toolbar>
      </AppBar>
    
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes ={{paper: classes.drawerPaper}}
      >
          <div >
              <Typography variant = "h5" className={classes.title}>
                   Kunjesh Notes
              </Typography>

          </div>

       <List>
           {menuItems.map(item => (
               <ListItem 
               button
               key={item.text}
               onClick={()=>history.push(item.path)}
               className={location.pathname == item.path ? classes.active:null}
               >
                     <ListItemIcon>{item.icon}</ListItemIcon>
                     <ListItemText>{item.text}</ListItemText>
               </ListItem>
           ))}
       </List>

          
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
                {children}
           
        </div>
       
            
    </div>
  )
}
