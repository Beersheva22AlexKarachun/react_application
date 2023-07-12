import { Box, Grid, Paper, Typography } from "@mui/material"
import Chart, { ChartProps } from "../common/Chart";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { employeesService } from "../../config/service-config";
import StatisticsType from "../../model/StatisticsType";
import { useEffect, useState } from "react";
import Statistics from "../common/Statistics";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", headerClassName: "data-grid-header", align: "center", headerAlign: "center" },
  { field: "range", headerName: "Range" },
  { field: "count", headerName: "Count", type: "number" }
];

const AgeStatistics: React.FC = () => {
  const [stat, setStat] = useState<StatisticsType[]>([])

  // useEffect(() => {
  //   employeesService.getStatistics("birthDate", 10)
  //     .then(stat => setStat(stat))
  // }, [])

  return <Statistics
    columns={columns}
    rows={stat.map((st, i) => ({ ...st, id: i, range:`${st.from} - ${st.to}` }))}
    title="Age Statistics"
    chartProps={{ data: stat, xAxisKey: "from", yAxisKey: "count" }}
  />
}

export default AgeStatistics;