import { Grid } from "@mui/material";
import React from "react";
import PageContainer from "../../Components/General/PageContainer";
function TestPageOne() {
  return (
    <PageContainer>
      <Grid item xs={12}>
        <div>TestPageOne</div>
      </Grid>
    </PageContainer>
  );
}

export default TestPageOne;
