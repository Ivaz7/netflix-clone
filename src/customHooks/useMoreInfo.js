import { useQueryParams } from './useQueryParams';

export const useMoreInfo = () => {
  const { searchParams, addParam, deleteParam } = useQueryParams();

  const moreInfo = searchParams.get("moreInfo");

  const addMoreInfo = (id) => {
    addParam("moreInfo", id);
  }

  const deleteMoreInfo = () => {
    deleteParam("moreInfo");
  }

  return { moreInfo, addMoreInfo, deleteMoreInfo };
}