// eslint-disable-next-line import/no-anonymous-default-export
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL, // builtin in convex and cannot be overridden
      applicationID: 'convex',
    },
  ],
}
