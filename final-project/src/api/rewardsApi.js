import cloudImg from '../assets/cloud.png';
import cloud2Img from '../assets/cloud2.png';
import cloud3Img from '../assets/cloud3.png';
import cloud4Img from '../assets/cloud4.png';
import cloud5Img from '../assets/cloud5.png';
import cloud6Img from '../assets/cloud6.png';

export const fetchRewardByStars = async (stars) => {
  return getLocalRewardData(stars);
};

const getLocalRewardData = (stars) => {
  const data = {
    25: {
      stars: 25,
      image: cloudImg,
      images: [cloudImg],
      description: "$1 off a drink customization, including an espresso shot, syrup or cold foam.",
      isNew: false
    },
    60: {
      stars: 60,
      image: cloud2Img,
      images: [cloud2Img],
      description: "New! Up to $2 off your order.",
      isNew: true
    },
    100: {
      stars: 100,
      image: cloud3Img,
      images: [cloud3Img],
      description: "Hot breakfast sandwich, oatmeal or your choice of bakery item.",
      isNew: false
    },
    200: {
      stars: 200,
      image: cloud4Img,
      images: [cloud4Img],
      description: "Handcrafted drink (like a latte or macchiato) or hot breakfast.",
      isNew: false
    },
    300: {
      stars: 300,
      image: cloud5Img,
      images: [cloud5Img],
      description: "Lunch sandwich, protein box or salad.",
      isNew: false
    },
    400: {
      stars: 400,
      image: cloud6Img,
      images: [cloud6Img],
      description: "Select Starbucks® merchandise up to $20.",
      isNew: false
    }
  };
  return data[stars] || data[25];
};