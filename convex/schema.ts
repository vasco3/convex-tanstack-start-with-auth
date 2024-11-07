import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import { authTables } from '@convex-dev/auth/server'

export default defineSchema({
  ...authTables,

  messages: defineTable({
    body: v.string(),
    user: v.id('users'),
    channel: v.id('channels'),
  }).index('by_channel', ['channel']),
  users: defineTable({
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    name: v.string(),
  })
    .index('email', ['email'])
    .index('by_name', ['name']),
  channels: defineTable({
    name: v.string(),
  }).index('by_name', ['name']),
  simulating: defineTable({
    finishingAt: v.number(),
  }),
  channelMembers: defineTable({
    userId: v.id('users'),
    channelId: v.id('channels'),
  }),
})
