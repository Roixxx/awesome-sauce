export function useDeskree() {
  // api configuration
  const baseURL = useRuntimeConfig().public.deskreeBaseUrl;

  /**
   * Reviews functions exposed from the composable
   */
  const reviews = {
    async get(productId) {
      const where = [
        {
          attribute: "product_id",
          operator: "=",
          value: productId,
        },
      ];
      return dbRestRequest(`/reviews?where=${JSON.stringify(where)}`);
    },
    async submit({title, text, product_id, rating}) {
      return dbRestRequest('reviews', 'POST', {
        title,
        text,
        product_id,
        rating: Number(rating),
      })
    },
  };

  function dbRestRequest(endpoint, method = "GET", body) {
    endpoint = endpoint.replace(/^\//, "");
    return restRequest(`/rest/collections/${endpoint}`, method, body);
  }

  function restRequest(endpoint, method = "GET", body) {
    endpoint = endpoint.replace(/^\//, "");
    const options = {
      baseURL,
      method,
    };
    if (body && method !== "GET") options.body = body;
    return $fetch(encodeURIComponent(endpoint), options);
  }

  return {
    reviews,
  };
}
