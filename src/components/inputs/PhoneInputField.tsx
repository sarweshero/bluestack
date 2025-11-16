import type { ComponentProps, ComponentType } from 'react'
import PhoneInputModule from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// Some bundlers expose CommonJS modules as objects with a `default` field; others return the component directly.
// Normalize the import so consumers always receive a React component.
const PhoneInputComponent = (
  (PhoneInputModule as unknown as { default?: ComponentType<any> }).default ??
  (PhoneInputModule as unknown as ComponentType<any>)
)

export type PhoneInputFieldProps = ComponentProps<typeof PhoneInputComponent>

export default PhoneInputComponent
