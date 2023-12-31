export const slugGenerate = (text: string) => {
  const output = showUnsignedString(text);
  let result = output.replace(/[^a-zA-Z0-9 ]/g, '');
  result = result.replace('  ', ' ')
  result = result.replaceAll(' ', '-')
  result = result.toLowerCase()

  return result;
}


function showUnsignedString(input: string) {
  const signedChars = "àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬĐÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ";
  const unsignedChars = "aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY";
  const pattern = new RegExp("[" + signedChars + "]", "g");
  const output = input.replace(pattern, function (m, key, value) {
    return unsignedChars.charAt(signedChars.indexOf(m));
  });

  return output;
}
