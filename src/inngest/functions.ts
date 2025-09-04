import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert Nextjs and Reactjs developer. You write readable, maintainable code.",
      model: openai({ model: "gpt-4o-mini", apiKey: process.env.OPENAI_API_KEY, }),
    });

    const { output } = await codeAgent.run(
      `Write the following code: ${event.data.value}`
    );

    return { output };
  }
);