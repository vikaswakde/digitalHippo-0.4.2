import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";

// backend
export const appRouter = router({
  auth: authRouter
});

export type AppRouter = typeof appRouter;
