import PropTypes from "prop-types";
import { genreMap } from "../../../../../data/movieGenreData";

const DetailMoreInfo = ({ dataCredit, dataDetail }) => {
  const cast = dataCredit?.credits?.cast;
  const tagline = dataCredit?.tagline;
  const genre = dataDetail?.genre_ids;
  const date = dataCredit?.first_air_date || dataCredit?.release_date;
  const overview = dataDetail?.overview;

  const castNames = cast.slice(0, 7).map((member, inx) => 
    member.name + (inx === cast.slice(0, 7).length - 1 ? "" : ", ")
  );  
  const year = date ? date.split("-")[0] : "N/A";
  const renderGenre = genre.map((val, inx) => genreMap[val] +(inx === genre.length - 1 ? "" : ", "));
  
  return (
    <div className="detailMoreInfo d-flex flex-column flex-sm-row gap-2 gap-sm-3">
      <div className="detailMoreInfo__leftSide d-flex flex-column gap-2">
        <p>
          <span>{year}</span>
        </p>

        {tagline && <p>
          &quot;{tagline}&quot;
        </p>}

        <p>
          {overview}
        </p>
      </div>

      <div className="detailMoreInfo__rightSide d-flex flex-column gap-2">
        <p>
          <span>Cast:</span> {castNames}
        </p>

        <p>
          <span>Genre:</span> {renderGenre}
        </p>
      </div>
    </div>
  );
};

DetailMoreInfo.propTypes = {
  dataCredit: PropTypes.object,
  dataDetail: PropTypes.object,
};

export default DetailMoreInfo;
