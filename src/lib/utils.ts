import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
import {EDescendant, TElement} from "@udecode/plate-common";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const escapeHTML = (unsafe: string) => {
  return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}
export const serialize = (node: EDescendant<TElement[]>) => {
  if (node.text) {
    let string = escapeHTML(node.text as string)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    let style = '';
    if(node.backgroundColor) style +=`background-color: ${node.backgroundColor};`;
    if(node.color) style +=`color:${node.color};`;
    if(node.fontSize) style +=`font-size:${node.fontSize};`;
    if(style.length == 0 ) return  string;
    return `<span style='${style}'>${string}</span>`;
  }

  const children: string = (node.children) ? (node.children as TElement[]).map(n => serialize(n)).join('') : ''
  switch (node.type) {
    case 'img':
      return `<image class="block w-full max-w-full object-cover px-0 rounded-sm" src=${node.url}></image>`;
    case 'h1':
      return `<h1 class="mb-1 mt-[2em] font-heading text-4xl font-bold">${children}</h1>`;
    case 'h2':
      return `<h2 class="mb-px mt-[1.4em] font-heading text-2xl font-semibold tracking-tight">${children}</h2>`;
    case 'h3':
      return `<h3 class="mb-px mt-[1em] font-heading text-xl font-semibold tracking-tight"></h3>`
    case 'h4':
      return `<h4 class="mt-[0.75em] font-heading text-lg font-semibold tracking-tight"></h4>`
    case 'h5':
      return `<h5 class="mt-[0.75em] text-lg font-semibold tracking-tight"></h5>`
    case 'h6':
      return `<h5 class="mt-[0.75em] text-base font-semibold tracking-tight"></h5>`
    case 'quote':
      return `<blockquote ><p>${children}</p></blockquote>`
    case 'p':
      return `<p class="m-0 px-0 py-1" >${children}</p>`
    case 'link':
    case 'a':
      return `<a class="font-medium text-primary underline decoration-primary underline-offset-4" target="${node.target}" href="${escapeHTML(node.url as string)}">${children}</a>`
    case 'caption':
      return `<caption class=${cn(
          'mt-2 w-full resize-none border-none bg-inherit p-0 font-[inherit] text-inherit',
          'focus:outline-none focus:[&::placeholder]:opacity-0',
          'text-center print:placeholder:text-transparent',
      )}>${children}</caption>`;
    case 'ul' :
      return `<ul class="m-0 ps-6 list-disc [&_ul]:list-[circle] [&_ul_ul]:list-[square]">${children}</ul>`;
    case 'li':
      return `<li>${children}</li>`
    default:
      return children
  }
}