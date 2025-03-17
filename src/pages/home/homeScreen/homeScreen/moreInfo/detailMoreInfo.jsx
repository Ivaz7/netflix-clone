import PropTypes from "prop-types";

const DetailMoreInfo = ({ dataCredit, dataDetail }) => {
  const cast = dataCredit?.credits?.cast;
  const crew = dataCredit?.credits?.crew;
  const tagline = dataCredit?.tagline;
  const genre = dataDetail?.genre_ids;
  const date = dataCredit?.first_air_date || dataCredit?.release_date;
  const overview = dataDetail?.overview;
  const name = dataDetail?.title || dataDetail?.name;

  const castNames = cast?.map((member) => member.name);

  const directorName = crew?.find((member) => {
    const job = member.job.toLowerCase();
    return job === "director" || job === "directing";
  })?.name;
  const writerNames = crew
    ?.filter((member) => {
      const job = member.job.toLowerCase();
      return job.includes("writer") || job.includes("screenplay") || job.includes("story");
    })
    .map((member) => member.name);
  const year = date ? date.split("-")[0] : "N/A";

  console.log("castNames", castNames);
  console.log("directorName", directorName);
  console.log("writerNames", writerNames);
  console.log("tagLine", tagline);
  console.log("genre", genre);
  console.log("year", year);
  console.log("overview", overview);
  console.log("name", name);
  
  return (
    <div className="detailMoreInfo">
      {/* Render komponen atau data lainnya */}
    </div>
  );
};

DetailMoreInfo.propTypes = {
  dataCredit: PropTypes.object,
  dataDetail: PropTypes.object,
};

export default DetailMoreInfo;
