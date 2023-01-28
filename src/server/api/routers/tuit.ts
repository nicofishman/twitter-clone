import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const tuitRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ body: z.string(), authorId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const tuit = await ctx.prisma.tuit.create({
                data: {
                    body: input.body,
                    author: {
                        connect: {
                            id: input.authorId
                        }
                    },
                }
            });

            return tuit;
        }),
    getAll: publicProcedure
        .query(async ({ ctx }) => {
            const tuits = await ctx.prisma.tuit.findMany({
                include: {
                    author: true,
                    likes: true,
                },
                orderBy: {
                    createdAt: "desc",
                }
            });

            return tuits;
        }),
});