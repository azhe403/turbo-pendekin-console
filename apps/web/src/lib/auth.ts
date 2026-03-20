interface CreateTokenResponse {
  token?: string;
  error?: string;
  message?: string;
  transaction_id?: string;
  execution_time?: string;
  access_expire_in?: number;
  refresh_expire_in?: number;
}

const API_BASE_URL = 'https://engine-stg.zizibot.nf.azhe.my.id';

// Token management utilities
export const setAccessToken = (token: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('access_token', token)
  } catch (error) {
    console.error('Failed to save access token:', error)
  }
}

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null
  
  try {
    return localStorage.getItem('access_token')
  } catch {
    return null
  }
}

export const removeAccessToken = (): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem('access_token')
  } catch (error) {
    console.error('Failed to remove access token:', error)
  }
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  } catch {
    return true // If we can't parse the token, assume it's expired
  }
}

export async function createAccessToken(otp: number): Promise<CreateTokenResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/session/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
      body: JSON.stringify({ otp }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const token = data.result?.access_token;
    
    // Save token to localStorage if successful
    if (token) {
      setAccessToken(token);
    }
    
    return {
      token: token,
      message: data.message,
      transaction_id: data.transaction_id,
      execution_time: data.execution_time,
      access_expire_in: data.result?.access_expire_in,
      refresh_expire_in: data.result?.refresh_expire_in,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
