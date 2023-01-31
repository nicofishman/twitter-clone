import { z } from 'zod';

import { latinize } from '@/utils/latinize';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                name: z.string(),
                email: z.string(),
                profilePicture: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const username = latinize(input.name)
                .replace(/\s/g, '')
                .toLowerCase();
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
        .input(z.object({ email: z.string().nullish() }))
        .query(async ({ input, ctx }) => {
            if (!input.email || input.email === '') {
                return null;
            }
            const user = await ctx.prisma.twitterUser.findFirst({
                where: {
                    email: input.email,
                },
                include: {
                    likes: true,
                    tuits: true,
                },
            });

            return user;
        }),
});
