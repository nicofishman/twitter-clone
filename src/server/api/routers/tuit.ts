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
    get: publicProcedure
        .input(
            z.string().nullish()
        )
        .query(async ({ ctx, input }) => {
            const tuits = await ctx.prisma.tuit.findMany({
                where: {
                    id: input ?? undefined,
                },
                include: {
                    author: true,
                    likes: true,
                    _count: {
                        select: {
                            likes: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            });

            return tuits;
        }),
    getById: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            const tuit = await ctx.prisma.tuit.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    author: true,
                    likes: true,
                    _count: {
                        select: {
                            likes: true,
                        }
                    }
                },
            });

            return tuit;
        }),
    toggleLike: protectedProcedure
        .input(z.object({ tuitId: z.string(), userId: z.string(), action: z.enum(["like", "dislike"]) }))
        .mutation(async ({ ctx, input }) => {
            // toggle like from tuit
            const tuit = await ctx.prisma.tuit.update({
                where: {
                    id: input.tuitId,
                },
                data: {
                    likes: input.action === "like" ? {
                        connectOrCreate: {
                            create: {
                                id: `${input.tuitId}-${input.userId}`,
                                author: {
                                    connect: {
                                        id: input.userId,
                                    }
                                }
                            },
                            where: {
                                id: `${input.tuitId}-${input.userId}`,
                            }
                        }
                    } : {
                        delete: {
                            id: `${input.tuitId}-${input.userId}`,
                        }
                    }
                },
                include: {
                    likes: true,
                }
            });

            return tuit;
        }),
});

export type TuitRouter = typeof tuitRouter;