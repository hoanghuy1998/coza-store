import React, { useState, useEffect } from "react";
import "./Order.css";
import { Container } from "react-bootstrap";
import img from "../shop/images/product-02.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";

const OrderDetail = () => {
  function format2(n, currency) {
    return n.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + " " + currency;
  }
  const data = useSelector((state) => state.auth.dataCheckOut);
  const user = useSelector((state) => state.auth.dataUserCheckOut);
  console.log("user", user);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  console.log(data);
  useEffect(() => {
    setTotal(0);
    data?.x?.map((d) => setTotal((total) => (total += d.total)));
  }, []);
  const handleCLick = (e, id) => {
    e.preventDefault();
    navigate(`/shopdetail/${id}`);
  };
  console.log('data',d)
  return (
    <Container>
      <span
        className="hover-layout"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/feature")}
      >
        Giỏ Hàng
      </span>{" "}
      <i className="fa fa-angle-right mx-1 " aria-hidden="true"></i>
      <span onClick={() => navigate("/order")} className="hover-layout">
        Đơn Hàng
      </span>
      <i className="fa fa-angle-right mx-1" aria-hidden="true"></i>
      <span>Chi Tiết</span>
      <Form>
        <Row className="text-center ">
          <h4 className="text-danger mt-3 text-uppercase fw-bolder">
            Chi tiết đơn hàng
          </h4>
        </Row>
        <Row className=" align-items-start mt-5">
          <div className="kHWfJY col-8">
            <div className="ipnhKS">
              <div className="name-content title">Tên khách Hàng :</div>
              <span className="mx-2 fs-4 text-primary">{user?.userName} </span>
              <div className="title">Địa chỉ người nhận :</div>
              <span className="mx-2 fs-4 text-primary">
                {"Số Nhà : " +
                  user?.dress +
                  " , " +
                  user?.ward +
                  " , " +
                  user?.district +
                  " , " +
                  user?.city}
              </span>
              <div className="content">
                <p className="phone-content">
                  <span>Điện thoại :</span>
                  <span className="mx-2 fs-4 text-primary">0{user?.phone}</span>
                </p>
              </div>
            </div>
          </div>
        </Row>
        <div className="row">
          <div className="col-md-12 ftco-animate">
            <div className="cart-list">
              <table className="table align-items-center ">
                <thead className="thead-primary">
                  <tr className="text-center">
                    <th>Mã đơn hàng</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map san pham */}
                  {data?.x?.map((data) => (
                    <tr
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                      key={data.id}
                    >
                      <td
                        className="align-items-center"
                        style={{ verticalAlign: "middle" }}
                      >
                        {data.codeOrder}
                      </td>
                      <td className="image-prod">
                        <img
                          className="img-thumbnail"
                          src={data.srcImg}
                          alt=""
                        />
                        <td className="price" width="20%">
                          {format2(data.transportFee, 'vnđ')}
                        </td>
                        <td className="price" width="20%">
                          {data.coupon === 0 ? 'không có mã giảm giá' : format2(data.coupon, 'vnđ')}
                        </td>
                      </td>
                      <td className="product-name">
                        <a
                          href="/#"
                          style={{ color: "blue", textDecoration: "none" }}
                          onClick={(e) => handleCLick(e, data.productId)}
                        >
                          <h3 style={{ verticalAlign: "middle" }}>
                            {data.name}
                          </h3>
                        </a>
                      </td>
                      <td className="price" style={{ verticalAlign: "middle" }}>
                        {" "}
                        {data.price}.000 đ
                      </td>
                      <td
                        className="quantity text-center"
                        style={{ verticalAlign: "middle" }}
                      >
                        {data.quantity}
                      </td>
                      <td className="total" style={{ verticalAlign: "middle" }}>
                        {data.total}.000đ
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  {/* <tr>
                    <td colSpan="4">
                      <span>Tạm tính:</span>
                    </td>
                    <td>{total} đ</td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <span>Coupon</span>
                    </td>
                    <td>0</td>
                  </tr> */}
                  <tr>
                    <td colSpan="4"></td>
                    <td className="text-center total">
                      <span style={{ color: "red" }}>Tổng cộng:</span>
                    </td>
                    <td className="text-center total">{total}.000đ</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default OrderDetail;
