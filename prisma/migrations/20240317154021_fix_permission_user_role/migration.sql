/*
  Warnings:

  - You are about to drop the column `permissionId` on the `UserRole` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[UserRole] DROP CONSTRAINT [UserRole_permissionId_fkey];

-- AlterTable
ALTER TABLE [dbo].[UserRole] DROP COLUMN [permissionId];

-- CreateTable
CREATE TABLE [dbo].[_PermissionToUserRole] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_PermissionToUserRole_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_PermissionToUserRole_B_index] ON [dbo].[_PermissionToUserRole]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[_PermissionToUserRole] ADD CONSTRAINT [_PermissionToUserRole_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Permission]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_PermissionToUserRole] ADD CONSTRAINT [_PermissionToUserRole_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[UserRole]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
