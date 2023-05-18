import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBadge from "components/MKBadge";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 PRO React components
import Card from "@mui/material/Card";
import SimpleBlogCard from "examples/Cards/BlogCards/SimpleBlogCard";

// Material Kit 2 PRO React components
import MKButton from "components/MKButton";

// Material Kit 2 PRO React examples
import DefaultFooter from "examples/Footers/DefaultFooter";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Coworking page sections

// Routes
import footerRoutes from "footer.routes";
import routes from "routes";
import FormMap from "components/FormMap";

// Images

function HomePage() {
  const actionProps = {
    type: "internal",
    route: "/pages/landing-pages/coworking",
    color: "dark",
    label: "find more",
  };
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-pro-react",
          label: "buy now",
          color: "info",
        }}
        sticky
      />
      <MKBox
        py={8}
        width="100%"
        sx={{
          display: "grid",
          placeItems: "center",
        }}
      ></MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
    
     <FormMap />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default HomePage;
