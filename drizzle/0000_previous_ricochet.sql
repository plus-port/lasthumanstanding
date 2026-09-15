CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`site_id` text NOT NULL,
	`full_name` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`site_id`) REFERENCES `sites`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sites` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
