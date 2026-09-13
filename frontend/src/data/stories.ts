export interface StoryScene {
  id: string;
  type: 'cover' | 'scene' | 'transition' | 'ending';
  text: string[];
  visual: {
    backgroundTone: string;
    illustrationType: string;
    colorHint: string;
    mainImage?: string;
    dropCap?: string;
  };
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  author: string;
  illustrator: string;
  shortDescription: string;
  type: string;
  readingTime: string;
  ageRange: string;
  scenes: StoryScene[];
}



export const stories: Story[] = [
  {
    id: '1',
    slug: 'loi-ru-cua-ac-mong',
    title: 'Lời Ru Của Ác Mộng',
    author: 'San Anh',
    illustrator: 'Mr.Ngai',
    shortDescription: 'Một cơn Ác Mộng luôn khao khát mang lại giấc ngủ ngon...',
    type: 'Bedtime Tale',
    readingTime: '5 mins',
    ageRange: 'Mọi lứa tuổi',
    scenes: [
      {
        id: 'page-01',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#e6ede4', illustrationType: 'cover', colorHint: 'landscape', mainImage: '10000201000005A7000007FE417673B00806E3B1.png' }
      },
      {
        id: 'page-02',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#12a4d9', illustrationType: 'cloud-sky', colorHint: 'clouds', mainImage: '10000201000005A7000007FE719BCF4C8BE80119.png' }
      },
      {
        id: 'page-03',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#f4f1ea', illustrationType: 'title', colorHint: 'cream', mainImage: '10000201000005A7000007FE8B214FF1CB3E7485.png' }
      },
      {
        id: 'page-04',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#6b205f', illustrationType: 'abstract-organic', colorHint: 'purple', mainImage: '10000201000005A7000007FEF950C610F40E1D03.png' }
      },
      {
        id: 'page-05',
        type: 'scene',
        text: [
          'Nó khóc nỉ non, van xin với các vị thần.',
          'Thần Bầu Trời gom những vì tinh tú lộng lẫy làm thành chiếc váy.',
          'Thần Biển Cả gom những giọng hát du dương nhất của các vị mỹ nhân ngư từ 7 đại dương vào chiếc vòng cổ.',
          'Thần Núi Rừng gom những kỳ hoa dị thảo quý hiếm nhất làm vào lọ nước hoa.',
          'Ba vị thần ban bảo vật cho Ác Mộng và chúc phúc cho nguyện vọng của nó sẽ trở thành sự thật.',
          'Sáng hôm sau, loài người kháo nhau về một đêm khó ngủ bởi mơ thấy ác mộng.',
          'Có người mơ thấy ánh sáng chói loá đến đau mắt, có người nghe thứ âm thanh hỗn độn đến điếc tai, có người ngửi thấy mùi hương nồng nàn đến nhức mũi, thậm chí có người còn lên cơn dị ứng bởi phấn hoa.'
        ],
        visual: { backgroundTone: '#ffffff', illustrationType: 'text-only', colorHint: 'white', dropCap: 'N' }
      },
      {
        id: 'page-06',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#0d1b2a', illustrationType: 'navy-pink-shape', colorHint: 'navy', mainImage: '10000201000005A7000007FE77D14825DBEAB761.png' }
      },
      {
        id: 'page-07',
        type: 'scene',
        text: [
          'Ác Mộng tuyệt vọng lắm, nó cởi bỏ các báu vật mà các vị thần đã ban cho.',
          'Ác Mộng chấp nhận rằng nó chỉ có thể là một cơn ác mộng, ít nhất hãy để mọi người cứ sợ nó khi nó là chính nó.',
          'Mà tốt nhất là nó sẽ không đến chơi với ai trong giấc mơ của họ nữa.',
          'Nó không muốn khiến người khác phải khiếp sợ hay chịu tổn thương.'
        ],
        visual: { backgroundTone: '#ffffff', illustrationType: 'text-only', colorHint: 'white', dropCap: 'Á' }
      },
      {
        id: 'page-08',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#f4f1ea', illustrationType: 'dream-world', colorHint: 'cream', mainImage: '10000201000005A7000007FEAB278083B72D15AB.png' }
      },
      {
        id: 'page-09',
        type: 'scene',
        text: [
          'Đang thất thểu đi trên Sảnh Giấc Mơ, nó nghe thấy văng vẳng tiếng ai đó khóc.',
          'Nó tò mò lân la đi theo tiếng khóc đó, thì ra là của một đứa bé nằm trong nôi khóc nhè.',
          'Định quay đi thì em đang khóc lại càng khóc to hơn, dường như em cảm nhận được đang có ai đó rời khỏi mình.'
        ],
        visual: { backgroundTone: '#ffffff', illustrationType: 'text-only', colorHint: 'white', dropCap: 'Đ' }
      },
      {
        id: 'page-10',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#6b205f', illustrationType: 'abstract-painting', colorHint: 'painting', mainImage: '10000201000005A7000007FE9834011A4788FBD3.png' }
      },
      {
        id: 'page-11',
        type: 'scene',
        text: [
          'Tiếng khóc như xoáy sâu vào tâm can của Ác Mộng.',
          'Không hiểu vì sao chưa quen biết gì, nhưng Ác Mộng thấy xót xa quá, sốt ruột quá.',
          'Không kềm được lòng mình, như một bản năng sẵn có, Ác Mộng cất lên tiếng hát ru.',
          'Đứa trẻ oe oe vài tiếng rồi dần chìm vào giấc ngủ.',
          'Hôm ấy và các hôm sau nữa, em bé ngủ rất ngon bởi vì luôn có Ác Mộng ru em ngủ trong mơ.',
          'Được một thời gian, một hôm em bé chợt cất tiếng: “Người là ai vậy?”.',
          'Trong thế giới của giấc mơ, cả một đứa trẻ sơ sinh cũng có thể nói chuyện như bình thường.',
          'Ác Mộng giật thót người, nó định lờ đi câu hỏi thì em bé tiếp tục lặp lại câu hỏi. Nó im phăng phắc.',
          'Em bé dỗi: “Nếu người không trả lời, con sẽ khóc cho đến khi nào người chịu trả lời mới thôi.”',
          'Dù Ác Mộng có đổi bao nhiêu bài hát ru, đứa trẻ vẫn cứ oe oe khóc.',
          'Nó định nhận mình là mẹ của đứa trẻ, nhưng nó nhớ ra đứa trẻ này không có mẹ, nó không thể nào gạt em được.',
          'Chịu thua trước em bé, Ác Mộng hít một hơi thật sâu, chuẩn bị tinh thần lần lộ diện này sẽ là lần cuối nó được gặp em.'
        ],
        visual: { backgroundTone: '#ffffff', illustrationType: 'text-only', colorHint: 'white', dropCap: 'T' }
      },
      {
        id: 'page-12',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#2b657e', illustrationType: 'blue-texture', colorHint: 'blue', mainImage: '10000201000005A7000007FE9B56E29FEEB76BE9.png' }
      },
      {
        id: 'page-13',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#f4f1ea', illustrationType: 'central-figure', colorHint: 'cream', mainImage: '10000201000005A7000007FE5F46A4350A923851.png' }
      },
      {
        id: 'page-14',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#f4f1ea', illustrationType: 'two-figures', colorHint: 'cream', mainImage: '10000201000005A7000007FEF40D3A571E0C0BBE.png' }
      },
      {
        id: 'page-15',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#f4f1ea', illustrationType: 'organic-blobs', colorHint: 'cream', mainImage: '10000201000005A7000007FEDC8860D6ED6AE970.png' }
      },
      {
        id: 'page-16',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#f4f1ea', illustrationType: 'purple-shape', colorHint: 'cream', mainImage: '10000201000005A7000007FE9780E0F277607854.png' }
      },
      {
        id: 'page-17',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#f4f1ea', illustrationType: 'ochre-transition', colorHint: 'cream', mainImage: '10000201000005A7000007FE33381E45B229C774.png' }
      },
      {
        id: 'page-18',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#f4f1ea', illustrationType: 'black-creature', colorHint: 'cream', mainImage: '10000201000005A7000007FE61A4F388E47762E8.png' }
      },
      {
        id: 'page-19',
        type: 'scene',
        text: [
          'Ác Mộng rón rén bước đến bên chiếc nôi, nhẹ nhàng ẵm em trên tay.',
          'Trái với dự liệu của mình, em bé cười toe toét, hai tay giơ ra đòi ôm lấy Ác Mộng.',
          'Không biết từ bao giờ, hình như là ngay giây phút em bé đặt Ác Mộng vào tim, vỏ ngoài của Ác Mộng bắt đầu xuất hiện những vết nứt rạn.',
          'Và giờ đây, trước mắt em bé là đôi cánh bướm đủ màu sắc của Ác Mộng, giờ đây đã trở thành một Giấc Mơ Đẹp.',
          'Khi em bé lớn lên, em sẽ dần quên đi những chuyện đã xảy ra trong giấc mơ thời ấu thơ.',
          'Nhưng lời hát ru là thứ gì đó in sâu vào tiềm thức của em cảm giác được yêu thương.'
        ],
        visual: { backgroundTone: '#ffffff', illustrationType: 'silhouette', colorHint: 'white', mainImage: '10000201000005A7000007FE8C4CADC71180B3D6.png' }
      },
      {
        id: 'page-20',
        type: 'scene',
        text: [],
        visual: { backgroundTone: '#f4f1ea', illustrationType: 'final-ending', colorHint: 'cream', mainImage: '10000201000005A7000007FE9373A9244B1C581E.png' }
      }
    ]
  }
];

export const getStoryBySlug = (slug: string) => stories.find(s => s.slug === slug);
