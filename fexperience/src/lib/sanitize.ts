import rehypeSanitize from 'rehype-sanitize';

export const sanitizeOptions = {
  tagNames: ['h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'img', 'code', 'pre', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'hr'],
  attributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'loading', 'width', 'height', 'class'],
  },
  protocols: {
    href: ['http', 'https', 'mailto', 'tel'],
  },
};

export const sanitizePlugin = rehypeSanitize(sanitizeOptions);