import PropTypes from "prop-types";

const ContentSettingPage = ({ leftSideImg, textTop, textBottom }) => {
  return (
    <>
      <div className="contentSettingPage d-flex flex-row justify-content-around align-items-center">
        <div className="contentSettingPage__leftSide d-flex flex-row align-items-center gap-3">
          <div className="contentSettingPage__leftSide__img d-flex justify-content-center">
            {leftSideImg}
          </div>

          <div className="d-flex flex-column">
            <h5>
              {textTop}
            </h5>

            <p>
              {textBottom}
            </p>
          </div>
        </div>

        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </>
  )
}

ContentSettingPage.propTypes = {
  leftSideImg: PropTypes.node,
  textTop: PropTypes.string,
  textBottom: PropTypes.string,
}

export default ContentSettingPage;