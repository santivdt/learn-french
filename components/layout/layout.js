import { Grid } from "@mui/material";
import Header from "../header/header";
import Footer from "../footer/footer";
import { ThemeProvider } from "@mui/private-theming";
import { theme } from "../theme.js";

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" justifyContent="space=between">
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <Grid item xs={0} sm={2} />
          <Grid item xs={12} sm={8}>
            <Grid container direction="row" sx={{ mt: 3 }} justifyContent="center">
              {children}
            </Grid>
          </Grid>
          <Grid item xs={0} sm={2} />
        </Grid>
        <Grid item>
          {/* <Footer /> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}