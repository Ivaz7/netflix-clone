import PropTypes from "prop-types";

const Footer = ({ type }) => {
  return (
    <footer className={`${type ? "footer-white" : ""} footer-child-el d-inline-flex flex-column flex-lg-row justify-content-center align-items-center gap-3`}>
      <h6 className="p-2 m-0 text-center">
        This Netflix Clone is built solely for educational and project development purposes.  
      </h6>

      <h6 className="p-2 m-0 text-center">
        It is not affiliated with or endorsed by Netflix in any way.
      </h6>

      <h6 className="p-2 m-0 text-center">
        Created by Ivaz Reza
      </h6>

      <h6 className="p-2 m-0 text-center">
        Full code available on <a href="https://github.com/Ivaz7/netflix-clone">GitHub</a>
      </h6>

    </footer>
  )
}

Footer.propTypes = {
  type: PropTypes.string,
}

export default Footer;
