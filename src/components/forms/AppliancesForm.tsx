import { Box, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, capitalize } from "@mui/material";
import { Advertisement, AppliancesAdvertisement, appliancesConfig, vehicleConfig } from "../../config/advertisement-config";

type Props = {
  ad: AppliancesAdvertisement,
  setAd: React.Dispatch<React.SetStateAction<Advertisement>>
}



const AppliancesFrom: React.FC<Props> = ({ ad, setAd }) => {

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
          <InputLabel id="select-appliances-type-id">Type</InputLabel>
          <Select labelId="select-appliances-type-id" label="Type"
            value={ad.type} onChange={fieldHandler.bind(this, "type")}>
            <MenuItem value=''>None</MenuItem>
            {appliancesConfig.types.map(type => <MenuItem value={type} key={type}>{capitalize(type)}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={8} sm={4} md={5}>
        <FormControl required error={false}>
          <FormLabel id="used-group-label">Used</FormLabel>
          <RadioGroup
            aria-labelledby="used-group-label"
            defaultValue=""
            value={ad.isUsed || ''}
            name="radio-buttons-group"
            row onChange={fieldHandler.bind(this, "isUsed")}
          >
            <FormControlLabel value={false} control={<Radio />} label="New" disabled={false} />
            <FormControlLabel value={true} control={<Radio />} label="Used" disabled={false} />
            {/* <FormHelperText>{"hello"}</FormHelperText> */}
          </RadioGroup>
        </FormControl>
      </Grid>

    </Grid>
  </Box>
}
export default AppliancesFrom;