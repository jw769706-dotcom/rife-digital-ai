import { supabase } from "./supabase";

export type Plan = "FREE" | "BASIC" | "PRO";

const FREE_DAILY_LIMIT = 5;

/* ========================================= */
/* GET PLAN */
/* ========================================= */

export async function getPlan(): Promise<Plan> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return "FREE";

  const { data, error } = await supabase
    .from("subscriptions")
    .select("plan, email")
    .eq("user_id", user.id)
    .maybeSingle();

  console.log("PLAN DATA:", data);
  console.log("PLAN ERROR:", error);

  /*
   * Jika user belum mempunyai data subscription,
   * otomatis buat sebagai FREE.
   */
  if (!data) {
    const { error: insertError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: user.id,
        email: user.email ?? null,
        plan: "FREE",
      });

    console.log("CREATE FREE SUBSCRIPTION ERROR:", insertError);

    return "FREE";
  }

  /*
   * Jika subscription sudah ada tetapi email masih NULL,
   * otomatis isi email dari akun Supabase Auth.
   */
  if (!data.email && user.email) {
    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({
        email: user.email,
      })
      .eq("user_id", user.id);

    console.log("SYNC EMAIL ERROR:", updateError);
  }

  return (data.plan as Plan) ?? "FREE";
}

/* ========================================= */
/* SET PLAN */
/* ========================================= */

export async function setPlan(plan: Plan) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("subscriptions")
    .upsert(
      {
        user_id: user.id,
        email: user.email ?? null,
        plan,
      },
      {
        onConflict: "user_id",
      }
    );

  console.log("SET PLAN:", plan);
  console.log("SET PLAN ERROR:", error);
}

/* ========================================= */
/* TODAY USAGE */
/* ========================================= */

export async function getTodayUsage() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("ai_usage")
    .select("count")
    .eq("user_id", user.id)
    .eq("date", today)
    .maybeSingle();

  console.log("USAGE DATA:", data);
  console.log("USAGE ERROR:", error);

  return data?.count ?? 0;
}

/* ========================================= */
/* CAN GENERATE */
/* ========================================= */

export async function canGenerate() {
  const plan = await getPlan();

  console.log("PLAN =", plan);

  /*
   * BASIC dan PRO unlimited.
   */
  if (plan === "BASIC" || plan === "PRO") {
    console.log("UNLIMITED");
    return true;
  }

  /*
   * FREE dibatasi 5 generate per hari.
   */
  const used = await getTodayUsage();

  console.log("USED =", used);
  console.log("LIMIT =", FREE_DAILY_LIMIT);

  return used < FREE_DAILY_LIMIT;
}

/* ========================================= */
/* INCREASE USAGE */
/* ========================================= */

export async function increaseUsage() {
  const plan = await getPlan();

  /*
   * BASIC dan PRO tidak menggunakan limit FREE.
   */
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

  /*
   * Belum ada penggunaan hari ini.
   */
  if (!data) {
    await supabase.from("ai_usage").insert({
      user_id: user.id,
      date: today,
      count: 1,
    });

    return;
  }

  /*
   * Sudah pernah generate hari ini.
   */
  await supabase
    .from("ai_usage")
    .update({
      count: data.count + 1,
    })
    .eq("id", data.id);
}

/* ========================================= */
/* REMAINING GENERATE */
/* ========================================= */

export async function getRemainingGenerate() {
  const plan = await getPlan();

  /*
   * BASIC dan PRO unlimited.
   */
  if (plan !== "FREE") {
    return Infinity;
  }

  const used = await getTodayUsage();

  return Math.max(FREE_DAILY_LIMIT - used, 0);
}

/* ========================================= */
/* UPGRADE BASIC */
/* ========================================= */

export async function upgradeToBasic() {
  await setPlan("BASIC");
}

/* ========================================= */
/* UPGRADE PRO */
/* ========================================= */

export async function upgradeToPro() {
  await setPlan("PRO");
}