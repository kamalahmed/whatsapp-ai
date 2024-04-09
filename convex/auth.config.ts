const authconfig =  {
    providers: [
      {
        domain: process.env.CLERK_ISSUER_URL,
        applicationID: "convex",
      },
    ]
  };

export default authconfig;