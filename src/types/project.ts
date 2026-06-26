export type ProjetoStatus = 'pendente' | 'em andamento' | 'concluido' | 'cancelado'

export interface Projeto {
    id: string
    titulo: string
    tipo: 'web' | 'mobile'
    empresa: string
    tecnologias: string[]
    status: ProjetoStatus
    notas: string
    criadoEm: string
    canceladoEm: string | null
    concluidoEm: string | null
}