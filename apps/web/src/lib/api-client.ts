import { z } from 'zod'
import { getAccessToken as getAuthAccessToken } from './auth'

// API Response Types
export const ShortenUrlResponseSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  data: z.object({
    short_path: z.string(),
    original_url: z.string(),
  }).optional(),
  short_path: z.string().optional(),
  result: z.object({
    short_path: z.string(),
    original_url: z.string(),
  }).optional(),
})

export type ShortenUrlResponse = z.infer<typeof ShortenUrlResponseSchema>

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  error: z.string().optional(),
})

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>

// API Request Types
export const ShortenUrlRequestSchema = z.object({
  original_url: z.string().url(),
  short_path: z.string().optional(),
})

export type ShortenUrlRequest = z.infer<typeof ShortenUrlRequestSchema>

// Utility function to get access token from localStorage
const getAccessTokenFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null
  
  try {
    return localStorage.getItem('access_token')
  } catch {
    return null
  }
}

// API Client Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://127.0.0.1:7120'
const API_TIMEOUT = 10000 // 10 seconds

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Generic API client with proper error handling
class ApiClient {
  private baseURL: string
  private timeout: number

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const url = `${this.baseURL}${endpoint}`
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Turbo-Pendekin-Console/1.0.0',
          'Accept': '*/*',
          'Cache-Control': 'no-cache',
          'Host': new URL(this.baseURL).host,
          'Connection': 'keep-alive',
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch {
          // If we can't parse error response, use default message
        }

        throw new ApiError(errorMessage, response.status)
      }

      const data = await response.json()
      console.log('API Response:', data) // Debug log
      
      // Handle different response formats
      if (data.success === false) {
        throw new ApiError(data.message || 'Request failed', response.status)
      }
      
      return data
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof ApiError) {
        throw error
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError('Request timed out. Please check your connection and try again.')
        }
        if (error.message.includes('Failed to fetch')) {
          throw new ApiError('Network connection failed. Please check your internet connection.')
        }
        if (error.message.includes('504')) {
          throw new ApiError('Server temporarily unavailable. Please try again in a moment.')
        }
      }

      throw new ApiError('An unexpected error occurred. Please try again.')
    }
  }

  async shortenUrl(request: ShortenUrlRequest): Promise<ShortenUrlResponse> {
    const token = getAuthAccessToken() || process.env.NEXT_PUBLIC_ACCESS_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMzYyMDU3MjYiLCJleHAiOjE3NzM5NzcxNzYsImlzcyI6IllPVVJfSVNTVUVSIiwiYXVkIjoiWU9VUl9BVURJRU5DRSJ9.Pb6Q9UCW3i4gDCOKpqznENRgODzWZpnT4IKT4IkngRk'
    
    console.log('Making request to:', `${this.baseURL}/api/pendekin`)
    console.log('Request payload:', request)
    console.log('Using token:', token.substring(0, 20) + '...')
    
    return this.request<ShortenUrlResponse>('/api/pendekin', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    })
  }

  // Add other API methods here as needed
  // async getLinks(): Promise<LinksResponse> { ... }
  // async deleteLink(id: string): Promise<void> { ... }
}

export const apiClient = new ApiClient()
export { ApiError }
