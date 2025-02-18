import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setQandAStatus } from '../../../../service/redux/slice/QandAData';

const DropDownAnswer = ({ question, answer, status, index }) => {
  const dispatch = useDispatch();

  const rednerAnswer = answer.map((answer, index) => {
    return (
      <h4 key={index} className="m-0">{answer}</h4>
    );
  });

  return (
    <div className="dropDown-container w-100">
      <div 
        onClick={() => dispatch(setQandAStatus(index))}
        className="question-section d-flex justify-content-between align-items-center p-4"
      >
        <h4 className="m-0">{question}</h4>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 36 36" width="36" height="36" data-icon="PlusLarge" aria-hidden="true" className={`m-0 p-0 ${status ? "isOpenQuestion" : ""}`}><path fillRule="evenodd" clipRule="evenodd" d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z" fill="currentColor"></path></svg>
      </div>

      <div className={`${status ? "isOpenAnswer" : "answer-section"} d-flex flex-column justify-content-center align-items-center gap-3`}> 
        {rednerAnswer}
      </div>
    </div>
  );
} 

DropDownAnswer.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default DropDownAnswer;