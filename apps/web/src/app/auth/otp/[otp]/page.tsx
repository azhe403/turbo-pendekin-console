'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createAccessToken } from '@/lib/auth';
import { Button } from '@az/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@az/ui';
import { Input } from '@az/ui';
import { KeyRound, Copy, CheckCircle, ArrowLeft, RotateCcw } from 'lucide-react';

export default function OTPWithParamPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [otpNumber, setOtpNumber] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const otpParam = params.otp as string;

    if (!otpParam) {
      setError('No OTP provided');
      setLoading(false);
      return;
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otpParam)) {
      setError('Invalid OTP format. Must be 6 digits.');
      setLoading(false);
      return;
    }

    setOtpNumber(otpParam);

    // Auto-submit the OTP
    createToken(parseInt(otpParam));
  }, [params.otp]);

  const createToken = async (otp: number) => {
    setLoading(true);
    setError('');

    try {
      const result = await createAccessToken(otp);

      if (result.error) {
        setError(result.error);
      } else if (result.token) {
        setToken(result.token);
        // Store token in localStorage
        localStorage.setItem('access_token', result.token);
        // Redirect to home after successful token creation
        setTimeout(() => router.push('/'), 100);
      } else {
        setError('No token received');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = token;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const goToManualInput = () => {
    router.push('/auth/otp');
  };

  const createNewToken = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creating Access Token</h1>
          <p className="text-muted-foreground">
            Processing OTP: {otpNumber}
          </p>
        </div>

        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Creating token with OTP: {otpNumber}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Token Creation Result</h1>
        <p className="text-muted-foreground">
          OTP: {otpNumber}
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Authentication Result
            </CardTitle>
            <CardDescription>
              Token creation status for OTP: {otpNumber}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {error}
              </div>
            )}

            {token && (
              <div className="space-y-3">
                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      Token Created Successfully
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={token}
                      readOnly
                      className="flex-1 font-mono text-xs bg-white dark:bg-gray-800"
                    />
                    <Button
                      onClick={copyToken}
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Token has been stored in localStorage as 'access_token'
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={goToManualInput} variant="outline" className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Manual OTP Input
              </Button>

              {token && (
                <Button onClick={createNewToken} variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Create New Token
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
