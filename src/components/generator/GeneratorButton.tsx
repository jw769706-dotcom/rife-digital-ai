type Props = {
  loading: boolean;
  text: string;
  onClick: () => void;
};

export default function GeneratorButton({
  loading,
  text,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="mt-8 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black transition hover:bg-yellow-300 disabled:opacity-50"
    >
      {loading ? "Generating..." : text}
    </button>
  );
}