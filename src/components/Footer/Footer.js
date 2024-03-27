import { Typography, BottomNavigation } from "@mui/material";
import "./Footer.css";

const Footer = () => 
    {
        return (
                    <BottomNavigation >
                        <Typography paragraph className="footer-txt">&copy; All rights reserved.Straive</Typography>
                    </BottomNavigation>
                )
    }
export default Footer;
