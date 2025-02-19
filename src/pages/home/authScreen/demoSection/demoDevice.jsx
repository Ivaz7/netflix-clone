const DemoDevice = () => {
  return (
    <div className="d-flex flex-column-reverse flex-lg-row justify-content-center align-items-center gap-3 gap-lg-5">
      <div>
        <h2 className="text-center"> 
          Watch everywhere.
        </h2>

        <p className="text-center">
          Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
        </p>
      </div>

      <div className="video-container">
        <img src="device-pile.png" alt="device" />

        <video className="video-play-device" autoPlay={true} playsInline muted loop>
          <source src="video-devices.mp4" type="video/mp4"/>
        </video>
      </div>
    </div>
  )
}

export default DemoDevice;