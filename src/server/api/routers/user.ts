import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({
            name: z.string(),
            email: z.string(),
            profilePicture: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            const username = input.name.replace(/\s/g, "").toLowerCase();
            const user = await ctx.prisma.twitterUser.create({
                data: {
                    full_name: input.name,
                    email: input.email,
                    image: input.profilePicture,
                    username,
                },
            });

            return user;
        }),
    getByEmail: publicProcedure
        .input(z.object({ email: z.string() }))
        .query(async ({ input, ctx }) => {
            if (!input.email || input.email === "") {
                return null;
            }
            const user = await ctx.prisma.twitterUser.findFirst({
                where: {
                    email: input.email,
                },
            });

            return user;
        }),
});