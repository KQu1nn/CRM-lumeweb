import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Apenas protege rotas sob /api/
  if (event.path.startsWith('/api/')) {
    try {
      const user = await serverSupabaseUser(event)
      
      if (!user) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized',
          message: 'Você precisa estar autenticado para acessar este recurso da API.'
        })
      }
      
      // Anexa o usuário autenticado ao contexto da requisição (opcional)
      event.context.user = user
    } catch (error: any) {
      // Se já for um erro HTTP criado por nós, propaga. Caso contrário, lança erro de autenticação.
      if (error.statusCode) {
        throw error
      }
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: 'Falha na validação da sessão do Supabase.'
      })
    }
  }
})
