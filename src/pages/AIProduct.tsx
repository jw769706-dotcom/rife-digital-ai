import SubscriptionGuard from "../components/SubscriptionGuard";

export default function AIProduct() {
  return (
    <SubscriptionGuard required="BASIC">

      <div className="p-10">

        <h1 className="text-4xl font-bold text-white">
          Product Studio
        </h1>

        <p className="mt-4 text-gray-400">
          Halaman khusus pengguna BASIC dan PRO.
        </p>

      </div>

    </SubscriptionGuard>
  );
}