import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, capitalize } from "@mui/material";
import { Advertisement, AppartmentAdvertisement } from "../../config/advertisement-config"

import { appartmentConfig, vehicleConfig } from "../../config/advertisement-config";

type Props = {
  ad: AppartmentAdvertisement,
  setAd: React.Dispatch<React.SetStateAction<Advertisement>>
}

const AppartmentForm: React.FC<Props> = ({ ad, setAd }) => {

  function fieldHandler(field: string, event: any) {
    const price = event.target.value;
    const adCopy = { ...ad };
    adCopy[field] = price;
    setAd(adCopy);
  }

  return <Box sx={{ marginTop: { sm: "5vh" } }}>
    <Grid container spacing={4} justifyContent="center">

      <Grid item xs={8} sm={5} >
        <FormControl fullWidth required>
          <InputLabel id="select-appartment-type-id">Type</InputLabel>
          <Select labelId="select-appartment-type-id" label="Type"
            value={ad.type} onChange={fieldHandler.bind(this, "type")}>
            <MenuItem value=''>None</MenuItem>
            {appartmentConfig.types.map(type => <MenuItem value={type} key={type}>{capitalize(type)}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={8} sm={4} md={5}>
        <FormControl required error={false}>
          <FormLabel id="sale-group-label">Sale</FormLabel>
          <RadioGroup
            aria-labelledby="sale-group-label"
            defaultValue=""
            value={ad.isSale || ''}
            name="radio-buttons-group"
            row onChange={fieldHandler.bind(this, "isSale")}
          >
            <FormControlLabel value={true} control={<Radio />} label="Sale" disabled={false} />
            <FormControlLabel value={false} control={<Radio />} label="Rent" disabled={false} />
            {/* <FormHelperText>{"hello"}</FormHelperText> */}
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={8} sm={5} >
        <TextField type="number" required fullWidth label="Appartment area"
          helperText={`enter appartment's area in range [${appartmentConfig.area.min} - ${appartmentConfig.area.max}]`} onChange={fieldHandler.bind(this, "area")}
          value={ad.area} inputProps={{ min: appartmentConfig.area.min, max: appartmentConfig.area.max }} />
      </Grid>

      <Grid item xs={8} sm={5} >
        <TextField type="number" required fullWidth label="Appartment tax"
          helperText="enter appartment tax" onChange={fieldHandler.bind(this, "tax")}
          value={ad.tax} inputProps={{ min: 0 }} />
      </Grid>
    </Grid>
  </Box>
}
export default AppartmentForm;