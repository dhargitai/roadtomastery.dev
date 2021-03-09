export default function Container({children}) {
  return (
    <div className="flex my-14 gap-10 max-w-7xl mx-auto flex-col md:flex-row px-0 sm:px-5 md:px-20">
      {children}
    </div>
  )
}
