import { boolean, json, serial, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  imageUrl: varchar('image_url', { length: 255 }),
  subscription: boolean('subscription').default(false),
});

export const VideoData = pgTable('videoData', {
  id:serial('id').primaryKey(),
  script:json('script').notNull(),
  audioFileUrl:varchar('audio_file_url').notNull(),
  captions:json('captions').notNull(),
  imageList:varchar('image_list').array(),
  createdBy:varchar('created_by').notNull(),
});


