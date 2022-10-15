import { createClient } from "contentful";
import contentful from 'contentful'


export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const createClientFunc = process.env.NODE_ENV === 'development' ? createClient : contentful.createClient;
  const client = createClientFunc({
    space: process.env.NUXT_CONTENTFUL_SPACE,
    accessToken: process.env.NUXT_CONTENTFUL_PUBLIC_ACCESS_TOKEN,
  });
  return {
    provide: {
      contentful: client,
    },
  };
});
