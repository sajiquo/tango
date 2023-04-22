export const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="flex min-h-screen w-screen select-none flex-col items-center justify-center bg-gradient-to-b from-cyan-800 to-cyan-950 text-neutral-900">
      <div
        className="flex h-[90vh] w-[90vw] flex-col items-center justify-center bg-white/60"
        role="presentation"
      >
        {children}
      </div>
    </main>
  );
};
