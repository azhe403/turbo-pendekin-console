'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAccessToken } from '@/lib/auth';
import { Button } from '@az/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@az/ui';
import { Input } from '@az/ui';
import { Label } from '@az/ui';
import { KeyRound, Copy, CheckCircle } from 'lucide-react';

export default function OTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setLoading(true);
    setError('');
    setToken('');

    try {
      const result = await createAccessToken(parseInt(otp));

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Access Token</h1>
        <p className="text-muted-foreground">
          Enter your 6-digit OTP code to generate an access token
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              OTP Authentication
            </CardTitle>
            <CardDescription>
              Enter your one-time password to create a new access token
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="text-center text-lg font-mono tracking-widest"
                />
                <p className="text-sm text-muted-foreground">
                  Enter your 6-digit OTP code
                </p>
              </div>

              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Token...' : 'Create Token'}
              </Button>
            </form>

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

            <div className="text-center text-sm text-muted-foreground">
              Or navigate directly to{' '}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                /auth/otp/123456
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
