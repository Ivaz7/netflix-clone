import { useEffect, useRef, useState } from "react";
import CustomFloatingComp from "../../../../../components/customFloatingComp";
import { useClickOutside } from "../../../../../customHooks/useClickOutside";
import { useMoreInfo } from "../../../../../customHooks/useMoreInfo";
import { useSelector } from "react-redux";
import HeaderMoreInfo from "./headerMoreInfo";
import { useLazyGetDetailQuery, useLazyGetSimilarQuery, useLazyGetTrailerQuery } from "../../../../../service/redux/API/tmdbApiSlicee";
import DetailMoreInfo from "./detailMoreInfo";
import TrailerMoreInfo from "./trailerMoreInfo";
import SimilarShowMoreInfo from "./similarMoreInfo";
import AboutMoreInfo from "./aboutMoreInfo";

const MoreInfo = () => {
  const moreInfoRef = useRef(null);
  const [isMoreInfo, setIsMoreInfo] = useState(true);
  const clickOutside = useClickOutside;
  const { categoryMoreInfo ,moreInfo, deleteMoreInfo } = useMoreInfo();

  clickOutside(moreInfoRef, isMoreInfo, setIsMoreInfo, deleteMoreInfo);

  const [triggerDetail, { data: dataCredit }] = useLazyGetDetailQuery();
  const [triggerTrailer, { data: dataTrailer }] = useLazyGetTrailerQuery();
  const [triggerSimilar, { data: dataSimilar }] = useLazyGetSimilarQuery();

  useEffect(() => {
    if (moreInfo) {
      triggerDetail({ id: moreInfo, category: categoryMoreInfo })
      triggerTrailer({ id: moreInfo, category: categoryMoreInfo })
      triggerSimilar({ id: moreInfo, category: categoryMoreInfo })
    }
  }, [moreInfo, triggerDetail, triggerTrailer, triggerSimilar, categoryMoreInfo])

  const dataShows = useSelector((state) => state.showsData.dataShows);
  const dataDetail = dataShows[moreInfo];

  return (
    <CustomFloatingComp>
      <div ref={moreInfoRef} className="moreInfo">
        {dataDetail && <HeaderMoreInfo dataDetail={dataDetail} />}
        {dataDetail && dataCredit && <DetailMoreInfo dataCredit={dataCredit} dataDetail={dataDetail} />}
        {dataTrailer?.results && <TrailerMoreInfo dataTrailer={dataTrailer.results} />}
        {dataSimilar?.results && <SimilarShowMoreInfo similarShows={dataSimilar.results} />}
        {dataDetail && dataCredit && <AboutMoreInfo dataCredit={dataCredit} dataDetail={dataDetail} />}
      </div>
    </CustomFloatingComp>
  )
}

export default MoreInfo;