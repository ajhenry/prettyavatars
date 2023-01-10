import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export async function createContext({
  req,
  res: _res,
}: trpcNext.CreateNextContextOptions) {
  return {};
}
export type Context = inferAsyncReturnType<typeof createContext>;
