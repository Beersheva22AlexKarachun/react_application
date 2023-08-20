import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, capitalize } from "@mui/material"
import { useState, useEffect, useRef, useMemo, ReactNode } from "react";
import { Subscription } from 'rxjs';
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Delete, Edit, Man, Woman } from "@mui/icons-material";
import { Confirmation } from "../common/Confirmation";
import InputResult from "../../model/InputResult";
import { useDispatchCode, } from "../../hooks/hooks";
import { Advertisement } from "../../config/advertisement-config"

import { adService } from "../../config/service-config";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../config/advertisement-config";
import { useSelectorModal } from "../../redux/store";
import { modalActions } from "../../redux/slices/modalSlice";
import AdvertisementCard from "../card/AdvertisementCard";
import ModalContent from "../../model/ModalContent";
import { categories } from "../../config/category-config";
import Parameter from "../../model/Parameter";
import Confirm from "../common/Confirm";
import { alertActions } from "../../redux/slices/alertSlice";
import StatusType from "../../model/StatusType";
import { resolve4 } from "dns";



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Advertisements: React.FC = () => {

  const columns: GridColDef[] = [
    {
      field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-header',
      align: 'center', headerAlign: 'center'
    },
    {
      field: 'name', headerName: 'Name', flex: 0.7, headerClassName: 'data-grid-header',
      align: 'center', headerAlign: 'center'
    },
    {
      field: 'category', headerName: 'Category', flex: 0.7, headerClassName: 'data-grid-header',
      align: 'center', headerAlign: 'center'
    },
    {
      field: 'price', headerName: 'Price', flex: 0.7, headerClassName: 'data-grid-header',
      align: 'center', headerAlign: 'center'
    },
    {
      field: 'actions', headerName: 'Actions', type: "actions", flex: 0.7, getActions: (params) => {
        return [
          <GridActionsCellItem label="show" icon={<VisibilityIcon />}
            onClick={() => showAdvertisement(params.row)
            } />,
          <GridActionsCellItem label="edit" icon={<Edit />}
            onClick={() => updateAdvertisement(params.row)
            } />,
          <GridActionsCellItem label="remove" icon={<Delete />}
            onClick={() => removeAdvertisement(params.row)
            } />
        ];
      }
    }
  ];

  // const dispatch = useDispatchCode();
  // const employees = useSelectorEmployees();
  const dispatch = useDispatch();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setFlEdit] = useState(false);
  const title = useRef('');
  const content = useRef('');
  const advertisementId = useRef<number>();
  const confirmFn = useRef<any>(null);


  const [ads, setAds] = useState<Advertisement[]>([]);

  const [params, setParams] = useState<Parameter>({});

  useEffect(() => {
    adService.getAllAdvertisements(params).then(res => setAds(res))
  }, [params])

  function showAdvertisement(ad: Advertisement) {
    const content: ModalContent = {
      content: <AdvertisementCard {...ad} />
    }
    dispatch(modalActions.set(content));
  }

  function updateAdvertisement(ad: Advertisement) {

  }

  function removeAdvertisement(ad: Advertisement) {
    title.current = `Remove ad [${ad.name}]?`;
    content.current = `You are about to remove ad [${ad.name}].`;
    advertisementId.current = ad.id!;
    confirmFn.current = actualRemove;
    setOpenConfirm(true);
  }

  async function fetchAds(): Promise<void> {
    const res = await fetch(baseUrl + "/get_all")
    console.log(await res.json())
    console.log(ads)
  }

  async function actualRemove(isOk: boolean) {
    const res: InputResult = {status:StatusType.SUCCESS, message:""};
    if (isOk) {
        try {
            await adService.deleteAdvertisement(advertisementId);
        } catch (error: any) {
          res.message = error;
        }
    }
    alertActions.set(res)
    setOpenConfirm(false);
}


  // async function actualRemove(isOk: boolean) {
  //   let errorMessage: string = '';
  //   if (isOk) {
  //     try {
  //       await employeesService.deleteAdvertisement(+employeeId.current);
  //     } catch (error: any) {
  //       errorMessage = error;
  //     }
  //   }
  //   dispatch(errorMessage, '');
  //   setOpenConfirm(false);
  // }

  // function updateEmployee(empl: Employee): Promise<InputResult> {
  //   setFlEdit(false)
  //   const res: InputResult = { status: 'error', message: '' };
  //   if (JSON.stringify(employee.current) != JSON.stringify(empl)) {
  //     title.current = "Update Employee object?";
  //     employee.current = empl;
  //     content.current = `You are going update employee with id ${empl.id}`;
  //     confirmFn.current = actualUpdate;
  //     setOpenConfirm(true);
  //   }
  //   return Promise.resolve(res);
  // }

  // async function actualUpdate(isOk: boolean) {
  //   let errorMessage: string = '';

  //   if (isOk) {
  //     try {
  //       await employeesService.updateAdvertisement(employee.current!);
  //     } catch (error: any) {
  //       errorMessage = error
  //     }
  //   }
  //   dispatch(errorMessage, '');
  //   setOpenConfirm(false);

  // }

  function deleteAd(id: number){

  }

  function handleFilter(field: string, event: any) {
    const value = event.target.value;
    const paramsCopy: Parameter = { ...params };
    paramsCopy[field] = value;
    setParams(paramsCopy);
    console.log(params)
  }

  return <Box sx={{
    display: 'flex', justifyContent: 'center',
    alignContent: 'center', flexDirection: 'column'
  }}>
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={8} sm={3} >
        <FormControl fullWidth required>
          <InputLabel id="select-category-id">Category</InputLabel>
          <Select labelId="select-category-id" label="Category"
            value={params.category} onChange={handleFilter.bind(this, "category")} >
            <MenuItem value={""} key={"all"}>All</MenuItem>
            {categories.map(category => <MenuItem value={category} key={category}>{capitalize(category)}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={8} sm={3} >
        <TextField type="number" required fullWidth label="Min price"
          helperText="enter min price" onChange={handleFilter.bind(this, "minPrice")}
          value={params.minPrice} inputProps={{ min: 0, max: params.maxPrice ? params.maxPrice : undefined }} />
      </Grid>

      <Grid item xs={8} sm={3} >
        <TextField type="number" required fullWidth label="Max price"
          helperText="enter max price" onChange={handleFilter.bind(this, "maxPrice")}
          value={params.maxPrice} inputProps={{ min: params.minPrice ? params.minPrice : undefined, }} />
      </Grid>
    </Grid>

    <Box sx={{ height: '80vh', width: '95vw' }}>
      <DataGrid columns={columns} rows={ads} />
    </Box>

    <Confirmation confirmFn={confirmFn.current} open={openConfirm}
      title={title.current} content={content.current} />

  </Box>
}
export default Advertisements;