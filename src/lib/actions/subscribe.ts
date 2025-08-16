"use server";

export async function subscribe(email: string, recaptchaToken: string) {
  try {
    const response = await fetch(`${process.env.API}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, recaptchaToken }),
    });

    if (!response.ok) {
      // If the response indicates the email already exists
      if (response.status === 409 || response.status === 400) {
        return {
          success: false,
          message: "هذا البريد الإلكتروني مشترك بالفعل",
        };
      }
      throw new Error("Failed to subscribe");
    }

    const data = await response.json();

    // Check if the API returns a message about existing email
    if (data.message && data.message.includes("exist")) {
      return { success: false, message: data.message };
    }

    return { success: true, message: "تم الاشتراك بنجاح" };
  } catch (error) {
    return { success: false, message: "فشل في الاشتراك" };
  }
}
