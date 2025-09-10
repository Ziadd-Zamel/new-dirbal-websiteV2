"use server";

export async function sendContact(
  email: string,
  message: string,
  name?: string
) {
  try {
    const response = await fetch(`${process.env.API}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, message, ...(name && { name }) }),
    });
    if (!response.ok) {
      throw new Error("Failed to send contact message");
    }

    return { success: true };
  } catch (error) {
    console.error("Send contact error:", error);
    return { success: false, error: "Failed to send contact message" };
  }
}
