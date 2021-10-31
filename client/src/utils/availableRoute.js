export const availableRoute = (array = []) => {
  let ACL = JSON.parse(localStorage.getItem("ACL"));

  let allPageName = Object.keys(ACL);

  if (array.length === 0) {
    return array;
  }
  if (!ACL) {
    return array;
  }

  if (allPageName.length > 0) {
    let newRoute = [];
    array.forEach((current) => {
      if (allPageName.includes(current.name.toLowerCase())) {
        newRoute.push(current);
      }
    });
    return newRoute;
  }
};
