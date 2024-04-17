-- CreateTable
CREATE TABLE "chats" (
    "chatID" SERIAL NOT NULL,
    "chatPrompt" TEXT NOT NULL,
    "chatAllPrompt" VARCHAR(10000) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("chatID")
);
