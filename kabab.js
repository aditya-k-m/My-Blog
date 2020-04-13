const _ = require("lodash");
module.exports = {
  deKabab: function (str){
  let i = "";
  while (true){
    i = str;
    str = _.replace(str, '-', ' ');
    if(i == str)
    break;
  }
  return str;
},
reKabab: function (str){
  let i = "";
  while (true){
    i = str;
    str = _.replace(str, ' ', '-');
    if(i == str)
    break;
  }
  return str;
}
}
