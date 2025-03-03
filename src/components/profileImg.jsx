import PropTypes from "prop-types"

const ProfileImg = ({ avatarImg, scale, statusAge, name, fontSizeKids, isUserManager, touch, iconFontSize, sizeShadow }) => {
  const statusAgeStyle = {
    fontSize: fontSizeKids,
    textShadow: `${sizeShadow} -${sizeShadow} 0 rgb(223, 223, 223), ${sizeShadow} ${sizeShadow} 0 rgb(223, 223, 223), -${sizeShadow} ${sizeShadow} 0 rgb(223, 223, 223), -${sizeShadow} -${sizeShadow} 0 rgb(223, 223, 223)`,
  }

  return (
    <div style={{ width: scale, height: scale }} className={`profileImg ${touch && 'touch'} ${isUserManager && 'isUserManager'}`}>
      <img className="profileImg__img" src={`/avatar/${avatarImg}`} alt="profile" />
      {
        isUserManager &&
        <i style={{fontSize: iconFontSize}} className="fa-solid fa-pencil"></i>
      }
      {
        name !== "Kids" && avatarImg !== "avatarKids.png" && statusAge &&
        <div style={statusAgeStyle} id="kidsFont" className="profileImg__statusAge">
          Kids
          <div className="profileImg__statusAge__shadow"></div>
        </div>
      }
    </div>
  )
}

ProfileImg.propTypes = {
  avatarImg: PropTypes.string,
  scale: PropTypes.string,
  statusAge: PropTypes.bool,
  name: PropTypes.string,
  fontSizeKids: PropTypes.string,
  isUserManager: PropTypes.bool,
  touch: PropTypes.bool,
  iconFontSize: PropTypes.string,
  sizeShadow: PropTypes.string,
}

export default ProfileImg