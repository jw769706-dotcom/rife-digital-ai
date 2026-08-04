import { supabase } from "./supabase";

export async function getPlan() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "FREE";

  const { data, error } = await supabase
    .from("subscriptions")
    .select("plan")
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return "FREE";
  }

  return data.plan as "FREE" | "BASIC" | "PRO";
}

export async function setPlan(
  plan: "FREE" | "BASIC" | "PRO"
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("subscriptions")
    .update({ plan })
    .eq("user_id", user.id);
}

export async function upgradeToBasic() {
  await setPlan("BASIC");
}

export async function upgradeToPro() {
  await setPlan("PRO");
}