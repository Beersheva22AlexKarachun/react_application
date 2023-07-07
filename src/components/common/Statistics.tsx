import { useEffect, useState } from "react"
import StatisticsType from "../../model/StatisticsType"
import { employeesService } from "../../config/service-config"
import { Box, Grid, Paper } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import Chart, { ChartProps } from "./Chart"
import Title from "./Title"

type Props = {
  title: string,
  columns: GridColDef[],
  rows: any[],
  chartProps: ChartProps
}

const Statistics: React.FC<Props> = ({ columns, rows, title, chartProps }) => {

  return <Box sx={{ justifyContent: "center", display: "flex", flexDirection: "column" }}>
    <Title>{title}</Title>
    <Grid container>
      <Grid item sx={{ height: '50vh', width: "80vw" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          columnVisibilityModel={{ id: false }} />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Chart {...chartProps} />
        </Paper>
      </Grid>
    </Grid>
  </Box>
}

export default Statistics;