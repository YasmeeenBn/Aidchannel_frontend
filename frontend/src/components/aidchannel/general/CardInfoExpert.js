import React from "react";
import "./CardInfo.css";
import { useMediaQuery } from "react-responsive";
import parse from "html-react-parser";
import urlImageAdapter from "helpers/urlImageAdapter";

const CardInfoExpert = ({ data, index }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 700px)",
  });

  // const { expert_id } = useParams();

  // const [article, setArticle] = useState({});

  // const getDataFromApi = useCallback(async () => {
  //   const article = await getExpertArticleByIdExpert(expert_id);
  //   setArticle(article);
  // }, [article]);

  // useEffect(() => {
  //   getDataFromApi();
  // }, [getDataFromApi]);

  return (
    <div className="container my-5 box-shadow-card-info p-4">
      {isDesktopOrLaptop ? (
        <>
          <div className="row ">
            <div className="col-12">
              <div className="row ">
                <div className="col-6 my-4">
                  <img
                    className="project-month-img"
                    alt=""
                    src={urlImageAdapter(data?.articleImage)}
                  />
                </div>
                 <div className="col-6 my-6">
                  <p className="project-details text-justify">
                    {/*parse(data?.article)*/}
                  </p>
                </div> 
                <div className="col-12 ">
                  <p className="project-details text-justify">
                    {parse(data?.article)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row ">
            <div className="col-12">
              <div className="col-6 my-4">
                <p className="project-details text-justify">
                  {parse(data?.article?.substring(0, 501))}
                </p>
              </div>
              <div className="col-12 ">
                <p className="project-details text-justify">
                  {parse(data?.article?.substring(501))}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 ">
            <img
              className="project-month-img"
              alt="project of the month"
              src={urlImageAdapter(data?.articleImage)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CardInfoExpert;
