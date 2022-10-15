import { createClient } from "contentful";
import contentful from 'contentful'


export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const createClientFunc = process.env.NODE_ENV === 'development' ? createClient : contentful.createClient;
  const client = createClientFunc({
    space: config.public.contentfulSpace,
    accessToken: config.public.contentfulPublicAccessToken,
  });
  return {
    provide: {
      contentful: client,
    },
  };
});
