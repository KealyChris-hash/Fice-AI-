export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const message = body.message;

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const result = await context.env.AI.run(
      "@cf/zai-org/glm-4.7-flash",
      {
        messages: [
          {
            role: "system",
            content:
              "You are Fice, a smart, helpful, friendly AI assistant. Give clear and useful answers."
          },
          {
            role: "user",
            content: message
          }
        ]
      }
    );

    return Response.json({
      reply: result.response
    });

  } catch (error) {
    return Response.json(
      {
        error: "Fice AI error.",
        details: error.message
      },
      { status: 500 }
    );
  }
}
