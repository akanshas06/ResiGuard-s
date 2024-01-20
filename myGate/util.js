function isNull  (input){
    return (input===null  || input.length===0 || input==="null");
}


function invalidInputResponse(input) {
  return (input === null || input === "null" || input === "");
}

function emptyResponse() {
  return {
    status: {
      code: -1,
      message: "No data found",
    },
  };
}

function somethingWentWrong() {
  return {
    status: {
      code: -1,
      message: "Something went wrong.",
    },
  };
}

function milisToDateConverter(date) {
  let formatedDate = null;
  let data = new Date(date);
  let yyyy = data.getFullYear();
  let mm = data.getMonth() + 1;
  let dd = data.getDate();
  let hr = data.getHours();
  let min = data.getMinutes();
  let ss = data.getSeconds();
  let ms = data.getMilliseconds();
  mm < 10 ? (mm = "0" + mm) : mm;
  dd < 10 ? (dd = "0" + dd) : dd;
  hr < 10 ? (hr = "0" + hr) : hr;
  min < 10 ? (min = "0" + min) : min;
  ss < 10 ? (ss = "0" + ss) : ss;
  ms < 100 ? (ms = "0" + ms) : ms;
  formatedDate = `${yyyy}-${mm}-${dd} ${hr}:${min}:${ss}.${ms}`;
  return formatedDate;
}

exports.camelKeys = function (object) {
  return keysToCamel(object);
};
const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};
const isArray = function (a) {
  return Array.isArray(a);
};
const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};
const keysToCamel = function (o) {
  if (isObject(o)) {
    const n = {};
    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });
    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }
  return o;
};


function isNullRequestBody (reqBodyData,res){
  for (let i in reqBodyData) {
    if (i === null) {
     return true
    }
    return false
  }
}

function nullRequestBody(){
  return {
    status: {
      code: -1,
      message:"Something is set as NULL please try again ."

    },
  };

}
const uploadFileMaxsize = 50000 * 1024 * 1024  // max file upload size 5 GB

module.exports = {
  isNull,
  emptyResponse,
  keysToCamel,
  invalidInputResponse,
  milisToDateConverter,
  isNullRequestBody,
  nullRequestBody,
  somethingWentWrong,
  uploadFileMaxsize
};