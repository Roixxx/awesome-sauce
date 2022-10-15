import { createClient } from "contentful";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const client = createClient({
    space: config.public.contentfulSpace,
    accessToken: config.public.contentfulPublicAccessToken,
  });
  return {
    provide: {
      contentful: client,
    },
  };
});
