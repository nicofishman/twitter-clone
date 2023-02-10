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
    getByUsername: publicProcedure
        .input(z.object({ username: z.string().nullable() }))
        .query(async ({ input, ctx }) => {
            if (!input.username || input.username === '') {
                return null;
            }
            const user = await ctx.prisma.twitterUser.findFirst({
                where: {
                    username: input.username,
                },
                include: {
                    _count: {
                        select: {
                            tuits: true,
                        },
                    },
                    likes: true,
                    tuits: true,
                },
            });

            return user;
        }),
    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                full_name: z.string(),
                username: z.string(),
                birthDate: z.date(),
                description: z.string().nullable(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const user = await ctx.prisma.twitterUser.update({
                where: {
                    id: input.id,
                },
                data: {
                    full_name: input.full_name,
                    username: input.username,
                    birthDate: input.birthDate,
                    description: input.description,
                },
            });

            return user;
        }),
});
