"use client"

import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

const Provider = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    const upsertUser = async () => {
      if (!user) return;

      const email = user.primaryEmailAddress?.emailAddress;

      const [existingUser] = await db
        .select()
        .from(Users)
        .where(eq(Users.email, email));

      if (!existingUser) {
        await db.insert(Users).values({
          name: user.fullName,
          email,
          imageUrl: user.imageUrl,
        });
      }
    };

    upsertUser();
  }, [user]);

  return <>{children}</>;
};

export default Provider;
