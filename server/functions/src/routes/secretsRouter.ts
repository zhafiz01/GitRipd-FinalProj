import { Router } from "express"
import { getSecret } from "../controllers/secrets"
import checkAuth from "../middleware/auth"

const routes = Router()

routes.get("/", checkAuth, getSecret)

export default routes
