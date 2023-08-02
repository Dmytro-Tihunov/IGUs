import { useHistory } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import ContentLoader from "react-content-loader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Header.css";
import useStore from "../../store";

const OffCanvasHeader = ({ ...props }) => {
  const { subcategories, isCategoriesLoading } = useStore();

  const navigate = useHistory();

  function transformUrl(url) {
    return url
      .replace(",", "")
      .replace("/", "-")
      .replace(/\s+/g, "-")
      .toLowerCase();
  }

  function navigateToCategoryPage(categoryName) {
    props.onHide();
    navigate.push(`/category/${transformUrl(categoryName)}`);
  }

  const MyButtonsLoader = () => (
    <ContentLoader
      speed={2}
      viewBox="0 0 468 204"
    >
      <rect x="0" y="13" rx="4" ry="4" width="100%" height="31" />
      <rect x="0" y="56" rx="4" ry="4" width="100%" height="1" />
      <rect x="0" y="75" rx="4" ry="4" width="45%" height="24" />
      <rect x="50%" y="75" rx="4" ry="4" width="50%" height="24" />
      <rect x="0" y="110" rx="4" ry="4" width="45%" height="24" />
      <rect x="50%" y="110" rx="4" ry="4" width="50%" height="24" />
      <rect x="0" y="145" rx="4" ry="4" width="45%" height="24" />
      <rect x="50%" y="145" rx="4" ry="4" width="50%" height="24" />
      <rect x="0" y="180" rx="4" ry="4" width="45%" height="24" />
    </ContentLoader>
  );

  return (
    <Offcanvas {...props}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Categories</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row>
          {isCategoriesLoading
            ? Array.from(Array(11).keys()).map((i) => (
                <Col className="block-cat" xs={12} md={3} key={i}>
                  <MyButtonsLoader />
                </Col>
              ))
            : subcategories.map((category, index) => (
                <Col className="block-cat" xs={12} md={3} key={index}>
                  <div className="block-title">
                    <button
                      className="title-link-canvas"
                      onClick={() => navigateToCategoryPage(category.name)}
                    >
                      {category.name}
                    </button>
                  </div>
                  {category?.subcategories ? (
                    <Row>
                      {category?.subcategories.map((subCategory, index) => (
                        <Col xs={12} md={6} key={index}>
                          <button
                            className="sublink-canvas"
                            onClick={() => navigateToCategoryPage(subCategory)}
                          >
                            {subCategory}
                          </button>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <></>
                  )}
                </Col>
              ))}
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvasHeader;
