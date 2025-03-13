import { useEffect, useMemo, useState } from "react";
import CustomFloatingComp from "../../../../components/customFloatingComp";
import LoadingComp from "../../../../components/loadingComp";
import { useLazyGetTrendingAllQuery, useLazyGetLogosQuery } from "../../../../service/redux/API/tmdbApiSlicee";
import { useGetDataQuery } from "../../../../service/redux/API/firebaseDB";

const WelcomeBanner = () => {
  const [triggerTrending, { data: dataTrending, isLoading: loadingTrending }] = useLazyGetTrendingAllQuery();
  const [triggerGetLogos, { data: dataLogos, isLoading: loadingLogos }] = useLazyGetLogosQuery();
  const { data: dataGet, isLoading: loadingDataGet } = useGetDataQuery();

  useEffect(() => {
    if (dataGet) {
      const { statusAge } = dataGet.userOption[dataGet.userSelected];
      triggerTrending({ age: statusAge })
    }
  }, [dataGet, triggerTrending])

  const [logo, setLogo] = useState(null);
  
  const randomTrending = useMemo(() => {
    if (!dataTrending?.results?.length) return null;
    const randomIndex = Math.floor(Math.random() * dataTrending.results.length);
    return dataTrending.results[randomIndex];
  }, [dataTrending]);

  const backdrop = randomTrending?.backdrop_path;
  const media = randomTrending?.media_type;
  const overview = randomTrending?.overview;
  
  useEffect(() => {
    if (randomTrending?.id) {
      triggerGetLogos({ category:media ,id:randomTrending.id});
    }
  }, [randomTrending, triggerGetLogos, media]);
  
  useEffect(() => {
    if (dataLogos) {
      setLogo(dataLogos.logos[0]?.file_path || null);
    }
  }, [dataLogos]);
    
  if (loadingDataGet || loadingTrending || loadingLogos) {
    return (
      <CustomFloatingComp>
        <LoadingComp />
      </CustomFloatingComp>
    );
  }

  return (
    <div className="welcomeBanner d-flex align-items-center">
      <img className="welcomeBanner__backdrop" src={`https://image.tmdb.org/t/p/original${backdrop}`} alt="backdrop" />

      <div className="welcomeBanner__info d-flex flex-column gap-1 gap-md-2 gap-lg-3 justify-content-center">
        <img className="welcomeBanner__info__logo" src={`https://image.tmdb.org/t/p/original${logo}`} alt="logo" />

        <p>
          {overview}
        </p>

        <div className="d-flex flex-row gap-md-2 gap-1">
          <button className="buttonPlay d-flex flex-row align-items-center gap-md-2 gap-1">
            <i className="fa-solid fa-play"></i>
            
            Play
          </button>

          <button className="buttonInfo d-flex flex-row align-items-center gap-md-2 gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="CircleIStandard" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>

            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
