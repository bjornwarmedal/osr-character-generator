import { tds } from './dice_functions'

export default function attributes() {
  return {
    "STR": tds(),
    "CON": tds(),
    "DEX": tds(),
    "INT": tds(),
    "WIS": tds(),
    "CHA": tds()
  }
}