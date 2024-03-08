/*
  Warnings:

  - A unique constraint covering the columns `[managername]` on the table `Manager` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Manager] ADD CONSTRAINT [Manager_managername_key] UNIQUE NONCLUSTERED ([managername]);

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
