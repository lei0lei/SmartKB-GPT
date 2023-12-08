import { Sidebar } from './Sidebar'


export const Navigation = () => {
  return (
    <nav className="flex items-center justify-between px-5 py-2 border-b-2 border-zinc-800">
      <div className="flex items-center gap-3">
        <Sidebar />
        <p>Chat with pdf</p>
      </div>
      {/* <a
        className="flex items-center gap-2 px-4 py-2 text-black text-orange-400 bg-orange-700/20 rounded-xl"
        href="https://github.com/lei0lei/SmartKB-GPT"
      >
        <FiGithub className="text-lg" />
        Source Code
      </a> */}
    </nav>
  )
}