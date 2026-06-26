import { useState } from 'react'
import type { Projeto, ProjetoStatus } from '../types/project'

interface ProjectCardProps {
  projeto: Projeto
  onStatusChange: (id: string, status: ProjetoStatus) => void
}

const statusConfig: Record<ProjetoStatus, { label: string; color: string }> = {
  pendente: { label: 'Pendente', color: 'bg-zinc-500 text-zinc-100' },
  'em andamento': { label: 'Em andamento', color: 'bg-yellow-500 text-zinc-900' },
  concluido: { label: 'Concluído', color: 'bg-green-500 text-zinc-900' },
  cancelado: { label: 'Cancelado', color: 'bg-red-500 text-zinc-100' },
}

const formatDate = (date: string | null) => {
  if (!date) return null
  return new Date(date).toLocaleDateString('pt-BR')
}

export function ProjectCard({ projeto, onStatusChange }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { label, color } = statusConfig[projeto.status]
  const visibleTechs = projeto.tecnologias.slice(0, 3)
  const remainingTechs = projeto.tecnologias.length - 3

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="cursor-pointer hover:scale-102 hover:bg-zinc-800 hover:border-zinc-700 text-left transition-all bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className='flex flex-col gap-2'>
            <h2 className="font-semibold text-zinc-100 leading-tight">{projeto.titulo}</h2>
            <span className="text-xs text-zinc-500 uppercase tracking-wide">{projeto.tipo}</span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${color}`}>
            {label}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-zinc-400">{projeto.empresa}</p>

          <div className="flex flex-wrap gap-1">
            {visibleTechs.map((tech) => (
              <span key={tech} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                {tech}
              </span>
            ))}
            {remainingTechs > 0 && (
              <span className="text-xs bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded">
                +{remainingTechs}
              </span>
            )}
          </div>

          <p className="text-xs text-zinc-600">Criado em {formatDate(projeto.criadoEm)}</p>
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-lg w-full flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-zinc-100">{projeto.titulo}</h2>
                <p className="text-sm text-zinc-400">{projeto.empresa}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-100 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="flex gap-2">
              <select
                value={projeto.status}
                onChange={(e) => onStatusChange(projeto.id, e.target.value as ProjetoStatus)}
                className="text-xs bg-zinc-800 text-zinc-300 rounded px-2 py-1 border border-zinc-700"
              >
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full">{projeto.tipo}</span>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs text-zinc-500 uppercase tracking-wide">Tecnologias</p>
              <div className="flex flex-wrap gap-1">
                {projeto.tecnologias.map((tech) => (
                  <span key={tech} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {projeto.notas && (
              <div className="flex flex-col gap-1">
                <p className="text-xs text-zinc-500 uppercase tracking-wide">Notas</p>
                <p className="text-sm text-zinc-300">{projeto.notas}</p>
              </div>
            )}

            <div className="flex flex-col gap-1 text-xs text-zinc-500">
              <p>Criado em: {formatDate(projeto.criadoEm)}</p>
              {projeto.concluidoEm && <p>Concluído em: {formatDate(projeto.concluidoEm)}</p>}
              {projeto.canceladoEm && <p>Cancelado em: {formatDate(projeto.canceladoEm)}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
