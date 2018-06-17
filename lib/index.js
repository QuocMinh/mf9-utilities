/**
 * Hàm chuyển Respone SOAP thành object
 * @param {String} xmlStr Chuỗi trả về từ SOAP services
 */
module.exports.respXml2Json = function (xmlStr = "") {
  if (typeof xmlStr !== 'string') throw new TypeError('xmlStr # is not a string');

  try {
    let jsonString = xmlStr.match(/\{.*\:*\}/g);
    return JSON.parse(jsonString[0]);
  } catch (error) {
    throw new Error('xmlStr # not contain json');
  }
}

/**
 * Hàm xóa khoảng trắng thừa trong chuỗi
 * @param {String} string 
 */
module.exports.removeSpaces = (string = '') => {
  return string.replace(/ +(?= )/g, '');
}

/**
 * Hàm kiểm tra số điện thoại có phải là số của Mobifone không
 * @param {String} phone Số điện thoại (0899502810 || +84899502810)
 */
module.exports.checkMobiFoneNumber = (phone = '') => {
  if (phone.indexOf('+8490') >= 0) return true;
  if (phone.indexOf('+8493') >= 0) return true;
  if (phone.indexOf('+8489') >= 0) return true;
  if (phone.indexOf('+84121') >= 0) return true;
  if (phone.indexOf('+84120') >= 0) return true;
  if (phone.indexOf('+84122') >= 0) return true;
  if (phone.indexOf('+84126') >= 0) return true;
  if (phone.indexOf('+84128') >= 0) return true;

  if (phone.startsWith('089')) return true;
  if (phone.startsWith('090')) return true;
  if (phone.startsWith('093')) return true;
  if (phone.startsWith('0121')) return true;
  if (phone.startsWith('0120')) return true;
  if (phone.startsWith('0122')) return true;
  if (phone.startsWith('0126')) return true;
  if (phone.startsWith('0128')) return true;

  return false;
}

/**
 * Kiểm tra số EZ người dùng nhập có hợp lệ hay không
 * @param {String} ez Số EZ
 */
module.exports.checkEz = (ez = '') => {
  if (!ez) return false;

  if (ez.length === 9) {
    let dauSo = ez.substring(0, 2);

    if (dauSo === '90') return true;
    if (dauSo === '93') return true;
    if (dauSo === '89') return true;

  } else if (ez.length === 10) {
    let dauSo = ez.substring(0, 3);

    if (dauSo === '121') return true;
    if (dauSo === '120') return true;
    if (dauSo === '122') return true;
    if (dauSo === '126') return true;
    if (dauSo === '128') return true;
  }

  return false;
}

// ===============================================================================
// ## XỬ LÝ NGÀY THÁNG ## --------------------------------------------------------
// ===============================================================================

/**
 * Hàm lấy chuỗi ngày tháng hiện tại theo định dạng: dd/mm/yyy
 */
module.exports.getCurrentDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '/' + mm + '/' + yyyy;
}

/**
 * Hàm lấy chuỗi ngày tháng truyền vào theo định dạng: dd/mm/yyy
 * @param {Date} date ngày tháng
 */
module.exports.getStringFromDate = (date = new Date()) => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!
  let yyyy = date.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '/' + mm + '/' + yyyy;
}

/**
 * Hàm truyền vào Ngày tháng năm dạng: dd/mm/yyyy trả về Ngày tháng năm dạng: mmyyyy
 * @param {String} stringDate Ngày tháng năm dạng chuỗi: dd/mm/yyyy
 */
module.exports.toShortMonth = (stringDate = '') => {
  let result = '';

  try {
    const arr = stringDate.split('/');
    result = arr[1] + arr[2];
  } catch (error) {
    const arr = getStringCurrentDate();
    result = arr[1] + arr[2];
  }

  return result;
}

/**
 * Hàm lấy ký tự đầu tiên của tên đệm và tên
 * @param {String} fullName Họ tên
 */
module.exports.getFirstCharFullName = (fullName = '') => {
  fullName = xoaKhoangTrangThua(fullName);

  let textAvartar = 'NV';
  let arrName = fullName.split(' ');
  let length = arrName.length;

  let tenDem = arrName[length - 2];
  let ten = arrName[length - 1];

  textAvartar = tenDem.substring(0, 1) + ten.substring(0, 1);

  return textAvartar.toUpperCase();
}