import React from "react";

import { Card, Grid, SvgIcon, Typography } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

import { ReactComponent as Spade } from './images/spade.svg';

const Icon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    {props.children}
  </SvgIcon>
)

function MainCard(props: { number: string | number}) {
    return (
        <Card sx={theme => ({height: '100%', minWidth: theme.spacing(7)})}>
            <Grid
                container
                direction="column"
                spacing={1}
                sx={theme => ({padding: `${theme.spacing(1)} 0`})}
            >
                <Grid item>
                <Typography variant="h3" textAlign="center">{props.number}</Typography>
                </Grid>
                <Grid item sx={{textAlign: "center"}}>
                <Icon fontSize="large">
                    <Spade />
                </Icon>
                </Grid>
            </Grid>
        </Card>
    )
}

export default MainCard;