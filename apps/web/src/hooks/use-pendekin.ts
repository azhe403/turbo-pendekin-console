import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient, type ShortenUrlRequest, type ShortenUrlResponse } from '@/lib/api-client'

// Query keys for caching and invalidation
export const pendekinKeys = {
  all: ['pendekin'] as const,
  lists: () => [...pendekinKeys.all, 'list'] as const,
  list: (filters: string) => [...pendekinKeys.lists(), { filters }] as const,
  details: () => [...pendekinKeys.all, 'detail'] as const,
  detail: (id: string) => [...pendekinKeys.details(), id] as const,
}

// Mutation hook for shortening URLs
export function useShortenUrl() {
  const queryClient = useQueryClient()

  return useMutation<ShortenUrlResponse, Error, ShortenUrlRequest>({
    mutationFn: (request) => apiClient.shortenUrl(request),
    
    // Refetch on success
    onSuccess: (data) => {
      console.log('Mutation successful:', data)
      queryClient.invalidateQueries({ queryKey: pendekinKeys.lists() })
    },
    
    // Handle errors
    onError: (error) => {
      console.error('Mutation failed:', error)
    },
    
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: pendekinKeys.lists() })
    },
  })
}

// Query hook for getting recent links (placeholder - implement when API is ready)
export function useRecentLinks() {
  return useQuery({
    queryKey: pendekinKeys.lists(),
    queryFn: async () => {
      // Placeholder data until API endpoint is ready
      return [
        {
          id: '1',
          shortUrl: 'portfolio',
          originalUrl: 'https://example.com/portfolio',
          clicks: 1240,
          createdAt: '2024-03-15',
        },
        {
          id: '2',
          shortUrl: 'summer',
          originalUrl: 'https://example.com/campaign',
          clicks: 856,
          createdAt: '2024-03-10',
        },
      ]
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
  })
}

// Query hook for getting link details (placeholder - implement when API is ready)
export function useLinkDetails(id: string) {
  return useQuery({
    queryKey: pendekinKeys.detail(id),
    queryFn: async () => {
      // Placeholder implementation
      if (!id) throw new Error('Link ID is required')
      
      // Replace with actual API call when ready
      // return apiClient.getLink(id)
      
      // Placeholder data
      return {
        id,
        shortUrl: id,
        originalUrl: 'https://example.com',
        clicks: 0,
        createdAt: new Date().toISOString(),
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Mutation hook for deleting links (placeholder - implement when API is ready)
export function useDeleteLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      // Placeholder implementation
      // return apiClient.deleteLink(id)
      console.log('Deleting link:', id)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pendekinKeys.lists() })
    },
  })
}
