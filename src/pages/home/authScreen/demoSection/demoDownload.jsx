const DemoDownload = () => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-5">
      <div className="download-image-container">
        <img src="stranger-things-lg.png" alt="phone" className="phone-image" />

        <div className="download-info-container d-flex flex-row justify-content-center align-items-center gap-3">
          <div className="d-inline-flex flex-row align-items-center gap-2">
            <img src="stranger-things-sm.png" alt="image-download" />

            <div>
              <h6>
                Stranger Things
              </h6>

              <p>
                Downloading ...
              </p>
            </div>
          </div>

          <img src="download-icon.gif" alt="gif-download-icon" />
        </div>
      </div>

      <div>
        <h2 className="text-center">
          Download your shows to watch offline.
        </h2>

        <p className="text-center"> 
          Save your favorites easily and always have something to watch.
        </p>
      </div>
    </div>
  );
}

export default DemoDownload;