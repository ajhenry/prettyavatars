import { router } from '../trpc';
import { postRouter } from './post';

export const appRouter = router({
  post: postRouter, // put procedures under "post" namespace
});

export type AppRouter = typeof appRouter;
