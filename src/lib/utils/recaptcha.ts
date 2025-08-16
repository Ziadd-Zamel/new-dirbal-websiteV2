declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export const verifyRecaptcha = async (
  action: string = "submit"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Wait for reCAPTCHA to be fully loaded
    const waitForRecaptcha = () => {
      if (typeof window !== "undefined" && window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action })
            .then((token) => resolve(token))
            .catch((error) => reject(error));
        });
      } else {
        // If not loaded yet, wait a bit and try again
        setTimeout(waitForRecaptcha, 100);
      }
    };

    // Start waiting for reCAPTCHA
    waitForRecaptcha();

    // Timeout after 10 seconds
    setTimeout(() => {
      reject(new Error("reCAPTCHA failed to load within 10 seconds"));
    }, 10000);
  });
};
