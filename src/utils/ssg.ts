import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { GetServerSidePropsContext } from "next";
import superjson from 'superjson';

import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

export const mySSG = async (ctx: GetServerSidePropsContext) => {
    const ssg = createProxySSGHelpers({
        router: appRouter,
        ctx: await createTRPCContext({
            req: ctx.req as any,
            res: ctx.res as any,
        }),
        transformer: superjson,
    });

    return ssg;
};