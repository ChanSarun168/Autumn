import OpenAI from "openai";
import { Route, Tags, Controller, SuccessResponse, Post, Body } from "tsoa";
import { get as levenshtein } from "fast-levenshtein";
import { foodService } from "../services/food.service";

// --- DTO & Request/Response Interfaces ---
interface ChatRequest {
  message: string;
}

interface FoodDTO {
  name: string;
  price: number;
  type: string;
  thumbnail: string;
  isdeleted?: boolean;
  description?: string;
  ingredients?: string[];
  cuisine?: string;
  spiciness?: string;
  preparationTime?: number;
}

interface ChatResponse {
  message: string;
  data: FoodDTO[];
}

// --- Local ranking helper ---
function rankByRelevance(query: string, items: FoodDTO[]): FoodDTO[] {
  return items
    .map(item => ({
      item,
      score:
        levenshtein(query.toLowerCase(), item.name.toLowerCase())
        + 0.1 * item.price
    }))
    .sort((a, b) => a.score - b.score)
    .map(entry => entry.item);
}

@Route("/ai")
@Tags("AI")
export class AIController extends Controller {
  private client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  private foodSvc = new foodService();

  @SuccessResponse(200, "OK")
  @Post("/chat")
  public async chat(@Body() body: ChatRequest): Promise<ChatResponse> {
    // 1) Parse query via GPT → JSON filter
    const parserPrompt = `
You are a strict query parser. Read the user’s request and output **only** a JSON object matching IQueryFood. Do **not** include any extra text or markdown fences.

export interface IQueryFood {
  name?: string;
  price?: { op: "lt" | "gt" | "eq"; value: number };
  type?: string;             // only "food" or "drink"; omit if not explicitly asked
  ingredients?: string[];    // only when user says “with …”, “containing …”, or “ingredients”
  cuisine?: string;          // e.g. "Khmer", "Vietnamese", "Asian", etc.
  spiciness?: string;
  preparationTime?: { op: "lt" | "gt" | "eq"; value: number };
}

Rules:
1. If the user mentions a cuisine (e.g. “Khmer food”, “Vietnamese dishes”, “Asian snacks”), set **cuisine** accordingly. Do **not** set **type** for that.
2. Only set **type** if the user explicitly says “food” vs. “drink” (e.g. “I want a drink”). Otherwise omit **type**.
3. Only set **ingredients** when they ask for specific ingredients (e.g. “with chicken and garlic”, “containing lentils”). 
4. If they say a generic term like “I need some food” or “show me drinks”, treat that as **type** = "food" or "drink". But if they say “I need some food” without context, assume they mean any **food** (set type = "food"), not name = "food".
5. Parse price filters (“under $10”, “over $5”, “exactly $7”) into **price** with op/value. Strip “$” from the value.
6. Parse time filters (“under 10 minutes”, “over 5 min”, “exactly 8”) into **preparationTime** with op/value.
7. If the user says “cooking fast” or “quick” (e.g. “food with cooking fast”), set **preparationTime**: { op: "lt", value: 15 }.
8. If the user asks for “good price”, “low price”, “cheap”, or similar, set **price**: { op: "lt", value: 5 }.
9. Keep all fields you don’t set undefined; omit them entirely from the JSON.

User said: "${body.message}"
`;

    const parseResp = await this.client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a query parser." },
        { role: "user", content: parserPrompt }
      ],
    });
    const queryFilter = JSON.parse(parseResp.choices[0].message.content!) as any;

    // 2) Fetch & map
    const rawFoods = await this.foodSvc.GetAllFood(queryFilter);
    const candidates: FoodDTO[] = rawFoods.map(f => ({
      name: f.name!,
      price: f.price!,
      type: f.type!,
      thumbnail: f.thumbnail!,
      isdeleted: f.isdeleted ?? false,

      // coalesce null → undefined
      description: f.description ?? undefined,
      ingredients: f.ingredients ?? undefined,
      cuisine: f.cuisine ?? undefined,
      spiciness: f.spiciness ?? undefined,
      preparationTime: f.preparationTime ?? undefined,
    }));

    console.log("Parsed filter:", queryFilter);
    console.log("Raw matches from DB:", rawFoods.map(f => f.preparationTime));
    console.log("RawFoods:", JSON.stringify(rawFoods, null, 2));
    console.log("→ candidates.length:", candidates.length);
    console.log("→ candidates names:", candidates.map(f => f.name));





    // 3) Early exit
    if (!candidates.length) {
      return { message: "Sorry, we don't have it. Please try another food!", data: [] };
    }

    // 4) Local ranking
    const ranked = rankByRelevance(body.message, candidates);
    return {
      message: `Here are the best menu for you:`,
      data: ranked
    };
  }
}
