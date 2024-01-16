import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";

const Footer = styled("footer")({
  background: "#efeaeab3",
  color: "#000",
  padding: "20px 0",
});

const Logo = styled("p")({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "10px",
});

const LinkGroup = styled("div")({
  display: "flex",
  gap: "10px",
});

const SocialIcons = styled("div")({
  display: "flex",
  gap: "10px",
});

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Footer className="static">

        <Toolbar className="flex-col">
          <div className="flex justify-between w-full pb-6 border-b">
            <div className="leftFooter">
              <Logo>Logo Here...</Logo>
              <Typography variant="body2">
                Explore More Attractive Products Here
              </Typography>
            </div>
            <div className="rightFooter">
              <LinkGroup>
                <p>Home</p>
                <p>About</p>
                <p>Contact</p>
                <p>Cart</p>
              </LinkGroup>
              <SocialIcons>
                <FacebookRoundedIcon />
                <TwitterIcon />
                <InstagramIcon />
                <GoogleIcon />
              </SocialIcons>
            </div>
          </div>

          <div className="flex justify-between w-full pt-2">
            <Typography variant="body2">Privacy Policy</Typography>
            <Typography variant="body2">@2023 Cloths</Typography>
            <Typography variant="body2">Terms & Conditions</Typography>
          </div>
        </Toolbar>
      </Footer>
    </React.Fragment>
  );
}
