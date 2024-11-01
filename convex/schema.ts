import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  messages: defineTable({
    body: v.string(),
    user: v.id('users'),
    channel: v.id('channels'),
  }).index('by_channel', ['channel']),
  users: defineTable({
    name: v.string(),
  }).index('by_name', ['name']),
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
