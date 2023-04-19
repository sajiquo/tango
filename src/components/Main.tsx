export const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="flex min-h-screen w-screen select-none flex-col items-center justify-center bg-gradient-to-b from-[#38065e] to-[#200436] text-neutral-200">
      <div
        className="flex h-[90vh] w-[90vw] flex-col items-center justify-center bg-neutral-900/70"
        role="presentation"
      >
        {children}
      </div>
    </main>
  );
};
