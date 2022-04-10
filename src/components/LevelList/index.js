import LevelCard from "./LevelCard";

const LevelList = ({ userAnswers }) => {
  return <div>
    <h1 className="title">শব্দৰ কোলাহল</h1>
    <div className="flex flex-column">
      {
        userAnswers.map((level) => <LevelCard key={level.id} level={level} userAnswers={userAnswers} />)
      }
    </div>
  </div>
}

export default LevelList;
