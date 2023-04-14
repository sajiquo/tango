
export const Main = ({ children }: React.PropsWithChildren) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-slate-200 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      {children}
    </main>
  )

}
