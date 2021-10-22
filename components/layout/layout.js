import { Grid, Box } from '@mui/material'
import Header from '../header/header'

export default function Layout({ children }) {
    return (
        <Box sx={{ backgroundColor: 'heellichtgroen.main' }}>
            <Grid
                container
                direction="column"
                justifyContent="space=between"
                style={{
                    border: 'solid',
                    minWidth: '100%',
                    height: '100vh',
                }}
            >
                <Grid item>
                    <Header />
                </Grid>
                <Grid
                    item
                    container
                    justifyContent="center"
                    sx={{ flexGrow: 1 }}
                >
                    <Grid item xs={12} sm={8}>
                        <Grid
                            container
                            direction="row"
                            sx={{ mt: 3 }}
                            justifyContent="center"
                        >
                            {children}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>{/* <Footer /> */}</Grid>
            </Grid>
        </Box>
    )
}
