import React from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import {
  groupBy,
  // shuffle
} from "lodash"; // A modern JavaScript utility library delivering modularity, performance & extras.
import NewTagBtn from "../components/buttons/NewTagBtn";

// https://lodash.com/docs/4.17.15#groupBy

const TagLists = () => {
  const { tasksDetails, tasks } = useSelector((state: RootState) => state.task);

  const tasksGroupByTag = groupBy(tasks, (task: NewTask) => task.tagId.name);

  // const result: number[] = shuffle([1, 2, 3, 4]);
  // console.log(result);

  // console.log(tasksDetails.lists);
  /*
    lists: Array(2)
      0: {tagId: '66a0aa423a42a710b22be1c3', name: 'Daily Routine', count: 4, countOfComplete: 2, countOfUncomplete: 2}
      1: {tagId: '66a0aa423a42a710b22be1c4', name: 'Work Routine', count: 3, countOfComplete: 1, countOfUncomplete: 2}
      length: 2
  */

  // console.log(tasksGroupByTag); // {Daily Routine: Array(4), Work Routine: Array(3)}

  return (
    <div>
      <section id="add-tag" className="w-[fit-content] ms-auto">
        <NewTagBtn />
      </section>
    </div>
  );
};

export default TagLists;
