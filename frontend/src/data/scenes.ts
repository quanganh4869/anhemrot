export interface SceneLayer {
  image: string;
  position: { x: string; y: string };
  size: { width: string; height: string };
  zIndex: number;
  animation: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'float';
  delay: number;
  opacity?: number;
}

export interface TextBubbleConfig {
  variant: 'cloud-pink' | 'cloud-white' | 'cloud-dark' | 'caption' | 'caption-white';
  position: 'left' | 'right' | 'center' | 'bottom' | 'bottom-left';
  texts: string[];
  textColor?: string;
  fontSize?: string;
}

export interface SceneConfig {
  id: string;
  backgroundColor: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  layers?: SceneLayer[];
  textBubble?: TextBubbleConfig;
  sceneTransition: 'fadeIn' | 'slideUp' | 'crossfade';
  minHeight?: string; // default '100vh'
}

export const scenes: SceneConfig[] = [
  // Scene 01 - COVER: Landscape with "Lời ru" title, black rabbit walking in river/green hills
  {
    id: 'scene-01',
    backgroundColor: '#3a7ca5',
    backgroundImage: '10000201000005A7000007FE417673B00806E3B1.png', // 7MB cover image
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    sceneTransition: 'fadeIn',
    minHeight: '100vh',
  },
  
  // Scene 02 - GODS ON CLOUDS: Three deities in colorful art style on cyan background
  {
    id: 'scene-02',
    backgroundColor: '#12a4d9',
    backgroundImage: '10000201000005A7000007FE719BCF4C8BE80119.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    sceneTransition: 'fadeIn',
  },
  
  // Scene 03 - TITLE TEXT: "Có một ác mộng muốn trở thành Một Giấc Mơ Đẹp" on white bg
  {
    id: 'scene-03',
    backgroundColor: '#f4f1ea',
    backgroundImage: '10000201000005A7000007FE8B214FF1CB3E7485.png',
    backgroundSize: 'contain',
    backgroundPosition: 'center 60%',
    sceneTransition: 'fadeIn',
  },
  
  // Scene 04 - ÁC MỘNG INTRO: Dark creature on purple/organic background
  {
    id: 'scene-04',
    backgroundColor: '#6b205f',
    backgroundImage: '10000201000005A7000007FEF950C610F40E1D03.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    sceneTransition: 'crossfade',
  },
  
  // Scene 05 - THẦN BẦU TRỜI (Sky God): Dark figure with starry dress, pink text bubble left
  {
    id: 'scene-05',
    backgroundColor: '#0d1b3a',
    backgroundImage: '10000201000005A7000007FE77D14825DBEAB761.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textBubble: {
      variant: 'cloud-pink',
      position: 'left',
      texts: ['Thần Bầu Trời gom những vì tinh tú lộng lẫy làm thành chiếc váy.'],
    },
    sceneTransition: 'slideUp',
  },
  
  // Scene 06 - THẦN BIỂN CẢ (Sea God): Dark rabbit on colorful organic background  
  {
    id: 'scene-06',
    backgroundColor: '#6b205f',
    backgroundImage: '10000201000005A7000007FEF950C610F40E1D03.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textBubble: {
      variant: 'cloud-pink',
      position: 'left',
      texts: ['Thần Núi Rừng gom những kỳ hoa dị thảo quý hiếm nhất làm vào lọ nước hoa.'],
    },
    sceneTransition: 'slideUp',
  },
  
  // Scene 07 - BAN BẢO VẬT: Three gods give treasures. Gods left and right, rabbit center.
  {
    id: 'scene-07',
    backgroundColor: '#ffffff',
    backgroundImage: '10000201000005A7000007FEAB278083B72D15AB.png',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    textBubble: {
      variant: 'caption',
      position: 'bottom',
      texts: ['Sáng hôm sau, loài người kháo nhau về một đêm khó ngủ bởi mơ thấy ác mộng.'],
    },
    sceneTransition: 'fadeIn',
  },
  
  // Scene 08 - HẬU QUẢ: Rabbit center, people groups on both sides
  {
    id: 'scene-08',
    backgroundColor: '#ffffff',
    backgroundImage: '10000201000005A7000007FE6AD3E928D5F52BBD.png',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    textBubble: {
      variant: 'caption',
      position: 'bottom',
      texts: ['có người nghe thứ âm thanh hỗn độn đến điếc tai'],
    },
    sceneTransition: 'fadeIn',
  },
  
  // Scene 09 - TUYỆT VỌNG: Dark night scene with puzzle pieces, navy/pink
  {
    id: 'scene-09',
    backgroundColor: '#0d1b3a',
    backgroundImage: '10000201000005A7000007FE9B56E29FEEB76BE9.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    sceneTransition: 'crossfade',
  },
  
  // Scene 10 - CHẤP NHẬN: Rabbit standing in pink/purple pool, text left dark bubble  
  {
    id: 'scene-10',
    backgroundColor: '#0d1b3a',
    backgroundImage: '10000201000005A7000007FE5F46A4350A923851.png',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    textBubble: {
      variant: 'cloud-dark',
      position: 'left',
      texts: [
        'Ác Mộng chấp nhận rằng nó chỉ có thể là một cơn ác mộng, ít nhất hãy để mọi người cứ sợ nó khi nó là chính nó. Mà tốt nhất là nó sẽ không đến chơi với ai trong giấc mơ của họ nữa. Nó không muốn khiến người khác phải khiếp sợ hay chịu tổn thương.',
      ],
      textColor: '#c8d6e5',
    },
    sceneTransition: 'slideUp',
    minHeight: '100vh',
  },
  
  // Scene 11 - TIẾNG KHÓC: Same pool scene but zoomed, text dark bubble right
  {
    id: 'scene-11',
    backgroundColor: '#2a1040',
    backgroundImage: '10000201000005A7000007FE9834011A4788FBD3.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textBubble: {
      variant: 'cloud-dark',
      position: 'right',
      texts: [
        'Nó tò mò lân la đi theo tiếng khóc đó, thì ra là của một đứa bé nằm trong nôi khóc nhè.',
      ],
      textColor: '#c8d6e5',
    },
    sceneTransition: 'crossfade',
  },
  
  // Scene 12 - EM BÉ: Scene with baby top-left, rabbit center-right, organic shapes
  {
    id: 'scene-12',
    backgroundColor: '#2a1040',
    backgroundImage: '10000201000005A7000007FE9834011A4788FBD3.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    textBubble: {
      variant: 'cloud-dark',
      position: 'right',
      texts: [
        'Định quay đi thì em đang khóc lại càng khóc to hơn, dường như em cảm nhận được đang có ai đó rời khỏi mình.',
      ],
      textColor: '#c8d6e5',
    },
    sceneTransition: 'fadeIn',
  },
  
  // Scene 13 - XÓT XA: Close-up, rabbit looking up at baby, emotional scene
  {
    id: 'scene-13',
    backgroundColor: '#1a0d2e',
    backgroundImage: '10000201000005A7000007FE9834011A4788FBD3.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center 60%',
    textBubble: {
      variant: 'cloud-dark',
      position: 'right',
      texts: [
        'Tiếng khóc như xoáy sâu vào tâm can của Ác Mộng. Không hiểu vì sao chưa quen biết gì, nhưng Ác Mộng thấy xót xa quá, sốt ruột quá.',
      ],
      textColor: '#c8d6e5',
    },
    sceneTransition: 'fadeIn',
  },
  
  // Scene 14 - HÁT RU: Rabbit singing with music notes, baby above
  {
    id: 'scene-14',
    backgroundColor: '#0d1b3a',
    backgroundImage: '10000201000005A7000007FE4A72F651E3932A15.png',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    layers: [
      {
        image: '10000201000005A7000007FEEFFCB294C7F9AF3F.png',
        position: { x: '55%', y: '5%' },
        size: { width: '40%', height: '40%' },
        zIndex: 2,
        animation: 'float',
        delay: 0.5,
      },
    ],
    textBubble: {
      variant: 'cloud-white',
      position: 'bottom-left',
      texts: [
        'Dù Ác Mộng có đổi bao nhiêu bài hát ru, đứa trẻ vẫn cứ oe oe khóc. Nó định nhận mình là mẹ của đứa trẻ, nhưng nó nhớ ra đứa trẻ này không có mẹ, nó không thể nào gạt em được.',
      ],
    },
    sceneTransition: 'slideUp',
  },
  
  // Scene 15 - NGƯỜI LÀ AI: Baby asks "Who are you?", zoom to baby and rabbit
  {
    id: 'scene-15',
    backgroundColor: '#1a0d2e',
    backgroundImage: '10000201000005A7000007FE9780E0F277607854.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textBubble: {
      variant: 'cloud-white',
      position: 'bottom-left',
      texts: [
        'Được một thời gian, một hôm em bé chợt cất tiếng: “Người là ai vậy?”.',
      ],
    },
    sceneTransition: 'crossfade',
  },
  
  // Scene 16 - LỘ DIỆN: Rabbit holds baby, emotional reveal
  {
    id: 'scene-16',
    backgroundColor: '#0d1b3a',
    backgroundImage: '10000201000005A7000007FE61A4F388E47762E8.png',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    textBubble: {
      variant: 'cloud-white',
      position: 'left',
      texts: [
        'Chịu thua trước em bé, Ác Mộng hít một hơi thật sâu, chuẩn bị tinh thần lần lộ diện này sẽ là lần cuối nó được gặp em. Ác Mộng rón rén bước đến bên chiếc nôi, nhẹ nhàng ẵm em trên tay. Trái với dự liệu của mình, em bé cười toe toét, hai tay giơ ra đòi ôm lấy Ác Mộng.',
      ],
    },
    sceneTransition: 'slideUp',
  },
  
  // Scene 17 - ÔM: Black creature holding baby, stars and decorations
  {
    id: 'scene-17',
    backgroundColor: '#0d1b3a',
    backgroundImage: '10000201000005A7000007FE8C4CADC71180B3D6.png',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    sceneTransition: 'crossfade',
  },
  
  // Scene 18 - HÓA BƯỚM: Butterfly on colorful abstract background
  {
    id: 'scene-18',
    backgroundColor: '#c81e78',
    backgroundImage: '10000201000005A7000007FE9373A9244B1C581E.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    layers: [
      {
        image: '10000201000005A7000007FE5574FB426F6FDDCD.png',
        position: { x: '50%', y: '40%' },
        size: { width: '25%', height: '25%' },
        zIndex: 3,
        animation: 'float',
        delay: 0.8,
      },
    ],
    textBubble: {
      variant: 'cloud-white',
      position: 'bottom-left',
      texts: [
        'Và giờ đây, trước mắt em bé là đôi cánh bướm đủ màu sắc của Ác Mộng, giờ đây đã trở thành một Giấc Mơ Đẹp.',
      ],
    },
    sceneTransition: 'fadeIn',
  },
  
  // Scene 19 - ENDING TEXT: Meaning of lullaby
  {
    id: 'scene-19',
    backgroundColor: '#f4f1ea',
    textBubble: {
      variant: 'caption',
      position: 'center',
      texts: [
        'Khi em bé lớn lên, em sẽ dần quên đi những chuyện đã xảy ra trong giấc mơ thời ấu thơ.',
        'Nhưng lời hát ru là thứ gì đó in sâu vào tiềm thức của em cảm giác được yêu thương.',
      ],
      fontSize: 'text-2xl md:text-4xl',
    },
    sceneTransition: 'fadeIn',
  },
  
  // Scene 20 - CREDITS
  {
    id: 'scene-20',
    backgroundColor: '#1a0d2e',
    backgroundImage: '10000201000005A7000007FE9373A9244B1C581E.png',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textBubble: {
      variant: 'caption-white',
      position: 'center',
      texts: [
        'SÁNG TÁC: SAN ANH',
        'MỸ THUẬT & MINH HỌA: MR.NGÀI',
      ],
      fontSize: 'text-xl md:text-3xl',
    },
    sceneTransition: 'fadeIn',
    minHeight: '60vh',
  },
];
