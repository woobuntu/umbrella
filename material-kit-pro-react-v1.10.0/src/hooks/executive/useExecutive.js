import { useQuery } from "@apollo/client";
import { EXECUTIVE } from "graphql/query";
import useGetExecutiveId from "./useGetExecutiveId";

export default function useExecutive() {
  const executiveId = useGetExecutiveId();

  const { error, data } = useQuery(EXECUTIVE, {
    variables: {
      executiveId,
    },
  });

  if (error) alert(error.message);
  // alert를 띄울 게 아니라 서버로 뭔가 기록을 남겨야 할 것 같은데

  if (!data) {
    return {
      userBasicInfoProps: {
        name: "",
        position: "",
        thumbnailProps: {
          src: "",
          alt: "",
        },
      },
      executiveGreetingsProps: {
        greetings: [],
        autographProps: {
          src: "",
          alt: "",
        },
      },
      careersGroupedByClassification: [],
    };
  }

  const {
    executive: { name, position, greeting, careers, executiveFileRelations },
  } = data;

  const greetings = greeting.split("\n");

  const careersGroupedByClassification =
    groupingCareersByClassification(careers);

  const [{ file: thumbnail }] = executiveFileRelations.filter(
    ({ file: { name } }) => name.includes("thumbnail")
  );

  const [{ file: autograph }] = executiveFileRelations.filter(
    ({ file: { name } }) => name.includes("autograph")
  );

  return {
    userBasicInfoProps: {
      name,
      position,
      thumbnailProps: {
        src: thumbnail.path,
        alt: thumbnail.name,
      },
    },
    executiveGreetingsProps: {
      greetings,
      autographProps: {
        src: autograph.path,
        alt: autograph.name,
      },
    },
    careersGroupedByClassification,
  };
}

function groupingCareersByClassification(careers) {
  const classificationHash = careers.reduce((hash, career) => {
    const { classification } = career;
    if (hash[classification]) hash[classification].push(career);
    else hash[classification] = [career];
    return hash;
  }, {});

  return Object.entries(classificationHash);
}
