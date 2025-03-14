import { useEffect, useMemo, useState } from "react";
import LoadingComp from "../../../../components/loadingComp";
import { useGetDataQuery } from "../../../../service/redux/API/firebaseDB";
import { useSearchParams } from "react-router-dom";
import ImgPopUpComp from "../../../../components/imgPopUpComp";
import MainSlider from "../../../../components/mainSlider";
import PropTypes from "prop-types";

const GenreSlider = ({ name, fetchMovie, fetchTV }) => {
  const { data: dataGet, isLoading: loadingDataGet } = useGetDataQuery();
  const [triggerMovie, { data: dataMovie, isLoading: loadingMovie }] = fetchMovie();
  const [triggerTv, { data: dataTv, isLoading: loadingTv }] = fetchTV();
  const [resultsArr, setResultsArr] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const userOptionSelected = dataGet?.userOption[dataGet?.userSelected];
  const statusAge = userOptionSelected?.statusAge;

  useEffect(() => {
    if (!dataMovie) {
      triggerMovie({ age: statusAge });
    }
    if (!dataTv) {
      triggerTv({ age: statusAge });
    }
  }, [triggerMovie, triggerTv, statusAge, dataMovie, dataTv]);
  

  const resultsTv = useMemo(() => (dataTv?.results || []), [dataTv]);
  const resultsMovie = useMemo(() => (dataMovie?.results || []), [dataMovie]);

  const resultAll = useMemo(() => {
    return [...resultsMovie, ...resultsTv].sort(() => Math.random() - 0.5);
  }, [resultsMovie, resultsTv]);

  useEffect(() => {
    if (category === "tv") {
      setResultsArr(resultsTv);
    } else if (category === "movie") {
      setResultsArr(resultsMovie);
    } else {
      setResultsArr(resultAll);
    }
  }, [category, resultAll, resultsTv, resultsMovie]);

  if (loadingDataGet || loadingTv || loadingMovie) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <LoadingComp />
      </div>
    );
  }

  return (
    <div className="genreSlider">
      <MainSlider name={name}>
        {resultsArr.map((val, inx) => (
          <ImgPopUpComp data={val} key={inx} />
        ))}
      </MainSlider>
    </div>
  );
};

GenreSlider.propTypes = {
  name: PropTypes.string.isRequired,
  fetchMovie: PropTypes.func.isRequired,
  fetchTV: PropTypes.func.isRequired,
};

export default GenreSlider;
