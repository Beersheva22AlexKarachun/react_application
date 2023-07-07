import { Alert, Box, Snackbar, Typography } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { DataGrid, GridActionsCellItem, GridAddIcon, GridCheckCircleIcon, GridColDef, GridDeleteForeverIcon, GridDragIcon, GridLoadIcon, GridRowParams, GridTableRowsIcon, GridViewHeadlineIcon } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import StatusType from "../../model/StatusType";
import { useSelectorAuth } from "../../redux/store";
import UserData from "../../model/UserData";
import Confirm, { Props } from "../common/Confirm";
import { alertActions } from "../../redux/slices/alertSlice";
import BasicModal from "../common/BasicModal";
import { EmployeeForm } from "../forms/EmployeeForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Employees: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const currentId = useRef<number>()
  const userData = useSelectorAuth();
  const columns: GridColDef[] = useMemo(() => getColumns(), [userData]);
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState<Employee[]>([]);
  
  const confirmProps: Props = {
    open: openDialog,
    dialogTitle: `Delete employee ID#${currentId.current}?`,
    dialogContent: `You are about to delete employee ID#${currentId.current}.\nThe employee will be permanently deleted.`,
    closeHandler: () => {
      setOpenDialog(false)
    },
    actions: [
      { title: 'cancel', action: () => setOpenDialog(false) },
      {
        title: 'delete', action: () => {
          employeesService.deleteEmployee(currentId.current!)
          setOpenDialog(false)
          dispatch(alertActions.set({ message: `Employee ID#${currentId.current} has been deleted` }))
        }
      },
    ]
  }

  function openDeleteDialog(id: number) {
    setOpenDialog(true)
    currentId.current = id
  }

  function getFormContent() {
    return <EmployeeForm submitFn={async () => ({ status: StatusType.SUCCESS, message: '' })}></EmployeeForm>
  }

  function getColumns(): GridColDef[] {
    const res: GridColDef[] = [
      { field: "id", headerName: "ID", flex: 0.3, headerClassName: "data-grid-header", align: "center", headerAlign: "center" },
      { field: "name", headerName: "Name", flex: 0.5 },
      { field: "birthDate", headerName: "Birth date", type: "date", flex: 0.8 },
      { field: "department", headerName: "Department", flex: 0.4 },
      { field: "salary", headerName: "Salary", type: "number", flex: 0.3 },
      { field: "gender", headerName: "Gender", flex: 0.3, },
    ];
    userData?.role === "admin" && res.push({
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<EditIcon />} onClick={() => openUpdateForm(params.row)} label="Delete" />,
        <GridActionsCellItem icon={<DeleteForeverIcon />} onClick={() => openDeleteDialog(+params.id)} label="Delete" />,
      ]
    })
    return res
  }

  function openUpdateForm(row: any): void {
    setOpenForm(true);
    console.log(row)
  }


  useEffect(() => {
    const subscription = employeesService.getEmployees().subscribe({
      next(empls: Employee[] | string) {
        if (typeof empls === 'string') {
          if (empls.includes("Authentication")) {
            authService.logout();
            dispatch(authActions.reset())
          } else {
            dispatch(alertActions.set({ message: empls, severity: StatusType.ERROR }))
          }
        } else {
          setEmployees(empls.map(e => ({ ...e, birthDate: new Date(e.birthDate) })))
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return <Box sx={{ justifyContent: "center", display: "flex" }}>
    <Box sx={{ height: '50vh', width: "80vw" }}>
      <DataGrid columns={columns} rows={employees} />
    </Box>

    {openDialog && <Confirm {...confirmProps} />}
    {openForm && <BasicModal content={getFormContent()} onCloseHandler={() => setOpenForm(false)} />}
  </Box>
}

export default Employees;


