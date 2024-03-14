BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(30) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [salt] NVARCHAR(1000) NOT NULL,
    [creatorId] INT,
    [roleId] INT,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_creatorId_key] UNIQUE NONCLUSTERED ([creatorId])
);

-- CreateTable
CREATE TABLE [dbo].[UserRole] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [group] NVARCHAR(1000) NOT NULL,
    [permissionId] INT,
    CONSTRAINT [UserRole_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserRole_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Project] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Project_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Task] (
    [id] INT NOT NULL IDENTITY(1,1),
    [projectId] INT NOT NULL,
    [taskDescription] NVARCHAR(1000) NOT NULL,
    [start] DATETIME2 NOT NULL,
    [deadline] DATETIME2 NOT NULL,
    [finished] BIT NOT NULL,
    CONSTRAINT [Task_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserTask] (
    [id] INT NOT NULL IDENTITY(1,1),
    [taskId] INT NOT NULL,
    [taskDetail] NVARCHAR(1000) NOT NULL,
    [start] DATETIME2 NOT NULL,
    [deadline] DATETIME2 NOT NULL,
    [finished] BIT NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [UserTask_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Permission] (
    [id] INT NOT NULL IDENTITY(1,1),
    [route] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Permission_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Permission_route_key] UNIQUE NONCLUSTERED ([route])
);

-- CreateTable
CREATE TABLE [dbo].[_Managers] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_Managers_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_Users] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_Users_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_UsersOnTask] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_UsersOnTask_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_Managers_B_index] ON [dbo].[_Managers]([B]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_Users_B_index] ON [dbo].[_Users]([B]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_UsersOnTask_B_index] ON [dbo].[_UsersOnTask]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_creatorId_fkey] FOREIGN KEY ([creatorId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[UserRole]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT [UserRole_permissionId_fkey] FOREIGN KEY ([permissionId]) REFERENCES [dbo].[Permission]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Task] ADD CONSTRAINT [Task_projectId_fkey] FOREIGN KEY ([projectId]) REFERENCES [dbo].[Project]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserTask] ADD CONSTRAINT [UserTask_taskId_fkey] FOREIGN KEY ([taskId]) REFERENCES [dbo].[Task]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserTask] ADD CONSTRAINT [UserTask_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_Managers] ADD CONSTRAINT [_Managers_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Project]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_Managers] ADD CONSTRAINT [_Managers_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_Users] ADD CONSTRAINT [_Users_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Project]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_Users] ADD CONSTRAINT [_Users_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_UsersOnTask] ADD CONSTRAINT [_UsersOnTask_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Task]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_UsersOnTask] ADD CONSTRAINT [_UsersOnTask_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
