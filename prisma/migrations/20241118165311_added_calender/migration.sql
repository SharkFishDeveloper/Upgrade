-- CreateTable
CREATE TABLE "Calender" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Calender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateObject" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "DateObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Date" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Date_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Calender" ADD CONSTRAINT "Calender_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateObject" ADD CONSTRAINT "DateObject_id_fkey" FOREIGN KEY ("id") REFERENCES "Calender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Date" ADD CONSTRAINT "Date_id_fkey" FOREIGN KEY ("id") REFERENCES "DateObject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
