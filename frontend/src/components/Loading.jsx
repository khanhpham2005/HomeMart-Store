function Loading({ label = 'Loading' }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-md border border-dashed border-stone-300 bg-white p-6 text-stone-600">
      {label}...
    </div>
  );
}

export default Loading;
