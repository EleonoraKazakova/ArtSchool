import "../styles/footer.sass";
import LogoInstagram from "../images/instagram.svg";
import LogoFacebook from "../images/facebook.svg";
import { ExternalLink } from "react-external-link";

export default function Footer() {
  return (
    <footer className="footer-content">
      <ExternalLink href="https://www.instagram.com/">
        <img src={LogoInstagram} className="footer-img" />
      </ExternalLink>
      <ExternalLink href="https://www.facebook.com/">
        <img src={LogoFacebook} className="footer-img" />
      </ExternalLink>
    </footer>
  );
}
