//eshint esversion:6
exports.getDate = function () {
  //module.exports has shortcut as only exports.
  const today = new Date();
  const currentDay = today.getDay();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  day = today.toLocaleDateString("en-US", options);
  return day;
};

exports.getDay = function () {
  const today = new Date();
  const currentDay = today.getDay();

  const options = {
    weekday: "long",
  };
  day = today.toLocaleDateString("en-US", options);
  return day;
};
