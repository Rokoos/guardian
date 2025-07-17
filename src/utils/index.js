export const logout = () => localStorage.removeItem("nannyTkn");

export const menuStyles = (route, id, userId) => {
  if (route === "profile" && id === userId) {
    return "border-coral-red bg-white text-coral-red";
  } else if (route === "nannys") {
    return "border-coral-red bg-white text-coral-red";
  } else {
    return "border-white bg-coral-red text-white ";
  }
};

export const phoneFormat = (phone) => {
  // let str = phone.split("");
  const str = phone.match(/.{1,3}/g).join(" ");
  // console.log(joy.join(' '));

  return str;
};

////////////////
export const charNumber = (comment, length) => length - comment.length;

//////////////////////////////////
export const removeChatFromUpdatedChats = (chats, chat) => {
  if (chats.length > 0) {
    return chats.filter((el) => el._id !== chat._id);
  } else {
    return [];
  }
};

/////////////////////////////////
export const filterChatsWithNewMessages = (
  arr1,
  arr2,
  currentChat,
  inMessageBox
) => {
  let result = arr1.filter((el) => {
    return !arr2.some(
      (elem) => el._id === elem._id && el.updatedAt === elem.updatedAt
    );
  });

  if (currentChat && inMessageBox) {
    result = result.filter((el) => el._id !== currentChat._id);
  }
  return result;
};

//////////////////////////
export const checkSchedule = (arr) => {
  return arr.some((el) => el.av);
};

export const getCategory = (num) => {
  if (num === 1) {
    return "Opieka nad dzieckiem,dziećmi";
  } else if (num === 2) {
    return "Opieka nad osobą starszą";
  } else if (num === 3) {
    return "Opieka nad osobą niepełnosprawną";
  }
};

export const mobileFormat = (mobile) => {
  let str = "";
  for (let i = 0; i < mobile.length; i++) {
    if (i === 2 || i === 5 || i === 8) {
      str = str + mobile[i] + " ";
    } else {
      str = str + mobile[i];
    }
  }
  return str;
};
