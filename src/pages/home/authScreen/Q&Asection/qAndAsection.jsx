import { useSelector } from "react-redux";
import DropDownAnswer from "./dropDownAnswer";

const QAndAsection = () => {
  const dataQandA = useSelector((state) => state.QandAData);

  const renderQandA = dataQandA.map((data, index) => {
    return (
      <div key={index}>
        <DropDownAnswer
          question={data.question}kalo pake rtk query 
          answer={data.answer}
          status={data.status}
          index={index}
        />
      </div>
    )
  })

  return (  
    <div className="qAndAsection w-100 d-flex flex-column justify-content-center align-items-center gap-2 gap-md-4 gap-lg-5">
      <h2 className="text-start w-100">
        Frequently Asked Questions
      </h2>

      <div className="d-flex flex-column w-100 gap-2">
        {renderQandA}
      </div>
    </div>
  );
}

export default QAndAsection;