import { supabase } from "./supabase";

export type Plan = "FREE" | "BASIC" | "PRO";

const FREE_DAILY_LIMIT = 5;

export async function getPlan(): Promise<Plan> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "FREE";

  const { data } = await supabase
    .from("subscriptions")
    .select("plan")
    .eq("user_id", user.id)
    .single();

  return (data?.plan as Plan) ?? "FREE";
}

export async function setPlan(plan: Plan) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("subscriptions")
    .upsert({
      user_id: user.id,
      plan,
    });
}

export async function getTodayUsage() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const today = new Date().toISOString().slice(0, 10);

  const { data } = await supabase
    .from("ai_usage")
    .select("count")
    .eq("user_id", user.id)
    .eq("date", today)
    .maybeSingle();

  return data?.count ?? 0;
}

export async function canGenerate() {
  const plan = await getPlan();

  if (plan === "BASIC" || plan === "PRO") {
    return true;
  }

  const used = await getTodayUsage();

  return used < FREE_DAILY_LIMIT;
}

export async function increaseUsage() {
  const plan = await getPlan();

  if (plan !== "FREE") return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const today = new Date().toISOString().slice(0, 10);

  const { data } = await supabase
    .from("ai_usage")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", today)
    .maybeSingle();

  if (!data) {
    await supabase.from("ai_usage").insert({
      user_id: user.id,
      date: today,
      count: 1,
    });

    return;
  }

  await supabase
    .from("ai_usage")
    .update({
      count: data.count + 1,
    })
    .eq("id", data.id);
}

export async function getRemainingGenerate() {
  const plan = await getPlan();

  if (plan !== "FREE") {
    return Infinity;
  }

  const used = await getTodayUsage();

  return Math.max(FREE_DAILY_LIMIT - used, 0);
}

export async function upgradeToBasic() {
  await setPlan("BASIC");
}

export async function upgradeToPro() {
  await setPlan("PRO");
}