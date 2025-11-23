-- CreateEnum
CREATE TYPE "send_type" AS ENUM ('once', 'recurring');

-- CreateEnum
CREATE TYPE "recurrence_type" AS ENUM ('daily', 'weekly', 'monthly');

-- CreateEnum
CREATE TYPE "campaign_run_status" AS ENUM ('pending', 'running', 'completed', 'failed');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT,
    "username" TEXT,
    "organization" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audiences" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "subscriber_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribers" (
    "id" TEXT NOT NULL,
    "audience_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "isUnsubscribed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT,
    "html_content" TEXT,
    "json_content" TEXT,
    "user_id" INTEGER NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "audience_id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "type" "send_type" NOT NULL,
    "send_at" TIMESTAMP(3),
    "recurrence" "recurrence_type",
    "last_send_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_runs" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "run_at" TIMESTAMP(3) NOT NULL,
    "status" "campaign_run_status" NOT NULL,

    CONSTRAINT "campaign_runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_email_key" ON "subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "email_template_name_key" ON "email_template"("name");

-- AddForeignKey
ALTER TABLE "audiences" ADD CONSTRAINT "audiences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_audience_id_fkey" FOREIGN KEY ("audience_id") REFERENCES "audiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_template" ADD CONSTRAINT "email_template_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_audience_id_fkey" FOREIGN KEY ("audience_id") REFERENCES "audiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "email_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_runs" ADD CONSTRAINT "campaign_runs_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
