import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSeguimiento = async (data) => {
  const existingFollow = await prisma.seguimiento.findFirst({
    where: {
      follower_id: data.follower_id,
      followed_id: data.followed_id,
    },
  });

  if (existingFollow) {
    throw new Error("Ya sigues a este usuario.");
  }

  return await prisma.seguimiento.create({
    data,
  });
};

export const getSeguidosYSeguidoresCount = async (userId) => {
  const [seguidosCount, seguidoresCount] = await Promise.all([
    prisma.seguimiento.count({
      where: {
        follower_id: userId,
      },
    }),
    prisma.seguimiento.count({
      where: {
        followed_id: userId,
      },
    }),
  ]);

  return {
    seguidos: seguidosCount,
    seguidores: seguidoresCount,
  };
};

export const deleteSeguimiento = async (followerId, followedId) => {
  const existingFollow = await prisma.seguimiento.findFirst({
    where: {
      follower_id: followerId,
      followed_id: followedId,
    },
  });

  if (!existingFollow) {
    throw new Error("No sigues a este usuario.");
  }

  return await prisma.seguimiento.delete({
    where: {
      id: existingFollow.id,
    },
  });
};

export const checkSeguimiento = async (followerId, followedId) => {
  const existingFollow = await prisma.seguimiento.findFirst({
    where: {
      follower_id: followerId,
      followed_id: followedId,
    },
  });

  return !!existingFollow;
};
