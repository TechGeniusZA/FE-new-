import React from "react";

import {TextField, MenuItem, Accordian, AccordionDetails, Typography, AccordionSummary } from "@mui/material"


const Accordian = (props) => {
    <Accordian>
        <AccordionSummary>
            <AccordionDetails>
                <TextField>
                    <MenuItem>{props}</MenuItem>
                </TextField>
            </AccordionDetails>
        </AccordionSummary>
    </Accordian>

}
export default Accordian