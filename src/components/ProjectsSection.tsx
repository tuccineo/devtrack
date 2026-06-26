import type { Projeto, ProjetoStatus } from '../types/project'
import { ProjectCard } from './ProjectCard'

interface ProjectGroupProps {
  titulo: string
  projetos: Projeto[]
  onStatusChange: (id: string, status: ProjetoStatus) => void
}

function ProjectGroup({ titulo, projetos, onStatusChange }: ProjectGroupProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-zinc-300 border-b border-zinc-800 pb-2">
        {titulo}
        <span className="ml-2 text-sm text-zinc-500 font-normal">{projetos.length} projetos</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projetos.map((p) => (
          <ProjectCard key={p.id} projeto={p} onStatusChange={onStatusChange} />
        ))}
      </div>
    </section>
  )
}

interface ProjectsSectionProps {
  projetos: Projeto[]
  onStatusChange: (id: string, status: ProjetoStatus) => void
}

export function ProjectsSection({ projetos, onStatusChange }: ProjectsSectionProps) {
  const webProjetos = projetos.filter((p) => p.tipo === 'web')
  const mobileProjetos = projetos.filter((p) => p.tipo === 'mobile')

  return (
    <div className="flex flex-col gap-10">
      <ProjectGroup titulo="Web" projetos={webProjetos} onStatusChange={onStatusChange} />
      <ProjectGroup titulo="Mobile" projetos={mobileProjetos} onStatusChange={onStatusChange} />
    </div>
  )
}
