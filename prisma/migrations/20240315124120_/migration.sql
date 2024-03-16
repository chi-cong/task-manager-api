BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_creatorId_key];

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_roleId_key];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
