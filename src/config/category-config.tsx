import { ReactElement } from "react"
import VehicleForm from "../components/forms/VehicleForm"
import AppartmentForm from "../components/forms/AppartmentForm"
import AppliancesFrom from "../components/forms/AppliancesForm"
import { Advertisement } from "./advertisement-config"

export const categories: string[] = ["vehicle", "appartment", "appliances"]

export const categoryMap: { [key: string]: (ad: Advertisement, setAd: React.Dispatch<React.SetStateAction<Advertisement>>) => ReactElement } = {
  "vehicle": (ad: Advertisement, setAd: React.Dispatch<React.SetStateAction<Advertisement>>) => <VehicleForm ad={ad} setAd={setAd} />,
  "appartment": (ad: Advertisement, setAd: React.Dispatch<React.SetStateAction<Advertisement>>) => <AppartmentForm ad={ad} setAd={setAd} />,
  "appliances": (ad: Advertisement, setAd: React.Dispatch<React.SetStateAction<Advertisement>>) => <AppliancesFrom ad={ad} setAd={setAd} />,
}