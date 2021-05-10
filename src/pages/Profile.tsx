import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { profiles } from "../dummy";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const Profile = () => {
  const [who, setWho] = useState("");
  const [avatarPath, setAvatarPath] = useState("");
  const [autographPath, setAutograpPath] = useState("");
  const [paragraphs, setParagraphs] = useState([[""]]);
  const [career, setCareer] = useState([{ status: "", list: [""] }]);
  const location = useLocation();
  useEffect(() => {
    const WHO = location.pathname.slice(9);
    setWho(WHO);

    switch (WHO) {
      case "founder":
        setAvatarPath(profiles.founder.avatar);
        setAutograpPath(profiles.founder.autograph);
        setParagraphs(profiles.founder.paragraphs);
        setCareer(profiles.founder.career);
        break;
      case "representative":
        setAvatarPath(profiles.representative.avatar);
        setAutograpPath(profiles.representative.autograph);
        setParagraphs(profiles.representative.paragraphs);
        setCareer(profiles.representative.career);
        break;
    }
  }, [location]);
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <img
        alt="profile avatar"
        src={avatarPath}
        style={{ width: "30%", marginTop: "1rem", borderRadius: "50%" }}
      />
      <Card style={{ width: "100%", marginTop: "1rem" }}>
        <CardHeader
          title={`${who === "representative" ? "대표" : "설립자"} 인사말`}
        />
        {paragraphs.map((paragraph, paragraphIndex) => (
          <CardContent key={paragraphIndex}>
            {paragraph.map((text, textIndex) => (
              <Typography key={textIndex}>{text}</Typography>
            ))}
          </CardContent>
        ))}
        {/* 추후 Autograph라는 컴포넌트로 추출 */}
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
        >
          <img src={autographPath} alt="profile autograph" />
        </Box>
      </Card>
      <Card style={{ width: "100%", marginTop: "1rem" }}>
        <CardHeader title="이력사항" />
        <CardContent>
          {career.map(({ status, list }, careerIndex) => (
            <List>
              <ListSubheader>{status}</ListSubheader>
              {list.map((text, textIndex) => (
                <ListItem key={textIndex}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
