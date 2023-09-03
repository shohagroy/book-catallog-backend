-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'shipped', 'delivered');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';
