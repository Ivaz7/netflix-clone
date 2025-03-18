import { useSearchParams } from "react-router-dom";

export const useMoreInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const moreInfo = searchParams.get("moreInfo");
  const categoryMoreInfo = searchParams.get("categoryMoreInfo");

  const addMoreInfo = (id, category) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("moreInfo", id);
    newParams.set("categoryMoreInfo", category);
    setSearchParams(newParams);
  };

  const deleteMoreInfo = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("moreInfo");
    newParams.delete("categoryMoreInfo");
    setSearchParams(newParams);
  };

  return { moreInfo, categoryMoreInfo, addMoreInfo, deleteMoreInfo };
};
