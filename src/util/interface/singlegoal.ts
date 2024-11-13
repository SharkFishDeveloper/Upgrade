import Task from "./task";

interface SingleGoal {
    name: string;
    score: number;
    penalty: number;
    tasks: Task[];
  }

  export default SingleGoal;