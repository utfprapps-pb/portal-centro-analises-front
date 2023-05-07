import { useCallback, useState } from 'react'

import { toast } from 'react-hot-toast'

import { DependencesHookProps } from './types'

export const dependencesHook =
  <T>({ getDependences }: DependencesHookProps<T>) =>
  () => {
    const [dependencesLoading, setDependencesLoading] = useState(false)
    const [dependences, setDependences] = useState<T>([] as T)

    const fetchDependences = useCallback(async () => {
      if (!getDependences) return

      try {
        setDependencesLoading(true)

        const dependencesResult = await getDependences()
        setDependences(dependencesResult)
      } catch (error) {
        toast.error('Erro ao buscar dependências')
      } finally {
        setDependencesLoading(false)
      }
    }, [])

    return {
      dependences,
      dependencesLoading,
      fetchDependences
    }
  }
