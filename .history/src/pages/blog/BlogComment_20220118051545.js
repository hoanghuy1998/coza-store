import React, {useState, useRef } from "react";
import commentService from "../../services/commentService";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "../../stores/action";
import { useNavigate } from "react-router-dom";

const BlogComment = ({ blogId }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.dataUser);
  const getCmtId = useSelector((state) => state.blog.comments);
  console.log(getCmtId);
  const blog = useSelector((state) => state.blog.blog);
  const [comment, setComment] = useState({
    commentId: "",
    contents: "",
    id: "",
  });
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadData = () => {
    commentService.getListCmt(blogId).then((res) => {
      console.log(res.data);
      if (res.data.errorCode === 0) {
        dispatch({
          type: ActionTypes.COMMENTS,
          comments: res.data.data,
        });
      } else {
        console.log("error");
      }
    });
  };
  const handleChangeData = (e) => {
    const newData = { ...comment };
    newData[e.target.name] = e.target.value;
    setComment(newData);
    console.log(newData);
  };

  const handleSave = () => {
    if (isLogin) {
      comment.commentId = blog.commentId;
      comment.id = user.id;
      commentService.add(comment).then((res) => {
        if (res.data.errorCode === 0) {
          loadData();
          inputRef.current.value = "";
          toast.success("Comment Thành Công");
        }

        console.log(res.data);
        console.log("ok");
      });
    } else {
      dispatch({
        type: ActionTypes.CURRENT_LOACION,
        currentLocation: window.location.pathname,
      });
      navigate("/login");
    }
  };
  const handleDelete = (e, id) => {
    commentService.delete(id).then((res) => {
      console.log(res);
      if (res.data.errorCode === 0) {
        loadData(res);
        toast.warning("Đã Xóa Comment Của Bạn Thành Công");
      }
    });
  };
  return (
    <>
      <div className="p-t-40">
        <h5 className="mtext-113 cl2 p-b-12">Bình Luận</h5>

        <p className="stext-107 cl6 p-b-40">
          Địa chỉ email của bạn sẽ không được công bố. Các trường bắt buộc được
          đánh dấu *
        </p>
        <div className="row d-flex justify-content-start">
          <div className="col-md-12">
            {getCmtId.map((comment, index) => (
              <div className="card p-3 mb-2" key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="user d-flex flex-row align-items-center">
                    {" "}
                    <img
                      src={comment.avataUser}
                      width="30"
                      className="user-img rounded-circle "
                      alt=""
                    />{" "}
                    <span>
                      <small className="font-weight-bold text-primary text-capitalize mx-2">
                        {comment.userName}
                      </small>{" "}
                      <small className="font-weight-bold">
                        {comment.contents}
                      </small>
                    </span>{" "}
                  </div>
                  <small>{comment.create_at.slice(0, 10)}</small>
                </div>
                <div className="action d-flex justify-content-between mt-2 align-items-center">
                  <div
                    className="reply px-4"
                    onClick={(e, id) => handleDelete(e, comment.id)}
                  >
                    {comment.userId === user.userId ? (
                      <small>Xóa Bình Luận</small>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="icons align-items-center">
                    <i className="fa fa-star text-warning"></i>{" "}
                    <i className="fa fa-check-circle-o check-icon"></i>{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form>
          <div className="bor19 m-b-20">
            <textarea
              className="stext-111 cl2 plh3 size-124 p-lr-18 p-tb-15"
              name="contents"
              placeholder="Comment..."
              ref={inputRef}
              onChange={handleChangeData}
            ></textarea>
          </div>

          <button
            type="button"
            className="flex-c-m stext-101 cl0 size-125 bg3 bor2 hov-btn3 p-lr-15 trans-04"
            // disabled={!formik.dirty || !formik.isValid}
            onClick={handleSave}
          >
            Post Comment
          </button>
        </form>
      </div>
    </>
  );
};

export default BlogComment;
