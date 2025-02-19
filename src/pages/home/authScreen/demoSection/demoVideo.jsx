const DemoVideo = () => {
  return (
    <div className="d-flex flex-column-reverse flex-lg-row justify-content-center align-items-center gap-4 gap-lg-5">
      <div>
        <h2 className="text-center"> 
          Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
        </h2>
      </div>

      <div className="video-container">
        <img src="tv.png" alt="tv" />

        <video className="video-play-demoHome" autoPlay={true} playsInline muted loop>
          <source src="hero-vid.mp4" type="video/mp4"/>
        </video>
      </div>
    </div>
  )
}

export default DemoVideo;