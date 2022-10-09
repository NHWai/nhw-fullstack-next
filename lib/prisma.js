// lib/prisma.js

import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// declare global {
//   var prisma = PrismaClient || undefined
// }
// const prisma = new PrismaClient();

export default prisma;
