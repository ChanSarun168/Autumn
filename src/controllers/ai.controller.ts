import OpenAI from "openai";
import { foodService } from "../services/food.service";
import { Route, Tags, Controller, SuccessResponse, Post, Body } from "tsoa";

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  message: string;
  data: {
    name: string;
    price: number;
    type: string;
    thumbnail: string;
  }[];
}

@Route("/ai")
@Tags("AI")
export class AIController extends Controller {
  private client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  private foodSvc = new foodService();

  @SuccessResponse(200, "OK")
  @Post("/chat")
  public async chat(@Body() body: ChatRequest): Promise<ChatResponse> {
    const allFoods = await this.foodSvc.GetAllFood({});

    const prompt = `
You are a helpful restaurant assistant AI.
Here is the food list from the database:
${JSON.stringify(allFoods, null, 2)}

The user said: "${body.message}".

Please respond with:
{
  "message": "a friendly human-like reply to the user",
  "data": [ list of matching foods (name, price, type, thumbnail) from the above database ]
}

Only include foods from the list. Make sure it is a valid JSON without markdown.
`;

    const resp = await this.client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
    });

    const rawReply = resp.choices[0].message.content!.trim();

    try {
      const parsed = JSON.parse(rawReply);
      return {
        message: parsed.message,
        data: parsed.data,
      };
    } catch (err) {
      throw new Error("Failed to parse AI response: " + rawReply);
    }
  }
}
