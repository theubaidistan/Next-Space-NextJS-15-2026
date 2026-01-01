// import { PrismaClient } from '@prisma/client';
// export const prisma = new PrismaClient();

//*-------------------------------------------------------------------
// // lib/prisma.ts
// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'],
//   });

// prisma.$connect().catch((err) => {
//   console.error('Prisma connection error:', err);
// });
//*------------------------------------------------------------------
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
