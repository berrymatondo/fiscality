/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      // Autorise l'envoi de plusieurs justificatifs (5 Mo max chacun) en une seule saisie.
      bodySizeLimit: "20mb",
    },
  },
}

export default nextConfig
