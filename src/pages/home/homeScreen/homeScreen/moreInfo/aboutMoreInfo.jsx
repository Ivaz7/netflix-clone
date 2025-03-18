import PropTypes from "prop-types";
import { genreMap } from "../../../../../data/movieGenreData";

const AboutMoreInfo = ({ dataCredit, dataDetail }) => {
  const cast = dataCredit?.credits?.cast || [];
  const crew = dataCredit?.credits?.crew || [];
  const tagline = dataCredit?.tagline;
  const genre = dataDetail?.genre_ids || [];
  const date = dataCredit?.first_air_date || dataCredit?.release_date;
  const overview = dataDetail?.overview;
  const name = dataDetail?.title || dataDetail?.name;

  const castNames = cast.map((member, inx) =>
    member.name + (inx === cast.length - 1 ? "" : ", ")
  );
  
  const directorName = crew.find((member) => {
    const job = member.job.toLowerCase();
    return job === "director" || job === "directing";
  })?.name;
  
  const writerNames = crew
    .filter((member) => {
      const job = member.job.toLowerCase();
      return job.includes("writer") || job.includes("screenplay") || job.includes("story");
    })
    .map((member) => member.name);
  
  const year = date ? date.split("-")[0] : "N/A";
  const renderGenre = genre.map((val, inx) => 
    genreMap[val] + (inx === genre.length - 1 ? "" : ", ")
  );

  return (
    <div className="AboutMoreInfo">
      <h1>About {name}</h1>
      <div className="AboutMoreInfo__details">
        {tagline && (
          <p>
            <span>Tagline: </span>
            {tagline}
          </p>
        )}
        <p>
          <span>Year: </span>
          {year}
        </p>
        {genre.length > 0 && (
          <p>
            <span>Genres: </span>
            {renderGenre.join('')}
          </p>
        )}
        {directorName && (
          <p>
            <span>Director: </span>
            {directorName}
          </p>
        )}
        {writerNames.length > 0 && (
          <p>
            <span>Writers: </span>
            {writerNames.join(", ")}
          </p>
        )}
        {cast.length > 0 && (
          <p>
            <span>Cast: </span>
            {castNames.join('')}
          </p>
        )}
        {overview && (
          <p>
            <span>Overview: </span>
            {overview}
          </p>
        )}
      </div>
    </div>
  );
};

AboutMoreInfo.propTypes = {
  dataCredit: PropTypes.object,
  dataDetail: PropTypes.object,
};

export default AboutMoreInfo;
