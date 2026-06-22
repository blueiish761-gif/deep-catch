const DEFAULT_BASE_URL = "https://ai-pixel.online";
const DEFAULT_MODEL = "gpt-5.5";

function json(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function pickAnswer(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  if (Array.isArray(data.output)) {
    const parts = [];
    for (const item of data.output) {
      if (!Array.isArray(item.content)) continue;
      for (const content of item.content) {
        if (typeof content.text === "string") parts.push(content.text);
        if (typeof content === "string") parts.push(content);
      }
    }
    if (parts.join("").trim()) return parts.join("").trim();
  }
  if (Array.isArray(data.choices) && data.choices[0]?.message?.content) {
    return data.choices[0].message.content.trim();
  }
  return "";
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }
  if (req.method !== "POST") {
    json(res, 405, { error: "Use POST." });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    json(res, 500, { error: "Server missing OPENAI_API_KEY." });
    return;
  }

  try {
    const raw = await readBody(req);
    const body = raw ? JSON.parse(raw) : {};
    const message = String(body.message || "").slice(0, 1200);
    if (!message.trim()) {
      json(res, 400, { error: "message is required." });
      return;
    }

    const state = body.state || {};
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    const baseUrl = (process.env.OPENAI_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");
    const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;

    const system = [
      "你是《深海捕手 Deep Catch》的真实内置 AI 顾问，名字叫“深海顾问”。",
      "你完全根据请求里的当前状态和 gameData 回答，gameData 包含全部鱼类、区域、装备、餐厅升级、员工、任务和节日数据。",
      "你的职责：给潜水路线、捕鱼目标、餐厅备货、上菜策略、装备升级、任务推进、图鉴收集、BOSS打法和功能提示。",
      "游戏规则重点：夜晚客人只点库存可做的菜；食材卖完或达到接待上限后会自动结束营业；捕鱼进入小游戏，失败扣氧气，小游戏过程不持续耗氧。",
      "回答必须像游戏内顾问：简短、具体、可执行。优先给下一步行动。不要说你看不到游戏数据，不要编造不存在的 UI 或功能。",
      "中文回答。普通问题 120 字以内；如果玩家要求详细攻略，最多 260 字。"
    ].join("\n");

    const payload = {
      model,
      store: false,
      input: [
        { role: "system", content: system },
        {
          role: "user",
          content: [
            "玩家问题：",
            message,
            "",
            "最近对话：",
            JSON.stringify(history),
            "",
            "当前游戏状态：",
            JSON.stringify(state).slice(0, 120000)
          ].join("\n")
        }
      ]
    };

    const upstream = await fetch(`${baseUrl}/v1/responses`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const text = await upstream.text();
    let data = {};
    try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }

    if (!upstream.ok) {
      json(res, upstream.status, { error: data.error?.message || data.error || "Advisor request failed." });
      return;
    }

    json(res, 200, { answer: pickAnswer(data) || "我看到了状态，但暂时没生成建议。先优先补库存，再开夜晚营业。" });
  } catch (err) {
    json(res, 500, { error: err.message || "Advisor server error." });
  }
};
