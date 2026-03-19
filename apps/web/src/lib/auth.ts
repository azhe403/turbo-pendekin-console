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
    return {
      token: data.result?.access_token,
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
