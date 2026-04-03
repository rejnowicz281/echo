/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com"
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com"
            },
            {
                protocol: "https",
                hostname: "asqzizjqsvxtehnswkro.supabase.co"
            },
            {
                // Old Supabase URL
                protocol: "https",
                hostname: "trvvoqhvriwitcyitfid.supabase.co"
            }
        ]
    }
};

module.exports = nextConfig;
