import type { ComponentProps, ComponentType } from 'react'
import DatePickerModule from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Normalize CommonJS/ESM interop so consumers always receive a component.
const DatePickerComponent = (
  (DatePickerModule as unknown as { default?: ComponentType<any> }).default ??
  (DatePickerModule as unknown as ComponentType<any>)
)

export type DatePickerFieldProps = ComponentProps<typeof DatePickerComponent>

export default DatePickerComponent
