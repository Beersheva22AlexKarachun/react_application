import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import InputResult from "../../model/InputResult"
import { ReactElement, useState } from "react"
import VehicleForm from "./VehicleForm"
import { min } from "rxjs"
import { capitalize } from "../../util/string-functions"
import { categories, categoryMap } from "../../config/category-config"
import { useDispatch } from "react-redux"
import { alertActions } from "../../redux/slices/alertSlice"
import StatusType from "../../model/StatusType"
import { Advertisement } from "../../config/advertisement-config"

type Props = {
  submitFn: (ad: Advertisement) => Promise<InputResult>,
  adUpdated?: Advertisement
}

const initialAd: Advertisement = {
  name: "", category: "", price: 0
};

const CommonAdvertisementForm: React.FC<Props> = ({ submitFn, adUpdated }) => {
  const [ad, setAd] = useState<Advertisement>(adUpdated || initialAd);
  const dispatch = useDispatch();

  async function onSubmitFn(event: any) {
    event.preventDefault();
    const res = await submitFn(ad);
    dispatch(alertActions.set(res));

    res.status == StatusType.SUCCESS && event.target.reset();
  }

  function onResetFn(event: any) {
    setAd(adUpdated || initialAd);
  }

  function fieldHandler(field: string, event: any) {
    const price = event.target.value;
    const adCopy = { ...ad };
    adCopy[field] = price;
    setAd(adCopy);
  }

  return <Box sx={{ marginTop: { sm: "10vh" } }}>
    <form onSubmit={onSubmitFn} onReset={onResetFn}>
      <Grid container spacing={4} justifyContent="center">

        <Grid item xs={8} sm={5} >
          <FormControl fullWidth required>
            <InputLabel id="select-category-id">Category</InputLabel>
            <Select labelId="select-category-id" label="Category"
              value={ad.category} onChange={fieldHandler.bind(this, "category")}>
              <MenuItem value=''>None</MenuItem>
              {categories.map(category => <MenuItem value={category} key={category}>{capitalize(category)}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={8} sm={5} >
          <TextField type="text" required fullWidth label="Advertisement title"
            helperText="enter advertisement title" onChange={fieldHandler.bind(this, "name")}
            value={ad.name} />
        </Grid>

        <Grid item xs={8} sm={5} >
          <TextField type="number" required fullWidth label="Advertisement price"
            helperText="enter price"  onChange={fieldHandler.bind(this, "price")}
            value={ad.price} inputProps={{ min: 0 }} />
        </Grid>

        {/* 
        <Grid item xs={8} sm={4} md={5}>
          <TextField type="date" required fullWidth label="birthDate"
            value={employee.birthDate ? employee.birthDate.toISOString()
              .substring(0, 10) : ''} inputProps={{
                readOnly: !!employeeUpdated,
                min: `${minYear}-01-01`,
                max: `${maxYear}-12-31`
              }} InputLabelProps={{
                shrink: true
              }} onChange={handlerBirthdate} />
        </Grid>
        <Grid item xs={8} sm={4} md={5} >
          <TextField label="salary" fullWidth required
            type="number" onChange={handlerSalary}
            value={employee.salary || ''}
            helperText={`enter salary in range [${minSalary}-${maxSalary}]`}
            inputProps={{
              min: `${minSalary}`,
              max: `${maxSalary}`
            }} />
        </Grid> */}
      </Grid>

      {ad.category && <Box>
        <Divider variant="middle" sx={{ marginTop: { sm: "2vh" } }}>Additional information</Divider>
        {categoryMap[ad.category](ad, setAd)}
        <Box sx={{ marginTop: { xs: "5vh", sm: "2vh" }, textAlign: "center" }}>
          <Button type="reset">Reset</Button>
          <Button type="submit" >Submit</Button>
        </Box>
      </Box>}

    </form>

  </Box>
}

export default CommonAdvertisementForm


// import React, { useRef, useState } from "react";
// import { FormControl, Grid, TextField, InputLabel, Select, Box, MenuItem, Button, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Snackbar, Alert } from '@mui/material';
// import InputResult from "../../model/InputResult";

// type Props = {
//   submitFn: (empl: Employee) => Promise<InputResult>,
//   employeeUpdated?: Employee
// }

// const initialDate: any = 0;
// const initialGender: any = '';
// const initialEmployee: Employee = {
//   id: 0, birthDate: initialDate, name: '', department: '', salary: 0,
//   gender: initialGender
// };

// export const EmployeeForm: React.FC<Props> = ({ submitFn, employeeUpdated }) => {
//   const { minYear, minSalary, maxYear, maxSalary, departments }
//     = employeeConfig;
//   const [employee, setEmployee] =
//     useState<Employee>(employeeUpdated || initialEmployee);
//   const [errorMessage, setErrorMessage] = useState('');
//   function handlerName(event: any) {
//     const name = event.target.value;
//     const emplCopy = { ...employee };
//     emplCopy.name = name;
//     setEmployee(emplCopy);
//   }
//   function handlerBirthdate(event: any) {
//     const birthDate = event.target.value;
//     const emplCopy = { ...employee };
//     emplCopy.birthDate = new Date(birthDate);
//     setEmployee(emplCopy);
//   }
//   function handlerSalary(event: any) {
//     const salary: number = +event.target.value;
//     const emplCopy = { ...employee };
//     emplCopy.salary = salary;
//     setEmployee(emplCopy);
//   }
//   function handlerDepartment(event: any) {
//     const department = event.target.value;
//     const emplCopy = { ...employee };
//     emplCopy.department = department;
//     setEmployee(emplCopy);
//   }
//   function genderHandler(event: any) {
//     setErrorMessage('');
//     const gender: 'male' | 'female' = event.target.value;
//     const emplCopy = { ...employee };
//     emplCopy.gender = gender;
//     setEmployee(emplCopy);
//   }
//   async function onSubmitFn(event: any) {
//     event.preventDefault();
//     if (!employee.gender) {
//       setErrorMessage("Please select gender")
//     } else {
//       const res = await submitFn(employee);


//       res.status == "success" && event.target.reset();

//     }


//   }
//   function onResetFn(event: any) {
//     setEmployee(employeeUpdated || initialEmployee);
//   }

//   return <Box sx={{ marginTop: { sm: "25vh" } }}>
//     <form onSubmit={onSubmitFn} onReset={onResetFn}>
//       <Grid container spacing={4} justifyContent="center">
//         <Grid item xs={8} sm={5} >
//           <FormControl fullWidth required>
//             <InputLabel id="select-department-id">Department</InputLabel>
//             <Select labelId="select-department-id" label="Department"
//               value={employee.department} onChange={handlerDepartment}>
//               <MenuItem value=''>None</MenuItem>
//               {departments.map(dep => <MenuItem value={dep} key={dep}>{dep}</MenuItem>)}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={8} sm={5} >
//           <TextField type="text" required fullWidth label="Employee name"
//             helperText="enter Employee name" onChange={handlerName}
//             value={employee.name} />
//         </Grid>
//         <Grid item xs={8} sm={4} md={5}>
//           <TextField type="date" required fullWidth label="birthDate"
//             value={employee.birthDate ? employee.birthDate.toISOString()
//               .substring(0, 10) : ''} inputProps={{
//                 readOnly: !!employeeUpdated,
//                 min: `${minYear}-01-01`,
//                 max: `${maxYear}-12-31`
//               }} InputLabelProps={{
//                 shrink: true
//               }} onChange={handlerBirthdate} />
//         </Grid>
//         <Grid item xs={8} sm={4} md={5} >
//           <TextField label="salary" fullWidth required
//             type="number" onChange={handlerSalary}
//             value={employee.salary || ''}
//             helperText={`enter salary in range [${minSalary}-${maxSalary}]`}
//             inputProps={{
//               min: `${minSalary}`,
//               max: `${maxSalary}`
//             }} />
//         </Grid>
//         <Grid item xs={8} sm={4} md={5}>
//           <FormControl required error={!!errorMessage}>
//             <FormLabel id="gender-group-label">Gender</FormLabel>
//             <RadioGroup
//               aria-labelledby="gender-group-label"
//               defaultValue=""
//               value={employee.gender || ''}
//               name="radio-buttons-group"
//               row onChange={genderHandler}
//             >
//               <FormControlLabel value="female" control={<Radio />} label="Female" disabled={!!employeeUpdated} />
//               <FormControlLabel value="male" control={<Radio />} label="Male" disabled={!!employeeUpdated} />
//               <FormHelperText>{errorMessage}</FormHelperText>
//             </RadioGroup>
//           </FormControl>
//         </Grid>
//       </Grid>




//       <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
//         <Button type="submit" >Submit</Button>
//         <Button type="reset">Reset</Button>
//       </Box>



//     </form>

//   </Box>
// }