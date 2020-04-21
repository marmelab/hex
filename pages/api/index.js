let baseUrl;

/**
 * Build the base URL based on the host provided as parameter.
 *
 * @param {string} host
 */
export const baseUrlSingleton = (host) => {
  if (baseUrl) {
    return baseUrl;
  }

  if (typeof host === "string") {
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    baseUrl = `${protocol}://${host}`;
  }

  throw "Host must be provided a first time to init the singleton.";
};
