// import { createContext, useContext, useState, ReactNode } from "react"

// type IntakeFormData = {
// 	name?: string
// 	birthday?: string
// 	age?: number
// 	sex?: string
// 	weight?: number
// 	whyHere?: string
// 	goal?: string
// 	targetMuscle?: string
// }

// type IntakeFormContextType = {
// 	data: IntakeFormData
// 	updateData: (newData: Partial<IntakeFormData>) => void
// }

// export const IntakeFormContext = createContext<
// 	IntakeFormContextType | undefined
// >(undefined)

// export const IntakeFormProvider = ({
// 	children,
// }: {
// 	children: ReactNode
// }) => {
// 	const [data, setData] = useState<IntakeFormData>({})
// 	console.log(data)
// 	const updateData = (newData: Partial<IntakeFormData>) => {
// 		setData((prev) => ({ ...prev, ...newData }))
// 	}

// 	return (
// 		<IntakeFormContext.Provider value={{ data, updateData }}>
// 			{children}
// 		</IntakeFormContext.Provider>
// 	)
// }

// export const useIntakeForm = () => {
// 	const context = useContext(IntakeFormContext)
// 	if (!context)
// 		throw new Error(
// 			"useIntakeForm must be used within a IntakeFormProvider"
// 		)
// 	return context
// }

import { createContext, useContext, useState, ReactNode } from "react"

type IntakeFormData = {
	name?: string
	birthday?: string
	age?: number
	sex?: string
	weight?: number
	whyHere?: string
	goal?: string
	targetMuscle?: string
}

type IntakeFormContextType = {
	data: IntakeFormData
	updateData: (newData: Partial<IntakeFormData>) => void
}

// 1. Create the context
const IntakeFormContext = createContext<
	IntakeFormContextType | undefined
>(undefined)

// 2. Create the provider
const IntakeFormProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const [data, setData] = useState<IntakeFormData>({})

	const updateData = (newData: Partial<IntakeFormData>) => {
		setData((prev) => ({ ...prev, ...newData }))
	}

	return (
		<IntakeFormContext.Provider value={{ data, updateData }}>
			{children}
		</IntakeFormContext.Provider>
	)
}

// 3. Create the hook to use the context
const useIntakeForm = () => {
	const context = useContext(IntakeFormContext)
	if (!context) {
		throw new Error(
			"useIntakeForm must be used within an IntakeFormProvider"
		)
	}
	return context
}

export { IntakeFormProvider, useIntakeForm }
