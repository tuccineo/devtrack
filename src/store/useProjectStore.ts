import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Projeto, ProjetoStatus } from '../types/project'
import { seedProjetos } from '../data/projectSeed'

interface ProjetoStore {
    projetos: Projeto[]
    addProjeto: (p: Projeto) => void
    updateStatus: (id: string, status: ProjetoStatus) => void
    updateNotas: (id: string, notas: string) => void
}

export const useProjetoStore = create<ProjetoStore>()(
    persist(
        (set) => ({
            projetos: seedProjetos(),
            addProjeto: (p) => set((s) => ({ projetos: [...s.projetos, p] })),
            updateStatus: (id, status) =>
                set((s) => ({
                    projetos: s.projetos.map((p) =>
                        p.id === id ? { ...p, status } : p
                    ),
                })),
            updateNotas: (id, notas) =>
                set((s) => ({
                    projetos: s.projetos.map((p) =>
                        p.id === id ? { ...p, notas } : p
                    ),
                })),
        }),
        { name: 'devtrack-storage' } // chave no localStorage
    )
)