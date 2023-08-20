import { adService } from "./service-config"

export const baseUrl: string = "http://localhost:8080/advertisement"

export type Advertisement = {
  id?: number,
  publicationDate?: Date,
  name: string,
  category: string,
  price: number,
  [key: string]: any;
}

export type VehicleAdvertisement = Advertisement & {
  brand?: string,
  model?: string,
  year?: number,
  color?: string,
  mileage?: number
}

export type AppliancesAdvertisement = Advertisement & {
  type?: string
  isUsed?: "new" | "used",
}

export type AppartmentAdvertisement = Advertisement & {
  type?: string
  isSale?: "rent" | "sale"
  area?: number
  tax?: number
}

interface CarManufacturer {
  [manufacturer: string]: string[];
}

const brands: CarManufacturer = {
  "Toyota": ["Camry", "Corolla", "Rav4", "Prius", "Highlander", "Sienna", "Tacoma", "Tundra", "4Runner", "Supra"],
  "Honda": ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "Ridgeline", "Fit", "HR-V", "Insight", "Passport"],
  "Ford": ["Focus", "Mustang", "Explorer", "Escape", "F-150", "Edge", "Fusion", "Ranger", "Expedition", "Bronco"],
  "Chevrolet": ["Silverado", "Equinox", "Traverse", "Malibu", "Camaro", "Tahoe", "Suburban", "Blazer", "Colorado", "Trailblazer"],
  "Nissan": ["Altima", "Rogue", "Sentra", "Maxima", "Pathfinder", "Murano", "Frontier", "Titan", "Kicks", "Armada"],
  "Volkswagen": ["Jetta", "Golf", "Passat", "Tiguan", "Atlas", "Arteon", "ID.4", "Taos", "Touareg", "Atlas Cross Sport"],
};

export const vehicleConfig = {
  price: { min: 7_000, max: 500_000 },
  year: { min: 1970, max: new Date().getFullYear() },
  mileage: { min: 0, max: 1e6 },
  brands,
}

export const appartmentConfig = {
  price: { min: 7_000, max: 500_000 },

  types: ["1-room", "2-room", "House"],
  area: { min: 20, max: 500 },
}

export const appliancesConfig = {
  price: { min: 300, max: 10_000 },
  types: ["fridge", "TV", "PC", "smartphone", "drone", "amplifier"],
}


