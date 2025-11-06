/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            { hostname: "upload.wikimedia.org" },
            { hostname: "cdn-icons-png.flaticon.com" },
            { hostname: "www.linkedin.com" },
            { hostname: "images.icon-icons.com" }
        ]
    }
};

export default config;
