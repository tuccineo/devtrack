import { useProjetoStore } from './store/useProjectStore'
import { ProjectsSection } from './components/ProjectsSection'

function App() {
  const { projetos, updateStatus } = useProjetoStore()

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <h1 className="text-2xl font-bold mb-6">DevTrack</h1>
      <ProjectsSection projetos={projetos} onStatusChange={updateStatus} />
    </div>
  )
}

export default App