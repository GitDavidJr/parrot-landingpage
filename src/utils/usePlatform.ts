import { useState, useEffect } from 'react';

export interface PlatformInfo {
  os: 'mac-arm' | 'mac-intel' | 'windows' | 'linux' | 'other';
  label: string;
  osName: string;
  badge: string;
  fileName: string;
  downloadUrl: string;
}

export function usePlatform(): PlatformInfo {
  const [platform, setPlatform] = useState<PlatformInfo>({
    os: 'mac-arm',
    label: 'Baixar para Mac (Apple Silicon)',
    osName: 'macOS (Apple Silicon)',
    badge: 'M1 / M2 / M3 / M4',
    fileName: 'Parrot-macOS.dmg',
    downloadUrl: 'https://github.com/davidjunior/parrot/releases/latest/download/Parrot-macOS.dmg'
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const platformStr = window.navigator.platform?.toLowerCase() || '';

    if (userAgent.includes('win')) {
      setPlatform({
        os: 'windows',
        label: 'Baixar para Windows',
        osName: 'Windows 10 / 11',
        badge: 'x64 • Instalador Direto',
        fileName: 'Parrot-Windows-x64.zip',
        downloadUrl: 'https://github.com/davidjunior/parrot/releases/latest/download/Parrot-Windows-x64.zip'
      });
    } else if (userAgent.includes('mac') || platformStr.includes('mac')) {
      // Default to Apple Silicon as modern standard (M1-M4)
      setPlatform({
        os: 'mac-arm',
        label: 'Baixar para Mac (Apple Silicon)',
        osName: 'macOS (Apple Silicon)',
        badge: 'M1 / M2 / M3 / M4',
        fileName: 'Parrot-macOS.dmg',
        downloadUrl: 'https://github.com/davidjunior/parrot/releases/latest/download/Parrot-macOS.dmg'
      });
    } else if (userAgent.includes('linux')) {
      setPlatform({
        os: 'linux',
        label: 'Baixar para Linux',
        osName: 'Linux x86_64',
        badge: 'Tarball / AppImage',
        fileName: 'Parrot-linux-x64.tar.gz',
        downloadUrl: 'https://github.com/davidjunior/parrot/releases/latest'
      });
    }
  }, []);

  return platform;
}
