import { createClient } from "contentful";
import contentful from 'contentful'


export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const createClientFunc = process.env.NODE_ENV === 'development' ? createClient : contentful.createClient;
  const client = createClientFunc({
    space: 'oh4jllxhul5n',
    accessToken: 'S__hSXuWeOER4RcFKaOCHQ-sCvtDjAc92M2E23j5aP4',
  });
  return {
    provide: {
      contentful: client,
    },
  };
});
