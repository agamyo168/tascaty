ALTER TABLE `tasks` ADD `done` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` ADD `createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL;