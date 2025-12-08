"use server";

export async function sendMessage(
  email: string,
  message: string,
  name?: string,
  uuid?: string
) {
  try {
    const response = await fetch(`${process.env.API}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        message,
        ...(name && { name }),
        ...(uuid && { article_uuid: uuid }),
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return { success: true };
  } catch (error) {
    console.error("Send message error:", error);
    return { success: false, error: "Failed to send message" };
  }
}
