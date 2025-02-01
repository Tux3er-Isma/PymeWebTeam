import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: netlify(),
  integrations: [partytown()]
});