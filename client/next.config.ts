import { createCivicAuthPlugin } from "@civic/auth/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "dcd1d0cc-c45e-4e96-9a24-b077763e11d7"
});

export default withCivicAuth(nextConfig)