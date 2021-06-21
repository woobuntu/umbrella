import React from "react";
import {
  Timeline,
  TimelineContent,
  TimelineConnector,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@material-ui/lab";
import { Typography, Paper, makeStyles } from "@material-ui/core";
import { company_history } from "../dummy";

const useStyles = makeStyles({
  paper: {
    display: "inline-block",
    padding: "0.5rem 1rem",
  },
});

const History = () => {
  const classes = useStyles();
  return (
    <Timeline align="alternate">
      {company_history.map(({ timeStamp, content }, index) => (
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {timeStamp}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            {index !== company_history.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography>{content}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default History;
