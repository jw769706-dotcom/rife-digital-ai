import { supabase } from "./supabase";

const FREE_LIMIT = 5;

export async function checkUsage() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return true;

  const today = new Date().toISOString().split("T")[0];

  const { data } = await supabase
    .from("ai_usage")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", today)
    .maybeSingle();

  if (!data) return true;

  return data.count < FREE_LIMIT;
}

export async function increaseUsage() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const today = new Date().toISOString().split("T")[0];

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