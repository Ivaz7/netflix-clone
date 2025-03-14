import PropTypes from "prop-types";
import ImgPopUpComp from "../../../../components/imgPopUpComp";
import { useGetDataQuery } from "../../../../service/redux/API/firebaseDB";
import GridSystemDisplay from "./gridDisplay";
import SecondHeader from "./secondHeader";

const GenreGrid = ({ name }) => {
  const { data } = useGetDataQuery();

  const userOptionSelected = data?.userOption[data?.userSelected];
  const myList = userOptionSelected?.myList;

  const renderMyList = myList.map((val, index) => (
    <ImgPopUpComp data={val} key={index} />
  ))

  let finalRender;

  if (name === "My List") {
    finalRender = renderMyList;
  }

  return (
    <div className="genreGrid d-flex flex-column">
      <SecondHeader name={name} />

      <GridSystemDisplay array={finalRender} />
    </div>
  )
}

GenreGrid.propTypes = {
  name: PropTypes.string,
}

export default GenreGrid;