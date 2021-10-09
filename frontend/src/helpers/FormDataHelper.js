const formDataHelper = (file, keyName, obj) => {
  let formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  formData.append(keyName, file);
  return formData;
};

export default formDataHelper;
