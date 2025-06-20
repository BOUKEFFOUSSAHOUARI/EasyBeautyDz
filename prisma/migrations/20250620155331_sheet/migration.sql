-- CreateTable
CREATE TABLE "Dintegration" (
    "id" TEXT NOT NULL,
    "sheetsIntegration" JSONB,
    "facebookPixelId" TEXT,

    CONSTRAINT "Dintegration_pkey" PRIMARY KEY ("id")
);
