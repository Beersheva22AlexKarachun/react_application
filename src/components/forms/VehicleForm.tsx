import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, capitalize } from "@mui/material";
import { Advertisement } from "../../config/advertisement-config"

import { VehicleAdvertisement, vehicleConfig } from "../../config/advertisement-config";

type Props = {
  ad: VehicleAdvertisement,
  setAd: React.Dispatch<React.SetStateAction<Advertisement>>
}

const VehicleFrom: React.FC<Props> = ({ ad, setAd }) => {

  function fieldHandler(field: string, event: any) {
    const value = event.target.value;
    const adCopy: Advertisement = { ...ad };
    adCopy[field] = value;
    setAd(adCopy);
  }

  return <Box sx={{ marginTop: { sm: "5vh" } }}>
    <Grid container spacing={4} justifyContent="center">

      <Grid item xs={8} sm={5} >
        <FormControl fullWidth required>
          <InputLabel id="select-brand-id">Brand</InputLabel>
          <Select labelId="select-brand-id" label="Brand"
            value={ad.brand} onChange={fieldHandler.bind(this, "brand")}>
            {Object.keys(vehicleConfig.brands).map(brand => <MenuItem value={brand} key={brand}>{capitalize(brand)}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={8} sm={5} >
        <FormControl fullWidth required disabled={!ad.brand}>
          <InputLabel id="select-model-id">Model</InputLabel>
          <Select labelId="select-model-id" label="Model"
            value={ad.model} onChange={fieldHandler.bind(this, "model")} disabled={!ad.brand}>
            {ad.brand && vehicleConfig.brands[ad.brand!].map(model => <MenuItem value={model} key={model}>{capitalize(model)}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={8} sm={5} >
        <TextField type="number" required fullWidth label="Year of manufacture"
          helperText="enter year of manufacture" onChange={fieldHandler.bind(this, "year")}
          value={ad.year} inputProps={{ min: vehicleConfig.year.min, max: vehicleConfig.year.max }} />
      </Grid>

      <Grid item xs={8} sm={5} >
        <TextField type="text" required fullWidth label="Vehicle color"
          helperText="enter vehicle color" onChange={fieldHandler.bind(this, "color")}
          value={ad.color} />
      </Grid>

      <Grid item xs={8} sm={5} >
        <TextField type="number" required fullWidth label="Vehicle mileage"
          helperText="enter vehicle mileage" onChange={fieldHandler.bind(this, "mileage")}
          value={ad.mileage} inputProps={{ min: vehicleConfig.mileage.min, max: vehicleConfig.mileage.max }} />
      </Grid>

    </Grid>
  </Box>
}
export default VehicleFrom;