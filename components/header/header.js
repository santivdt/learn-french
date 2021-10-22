import {
    Typography,
    Toolbar,
    AppBar,
    IconButton,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { Nature, Menu, Home, Info, Star, Edit } from '@mui/icons-material'
import Link from 'next/Link'
import { useState } from 'react'
import styles from '../../styles/header.module.css'

export default function Header() {
    const [drawer, setDrawer] = useState(false)

    const toggleDrawer = () => {
        setDrawer(!drawer)
    }

    const menuItems = [
        {
            title: 'Home',
            url: '/',
            icon: <Home />,
        },
        {
            title: 'About',
            url: '/about',
            icon: <Info />,
        },
        {
            title: 'Quiz',
            url: '/quiz',
            icon: <Star />,
        },
        {
            title: 'Edit Data',
            url: '/editdata',
            icon: <Edit />,
        },
    ]

    return (
        <>
            <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
                <Box
                    sx={{ minWidth: 250, bgColor: 'background.paper' }}
                    role="presentation"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                    <List>
                        {menuItems.map((item, index) => {
                            return (
                                <Link key={index} href={item.url}>
                                    <ListItem button onClick={toggleDrawer}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItem>
                                </Link>
                            )
                        })}
                    </List>
                </Box>
            </Drawer>
            <AppBar position="static" color="blauw">
                <Toolbar>
                    <IconButton
                        edge="start"
                        size="large"
                        aria-label="tree"
                        sx={{ color: 'white' }}
                        onClick={toggleDrawer}
                    >
                        <Link href="/">
                            <Menu />
                        </Link>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, color: 'white' }}
                    >
                        <Link href="/">
                            <a className={styles.link}>B</a>
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}
