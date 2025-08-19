import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  


    fontFamily: 'Inter, sans-serif',
    headings: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: '600',
    sizes: {
        h1: { fontSize: '2.25rem', lineHeight: 1.3 }, // 36px
        h2: { fontSize: '1.5rem', lineHeight: 1.4 },  // 24px
        h3: { fontSize: '1.25rem', lineHeight: 1.4 }, // 20px
      },
    },
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
    },


    

    colors: {
    // Add your color
    PageColours: [
      '#000000',
      '#0D0D0D',
      '#1A1A1A',
      '#7D7D7D',
      '#F2F2F2',
      '#5f7cb8',
      '#5474b4',
      '#44639f',
      '#39588f',
      '#2d4b81',
    ],

    }



});


export default theme;