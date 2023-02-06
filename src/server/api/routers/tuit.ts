import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const tuitRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ body: z.string(), authorId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const tuit = await ctx.prisma.tuit.create({
                data: {
                    body: input.body,
                    author: {
                        connect: {
                            id: input.authorId,
                        },
                    },
                },
            });

            return tuit;
        }),
    delete: protectedProcedure
        .input(z.object({ id: z.string(), userId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const tuitCheck = await ctx.prisma.tuit.findUnique({
                where: {
                    id: input.id,
                },
            });

            if (!tuitCheck || tuitCheck.authorId !== input.userId) {
                return undefined;
            }
            const tuit = await ctx.prisma.tuit.delete({
                where: {
                    id: input.id,
                },
            });

            return tuit;
        }),
    get: publicProcedure
        .input(z.string().nullish())
        .query(async ({ ctx, input }) => {
            const tuits = await ctx.prisma.tuit.findMany({
                where: {
                    id: input ?? undefined,
                },
                include: {
                    author: true,
                    likes: true,
                    comments: {
                        include: {
                            _count: true,
                            likes: true
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            return tuits;
        }),
    getComments: publicProcedure
        .input(z.object({ tuitId: z.string() }))
        .query(async ({ ctx, input }) => {
            const comments = await ctx.prisma.tuit.findUnique({
                where: {
                    id: input.tuitId,
                },
                include: {
                    _count: true,
                    comments: {
                        include: {
                            _count: true,
                            comments: {
                                include: {
                                    _count: true,
                                    author: true,
                                },
                            },
                            author: true,
                            likes: true,
                        },
                    }
                }
            })

            return comments ?? undefined;
        }),
    getById: publicProcedure
        .input(
            z.object({
                id: z.string().nullish(),
            }),
        )
        .query(async ({ ctx, input }) => {
            if (!input.id) {
                return undefined;
            }
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
                            comments: true,
                        },
                    },
                },
            });

            return tuit;
        }),
    makeComment: protectedProcedure
        .input(
            z.object({
                body: z.string(),
                authorId: z.string(),
                replyId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const tuit = await ctx.prisma.tuit.create({
                data: {
                    body: input.body,
                    author: {
                        connect: {
                            id: input.authorId,
                        },
                    },
                    createdAt: new Date(),
                    replyTo: {
                        connect: {
                            id: input.replyId,
                        },
                    },
                },
            });

            return tuit;
        }),
    toggleLike: protectedProcedure
        .input(
            z.object({
                tuitId: z.string(),
                userId: z.string(),
                action: z.enum(['like', 'dislike']),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            // toggle like from tuit
            const tuit = await ctx.prisma.tuit.update({
                where: {
                    id: input.tuitId,
                },
                data: {
                    likes:
                        input.action === 'like'
                            ? {
                                connectOrCreate: {
                                    create: {
                                        id: `${input.tuitId}-${input.userId}`,
                                        author: {
                                            connect: {
                                                id: input.userId,
                                            },
                                        },
                                    },
                                    where: {
                                        id: `${input.tuitId}-${input.userId}`,
                                    },
                                },
                            }
                            : {
                                delete: {
                                    id: `${input.tuitId}-${input.userId}`,
                                },
                            },
                },
                include: {
                    likes: true,
                },
            });

            return tuit;
        }),
});

export type TuitRouter = typeof tuitRouter;
