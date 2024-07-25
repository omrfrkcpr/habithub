import React from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import {
  groupBy,
  // shuffle
} from "lodash"; // A modern JavaScript utility library delivering modularity, performance & extras.
import NewTagBtn from "../components/buttons/NewTagBtn";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

// https://lodash.com/docs/4.17.15#groupBy

const TagLists = () => {
  const { tasksDetails, tasks } = useSelector((state: RootState) => state.task);
  const { darkMode } = useSelector((state: RootState) => state.theme);

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
      <section id="add-tag" className="w-[fit-content] my-4">
        <NewTagBtn />
      </section>
      <Box sx={{ paddingBottom: 5 }}>
        {Object.entries(tasksGroupByTag).map(([tag, tasksForTag]) => (
          <Box key={tag} mb={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: darkMode ? "white" : "#5b5b5b",
                borderBottom: 2,
                borderColor: darkMode ? "white" : "#5b5b5b",
              }}
            >
              {tag}
            </Typography>
            <Grid container spacing={2}>
              {tasksForTag.map((task: NewTask) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={task.name}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: task.cardColor,
                      color: darkMode ? "white" : "#e6e6e6",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        padding: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ fontSize: 18 }}
                        >
                          {task.name}
                        </Typography>
                        <Typography paragraph sx={{ fontSize: 12 }}>
                          {task.description}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          Priority:{" "}
                          {task.priority === 1
                            ? "Urgent 🚀"
                            : task.priority === 0
                            ? "Important 🔥"
                            : "Deferred 🍀"}
                        </Typography>
                        <Typography variant="body2">
                          Completed: {task.isCompleted ? "Yes" : "No"}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default TagLists;
