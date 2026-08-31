export async function onRequestPost(context) {
  try {
    const body = await context.request.json();

    const message = body.message;

    if (!message) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const result = await context.env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct",
      {
        messages: [
          {
            role: "system",
            content: "You are Fice, a helpful, friendly AI assistant."
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
        error: "Fice AI is temporarily unavailable."
      },
      { status: 500 }
    );
  }
        }
