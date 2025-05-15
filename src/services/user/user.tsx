import { useQuery } from '@tanstack/react-query'

import { callApi } from '@services/https-service'

export const useGetUser = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await callApi('users/1', {
        method: 'GET',
      })
      return response?.data
    },
    enabled: false,
  })

  return { data, isLoading, error, getUser: refetch }
}
