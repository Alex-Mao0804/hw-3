import { useState } from "react";
import Rating, { IconContainerProps } from "@mui/material/Rating";
import styles from "./RatingChoice.module.scss";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { styled } from "@mui/material";
import Text from "@components/Text";
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));
const RatingChoice = () => {
  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
    const [rate, setRate] = useState(0);
    const handleRate = (value: number | null) => {
      setRate(value || 0);
    };
    const customIcons: {
      [index: string]: {
        icon: React.ReactElement<unknown>;
        label: string;
      };
    } = {
      1: {
        icon: <SentimentVeryDissatisfiedIcon fontSize="inherit" color="error" />,
        label: "Very Dissatisfied",
      },
      2: {
        icon: <SentimentDissatisfiedIcon fontSize="inherit" color="error" />,
        label: "Dissatisfied",
      },
      3: {
        icon: <SentimentSatisfiedIcon fontSize="inherit" color="warning" />,
        label: "Neutral",
      },
      4: {
        icon: <SentimentSatisfiedAltIcon fontSize="inherit" color="success" />,
        label: "Satisfied",
      },
      5: {
        icon: <SentimentVerySatisfiedIcon fontSize="inherit" color="success" />,
        label: "Very Satisfied",
      },
    };
  return (
    <>
    {rate ? (
      <div className={styles.ratingChoice__rate}>
        <Text view="p-20" weight="bold">
          Спасибо!
        </Text>
        <span className={styles.ratingChoice__rate__icon}>
          {customIcons[rate]?.icon}
        </span>
      </div>
    ) : (

          <div className={styles.ratingChoice__rating}>
            <Text view="p-20" weight="bold">
              Пожалуйста, оцените наш сервис
            </Text>
            <StyledRating
              name="highlight-selected-only"
              IconContainerComponent={IconContainer}
              getLabelText={(value: number) => customIcons[value].label}
              highlightSelectedOnly
              onChange={(_, value) => handleRate(value)}
            />
          </div>

    )}
    </>
  );
};

export default RatingChoice;
