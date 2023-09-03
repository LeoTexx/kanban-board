import { Router } from "express";
import { AuthMiddleware } from "./shared/middlewares/auth";
import { type CardRouter } from "./cards";
import { type AuthRouter } from "./shared/routes/AuthRouter";

export class GlobalRoutes {
  private readonly router: Router;
  private readonly authRouter: AuthRouter;
  private readonly cardRouter: CardRouter;
  private readonly authMiddleware: AuthMiddleware;

  constructor(authRouter: AuthRouter, cardRouter: CardRouter) {
    this.router = Router();
    this.authRouter = authRouter;
    this.cardRouter = cardRouter;
    this.authMiddleware = new AuthMiddleware();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/login", this.authRouter.getRouter());

    this.router.use(
      "/cards",
      this.authMiddleware.verify,
      this.cardRouter.getRouter()
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
