const imageToBase64 = require('image-to-base64');

const src = '../../uploads/1615409554608.jpeg';

const brat = imageToBase64(src);

brat.then((value) => (brat = value));

console.log(brat);
