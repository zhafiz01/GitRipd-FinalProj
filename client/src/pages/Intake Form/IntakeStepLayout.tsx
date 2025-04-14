import React from "react"

interface IntakeStepLayoutProps {
	title: string
	children: React.ReactNode
	onNext: () => void
	disableNext?: boolean
}

const IntakeStepLayout = ({
	title,
	children,
	onNext,
	disableNext,
}: IntakeStepLayoutProps) => {
	return (
		<div className="flex flex-col items-center justify-center h-screen px-4 text-center">
			<h2 className="text-2xl font-semibold mb-8">{title}</h2>

			<div className="mb-10 w-full max-w-sm">{children}</div>

			<button
				onClick={onNext}
				disabled={disableNext}
				className={`px-6 py-2 text-white rounded-md transition ${
					disableNext
						? "bg-gray-400 cursor-not-allowed"
						: "bg-blue-600 hover:bg-blue-700"
				}`}
			>
				Next
			</button>
		</div>
	)
}

export default IntakeStepLayout