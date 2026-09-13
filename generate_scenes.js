const fs = require('fs');

const raw = [
  { images: ["10000201000005A7000007FE417673B00806E3B1.png", "1000020100000224000002DB12E139401DB40DDA.png"], text: [] },
  { images: ["10000201000005A7000007FE719BCF4C8BE80119.png"], text: [] },
  { images: ["10000201000005A7000007FE8B214FF1CB3E7485.png"], text: [] },
  { images: ["10000201000005A7000007FEF950C610F40E1D03.png"], text: [] },
  { images: ["10000201000005A7000007FE719BCF4C8BE80119.png"], text: ["Nó khóc nỉ non, van xin với các vị thần.", "Thần Bầu Trời gom những vì tinh tú lộng lẫy làm thành chiếc váy.", "Thần Biển Cả gom những giọng hát du dương nhất của các vị mỹ nhân ngư từ 7 đại dương vào chiếc vòng cổ.", "Thần Núi Rừng gom những kỳ hoa dị thảo quý hiếm nhất làm vào lọ nước hoa.", "Ba vị thần ban bảo vật cho Ác Mộng và chúc phúc cho nguyện vọng của nó sẽ trở thành sự thật."] },
  { images: ["10000201000005A7000007FE77D14825DBEAB761.png"], text: [] },
  { images: ["10000201000005A7000007FE719BCF4C8BE80119.png"], text: ["Sáng hôm sau, loài người kháo nhau về một đêm khó ngủ bởi mơ thấy ác mộng.", "Có người mơ thấy ánh sáng chói loá đến đau mắt, có người nghe thứ âm thanh hỗn độn đến điếc tai, có người ngửi thấy mùi hương nồng nàn đến nhức mũi, thậm chí có người còn lên cơn dị ứng bởi phấn hoa."] },
  { images: ["10000201000005A7000007FEAB278083B72D15AB.png", "10000201000005A7000007FE6AD3E928D5F52BBD.png"], text: [] },
  { images: ["10000201000005A7000007FE719BCF4C8BE80119.png"], text: ["Ác Mộng tuyệt vọng lắm, nó cởi bỏ các báu vật mà các vị thần đã ban cho.", "Ác Mộng chấp nhận rằng nó chỉ có thể là một cơn ác mộng, ít nhất hãy để mọi người cứ sợ nó khi nó là chính nó.", "Mà tốt nhất là nó sẽ không đến chơi với ai trong giấc mơ của họ nữa.", "Nó không muốn khiến người khác phải khiếp sợ hay chịu tổn thương."] },
  { images: ["10000201000005A7000007FE9834011A4788FBD3.png"], text: [] },
  { images: ["10000201000005A7000007FE719BCF4C8BE80119.png"], text: ["Đang thất thểu đi trên Sảnh Giấc Mơ, nó nghe thấy văng vẳng tiếng ai đó khóc.", "Nó tò mò lân la đi theo tiếng khóc đó, thì ra là của một đứa bé nằm trong nôi khóc nhè.", "Định quay đi thì em đang khóc lại càng khóc to hơn, dường như em cảm nhận được đang có ai đó rời khỏi mình."] },
  { images: ["10000201000005A7000007FE9B56E29FEEB76BE9.png", "1000020100000224000002DB12E139401DB40DDA.png"], text: [] },
  { images: ["10000201000005A7000007FE5F46A4350A923851.png", "10000201000005A7000007FEAADCFAFBC4785D2A.png"], text: ["Tiếng khóc như xoáy sâu vào tâm can của Ác Mộng.", "Không hiểu vì sao chưa quen biết gì, nhưng Ác Mộng thấy xót xa quá, sốt ruột quá.", "Không kềm được lòng mình, như một bản năng sẵn có, Ác Mộng cất lên tiếng hát ru.", "Đứa trẻ oe oe vài tiếng rồi dần chìm vào giấc ngủ.", "Hôm ấy và các hôm sau nữa, em bé ngủ rất ngon bởi vì luôn có Ác Mộng ru em ngủ trong mơ."] },
  { images: ["10000201000005A7000007FE4A72F651E3932A15.png", "10000201000005A7000007FEF40D3A571E0C0BBE.png", "10000201000005A7000007FEEFFCB294C7F9AF3F.png"], text: [] },
  { images: ["10000201000005A7000007FE06AA8A5284B7717F.png", "10000201000005A7000007FE35B39EA656409616.png", "10000201000005A7000007FE33381E45B229C774.png", "10000201000005A7000007FEDC8860D6ED6AE970.png", "10000201000005A7000007FE254039D24F9A7033.png", "10000201000005A7000007FE2120B9EFB1EDF1A2.png"], text: ["Được một thời gian, một hôm em bé chợt cất tiếng: “Người là ai vậy?”.", "Trong thế giới của giấc mơ, cả một đứa trẻ sơ sinh cũng có thể nói chuyện như bình thường.", "Ác Mộng giật thót người, nó định lờ đi câu hỏi thì em bé tiếp tục lặp lại câu hỏi.", "Nó im phăng phắc.", "Em bé dỗi: “Nếu người không trả lời, con sẽ khóc cho đến khi nào người chịu trả lời mới thôi.”"] },
  { images: ["10000201000005A7000007FE33381E45B229C774.png", "10000201000005A7000007FE35B39EA656409616.png", "10000201000005A7000007FE254039D24F9A7033.png", "10000201000005A7000007FE2120B9EFB1EDF1A2.png", "10000201000005A7000007FE21DAAA2FBEAC0DCF.png", "10000201000005A7000007FE9780E0F277607854.png"], text: [] },
  { images: ["10000201000005A7000007FE33381E45B229C774.png", "10000201000005A7000007FE2120B9EFB1EDF1A2.png", "10000201000005A7000007FE178CB6EEDD8A684B.png"], text: ["Dù Ác Mộng có đổi bao nhiêu bài hát ru, đứa trẻ vẫn cứ oe oe khóc.", "Nó định nhận mình là mẹ của đứa trẻ, nhưng nó nhớ ra đứa trẻ này không có mẹ, nó không thể nào gạt em được.", "Chịu thua trước em bé, Ác Mộng hít một hơi thật sâu, chuẩn bị tinh thần lần lộ diện này sẽ là lần cuối nó được gặp em."] },
  { images: ["10000201000005A7000007FE61A4F388E47762E8.png", "10000201000005A7000007FE21DAAA2FBEAC0DCF.png"], text: [] },
  { images: ["10000201000005A7000007FE9780E0F277607854.png", "10000201000005A7000007FE8C4CADC71180B3D6.png"], text: ["Ác Mộng rón rén bước đến bên chiếc nôi, nhẹ nhàng ẵm em trên tay.", "Trái với dự liệu của mình, em bé cười toe toét, hai tay giơ ra đòi ôm lấy Ác Mộng."] },
  { images: ["10000201000005A7000007FE9373A9244B1C581E.png", "10000201000005A7000007FEB2F02655D0E08F5E.png", "10000201000005A7000007FE5574FB426F6FDDCD.png"], text: [] },
  { images: ["10000201000005A7000007FE719BCF4C8BE80119.png"], text: ["Không biết từ bao giờ, hình như là ngay giây phút em bé đặt Ác Mộng vào tim, vỏ ngoài của Ác Mộng bắt đầu xuất hiện những vết nứt rạn.", "Và giờ đây, trước mắt em bé là đôi cánh bướm đủ màu sắc của Ác Mộng, giờ đây đã trở thành một Giấc Mơ Đẹp."] },
  { images: ["10000201000005A7000007FEEFFCB294C7F9AF3F.png"], text: ["Khi em bé lớn lên, em sẽ dần quên đi những chuyện đã xảy ra trong giấc mơ thời ấu thơ.", "Nhưng lời hát ru là thứ gì đó in sâu vào tiềm thức của em cảm giác được yêu thương."] }
];

let scenesContent = '';
let canvasImages = [];

raw.forEach((slide, idx) => {
  // Find largest image in this slide
  let mainImage = null;
  let maxSize = 0;
  slide.images.forEach(img => {
    try {
      const stats = fs.statSync(`extracted_slides/Pictures/${img}`);
      if (stats.size > maxSize) {
        maxSize = stats.size;
        mainImage = img;
      }
    } catch(e) {}
  });

  if (!mainImage && slide.text.length === 0) return; // Skip empty slides
  
  // Use a generic background if no image is found but there is text
  if (!mainImage) mainImage = '10000201000005A7000007FE719BCF4C8BE80119.png'; 
  
  canvasImages.push(mainImage);
  
  const textStr = slide.text.length > 0 
    ? `[\n${slide.text.map(t => `          '${t.replace(/'/g, "\\'")}'`).join(',\n')}\n        ]`
    : `[]`;
    
  scenesContent += `
      {
        id: 'scene-${idx}',
        type: 'scene',
        text: ${textStr},
        visual: {
          backgroundTone: 'bg-slate-900',
          illustrationType: 'slide',
          colorHint: 'dark',
          mainImage: '${mainImage}'
        }
      },`;
});

console.log(scenesContent);
console.log('\n\nCANVAS IMAGES ARRAY:\n', JSON.stringify(canvasImages, null, 2));
