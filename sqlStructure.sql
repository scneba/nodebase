CREATE TYPE "verb_enum" AS ENUM (
  'POST',
  'GET',
  'PUT',
  'PATCH',
  'DELETE'
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "name" varchar(50),
  "email" varchar(50) UNIQUE NOT NULL,
  "username" varchar(50) UNIQUE NOT NULL,
  "password" varchar(100) NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "roles" (
  "id" uuid PRIMARY KEY,
  "name" varchar(50) UNIQUE NOT NULL,
  "description" varchar(200),
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "permissions" (
  "id" uuid PRIMARY KEY,
  "verb" verb_enum,
  "path" varchar(150),
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "user_roles" (
  "user_id" uuid,
  "role_id" uuid
);

CREATE TABLE "role_permissions" (
  "permission_id" uuid,
  "role_id" uuid
);

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id");

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

CREATE INDEX "user_role_unique" ON "user_roles" ("user_id", "role_id");

CREATE INDEX "role_permission_unique" ON "role_permissions" ("permission_id", "role_id");
