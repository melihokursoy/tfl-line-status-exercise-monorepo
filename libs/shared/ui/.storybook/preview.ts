export const parameters = { layout: 'fullscreen' ,
viewport: {
    viewports: {
        laptop: {
            name: 'laptop',
            styles: {
              width: '1440px',
              height: '1024px',
            },
          },  
          tablet: {
            name: 'tablet',
            styles: {
              width: '1024px',
              height: '768px',
            },
          }, 
          mobile: {
            name: 'mobile',
            styles: {
              width: '425px',
              height: '768px',
            },
          },   },
    defaultViewport: 'laptop'
  },
  backgrounds: {
    default: 'Light',
    values: [
      { name: 'Light', value: '#ffffff' }    ],
  }
}