CREATE TABLE `employee_roles` (
	`employee_id` text NOT NULL,
	`role_id` text NOT NULL,
	PRIMARY KEY(`employee_id`, `role_id`),
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `qualifications` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `qualifications_name_unique` ON `qualifications` (`name`);--> statement-breakpoint
CREATE TABLE `role_required_qualifications` (
	`role_id` text NOT NULL,
	`qualification_id` text NOT NULL,
	PRIMARY KEY(`role_id`, `qualification_id`),
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`qualification_id`) REFERENCES `qualifications`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roles_name_unique` ON `roles` (`name`);