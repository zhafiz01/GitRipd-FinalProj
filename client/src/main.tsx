import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { IntakeFormProvider } from './context/IntakeFormContext.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<IntakeFormProvider>
				<App />
			</IntakeFormProvider>
		</BrowserRouter>
	</StrictMode>
)
