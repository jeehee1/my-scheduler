import { useRef } from "react";

const EditGoal = ({
  goal,
  updateGoal,
}: {
  goal: string | null;
  updateGoal: (newGoal: string) => void;
}) => {
  const goalRef = useRef<HTMLTextAreaElement>(null);

  const submitGoalHandler = (event: React.FormEvent) => {
    event.preventDefault();
    updateGoal(goalRef.current?.value || "");
  };

  return (
    <>
      <form onSubmit={submitGoalHandler}>
        <textarea
          id="goal"
          defaultValue={goal ? goal : ""}
          ref={goalRef}
          required
        />
        <button type="submit" className="normal-btn">
          저장!
        </button>
      </form>
    </>
  );
};

export default EditGoal;
