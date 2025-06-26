import React from 'react';
import zxcvbn from 'zxcvbn';

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null;

  const strength = zxcvbn(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="mt-2">
      <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
        <div
          className={`h-full ${strengthColors[strength.score]}`}
          style={{ width: `${(strength.score + 1) * 20}%` }}
        />
      </div>
      <p className="text-sm mt-1 text-gray-700">{strengthLabels[strength.score]}</p>
    </div>
  );
}