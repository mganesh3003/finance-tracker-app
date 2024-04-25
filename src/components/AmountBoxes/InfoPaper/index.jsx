import React from "react";
import { Paper, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const InfoPaper = (props) => {
  const { title, value, iconColor } = props;
  return (
    <Paper elevation={3} sx={{ flex: 1, padding: "15px" }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle1" sx={{ color: iconColor }}>
        <CurrencyRupeeIcon
          fontSize="small"
          sx={{ verticalAlign: "text-bottom" }}
        />
        {value}
      </Typography>
    </Paper>
  );
};

export default InfoPaper;
