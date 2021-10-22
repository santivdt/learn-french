import { Grid, Box } from '@mui/material'
import Header from '../header/header'

export default function Layout({ children }) {
    return (
        <Box sx={{ backgroundColor: 'heellichtgroen.main' }}>
            <Grid
                container
                direction="column"
                style={{
                    minWidth: '100%',
                    height: '100vh',
                }}
            >
                <Grid item sx={{ minWidth: '100%' }}>
                    <Header />
                </Grid>
                <Grid
                    item
                    container
                    justifyContent="center"
                    sx={{ flexGrow: 1 }}
                    alignItems="center"
                >
                    <Grid item xs={10} sm={8} justifyContent="center">
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
