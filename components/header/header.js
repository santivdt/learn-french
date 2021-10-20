import { Grid, Typography, Toolbar, AppBar, IconButton } from '@mui/material'
import { Nature } from '@mui/icons-material'
import Link from 'next/Link'

export default function Header() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton
                    edge="start"
                    size="large"
                    aria-label="tree"
                    sx={{ color: 'white' }}
                >
                    <Nature />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    B
                </Typography>
                <Grid container justifyContent="space-around">
                    <Grid item sx={{ ml: 6, mr: 4 }}>
                        <Link href="/about">About</Link>
                    </Grid>
                    <Grid item sx={{ ml: 4 }}>
                        <Link href="/quiz">Quiz</Link>
                    </Grid>
                    <Grid item sx={{ ml: 4 }}>
                        <Link href="/editdata">Edit data</Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
