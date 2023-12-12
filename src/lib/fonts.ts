import {
  JetBrains_Mono as FontMono,
  Inter as FontSans, Leckerli_One,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});
export const leckerliOne = Leckerli_One({style: 'normal',subsets:[], weight: '400'})
