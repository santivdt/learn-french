import { Grid } from '@mui/material'
import Header from '../header/header'
import Footer from '../footer/footer'

export default function Layout({ children }) {
  
    return (
        
            <Grid container direction="column" justifyContent="space=between">
                <Grid item>
                    <Header />
                </Grid>
                <Grid item container>
                    <Grid item xs={0} sm={2} />
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
                    <Grid item xs={0} sm={2} />
                </Grid>
                <Grid item>{/* <Footer /> */}</Grid>
            </Grid>
        
    )
}
