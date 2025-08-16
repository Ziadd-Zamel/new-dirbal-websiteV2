"use server";

export async function sendMessage(
  email: string,
  message: string,
  name?: string
) {
  try {
    const response = await fetch(`${process.env.API}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, message, ...(name && { name }) }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to send message" };
  }
}
