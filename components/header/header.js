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
    Link as MUILink,
} from '@mui/material'
import { Menu, Home, Info, Star, Edit, Add } from '@mui/icons-material'
import Link from 'next/link'
import { useState } from 'react'

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
        {
            title: 'Add Data',
            url: '/adddata',
            icon: <Add />,
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
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, color: 'white' }}
                    >
                        <Link href="/" passHref>
                            <MUILink variant="h6" color="#FFF">
                                Bravo
                            </MUILink>
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}
