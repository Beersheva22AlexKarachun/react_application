import { Alert, Box, Icon, Snackbar, Typography } from "@mui/material"
import { FormEvent, MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { DataGrid, GridActionsCellItem, GridColDef, GridDeleteForeverIcon, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { StatusType } from "../../model/StatusType";
import { useSelectorAuth } from "../../redux/store";
import UserData from "../../model/UserData";
import Confirm, { Props } from "../common/Confirm";

const Employees: React.FC = () => {
  const [open, setOpen] = useState(false)
  const currentId = useRef<number>()
  const userData = useSelectorAuth();
  const columns: GridColDef[] = useMemo(() => getColumns(userData), [userData]);
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState<string>("")
  const [employees, setEmployees] = useState<Employee[]>([]);
  const severity = useRef<StatusType>('success')

  const confirmProps: Props = {
    dialogTitle: `Delete employee ID#${currentId.current}?`,
    dialogContent: `You are about to delete employee ID#${currentId.current}.\nThe employee will be permanently removed.`,
    closeHandler: () => {
      setOpen(false)
    },
    actions: [
      { title: 'cancel', action: () => setOpen(false) },
      {
        title: 'delete', action: () => {
          employeesService.delete(currentId.current!)
          setOpen(false)
        }
      },
    ]
  }

  function openFn(id: number) {
    setOpen(true)
    currentId.current = id
  }

  function getColumns(userData: UserData): GridColDef[] {
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
        <GridActionsCellItem icon={<GridDeleteForeverIcon />} onClick={() => openFn(+params.id)} label="Delete" />,
      ]
    })
    return res
  }


  useEffect(() => {
    const subscription = employeesService.getEmployees().subscribe({
      next(empls: Employee[] | string) {
        if (typeof empls === 'string') {
          if (empls.includes("Authentication")) {
            authService.logout();
            dispatch(authActions.reset())
          } else {
            setAlertMessage(empls)
            severity.current = "error"
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

    {open && <Confirm {...confirmProps} />}

    <Snackbar open={!!alertMessage} autoHideDuration={20000}
      onClose={() => setAlertMessage('')}>
      <Alert onClose={() => setAlertMessage('')} severity={severity.current} sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  </Box>
}

export default Employees;