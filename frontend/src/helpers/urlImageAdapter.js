const urlImageAdapter = (url) => {
  if (url?.split("/")[0] == "uploads") {
    console.log(process.env.REACT_APP_BACKEND + url);
    return process.env.REACT_APP_BACKEND + url;
  } else if (url?.length != 0) return url;
  return null;
};

export default urlImageAdapter;
