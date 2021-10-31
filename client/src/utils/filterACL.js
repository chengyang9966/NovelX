export const filterACL = (array = []) => {
  let newArray = [];
  if (array.length === 0) {
    return false;
  }
  let ACL = localStorage.getItem("ACL");
  if (!ACL) {
    return array;
  } else {
    ACL = Object.keys(JSON.parse(ACL));
    if (ACL.length === 0) {
      return array;
    } else {
      array.forEach((x) => {
        if (ACL.includes(x.text.toLowerCase())) {
          newArray.push(x);
        }
      });
      return newArray;
    }
  }
};
