import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ticketService } from "../../services/ticket";
import { filter, sumBy } from "lodash";
import { LoadingContext } from "../../contexts/LoadingContext/LoadingContext";
import "./booking.scss";

export default function Booking() {
  const params = useParams();
  const navigate = useNavigate();

  const [movieDetail, setMovieDetail] = useState({});
  const [chairList, setChairList] = useState([]);
  const [_, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    fetchTicketDetail();
  }, []);

  const fetchTicketDetail = async () => {
    setLoadingState({ isLoading: true });
    const result = await ticketService.fetchTicketDetailApi(params.Id);
    // console.log(result);

    setMovieDetail(result.data.content.thongTinPhim);
    setChairList(
      result.data.content.danhSachGhe.map((element) => {
        // element.dangChon = false;

        // return element;
        return { ...element, dangChon: false };
      })
    );
    setLoadingState({ isLoading: false });
  };

  const handleSelect = (chair) => {
    // console.log(chair);
    const data = [...chairList];

    const idx = data.findIndex((element) => element.maGhe === chair.maGhe);

    data[idx].dangChon = !data[idx].dangChon;

    setChairList(data);
  };

  const renderChairList = () => {
    return chairList.map((element, idx) => {
      let className = "btn-dark";

      if (element.loaiGhe == "Vip") {
        className = "btn-warning";
      }

      if (element.dangChon) {
        className = "btn-success";
      }

      return (
        <React.Fragment key={element.maGhe}>
          <button
            onClick={() => {
              handleSelect(element);
            }}
            disabled={element.daDat}
            className={`mr-1 mb-1 btn chair ${className}`}
          >
            {element.tenGhe}
          </button>
          {(idx + 1) % 16 === 0 && <br />}
        </React.Fragment>
      );
    });
  };

  const renderSeatList = () => {
    const data = chairList.filter((element) => element.dangChon);

    // console.log(data);
    return data.map((element) => {
      return (
        <p className="badge badge-success mr-2 my-1">Ghế {element.tenGhe}</p>
      );
    });
  };

  const renderTotalPrice = () => {
    const data = chairList.filter((element) => element.dangChon);

    const total = sumBy(data, "giaVe");

    return <span>{total.toLocaleString()}vnd</span>;
  };

  const handleBookTicket = async () => {
    const data = filter(chairList, "dangChon");
    const body = {
      maLichChieu: +params.Id,
      danhSachVe: data.map((element) => {
        return {
          maGhe: element.maGhe,
          giaVe: element.giaVe,
        };
      }),
    };

    // console.log(params.Id);

    const result = await ticketService.bookTicketApi(body);
    navigate("/");
  };

  return (
    <div className="py-5 bgImg">
      <div className="row pt-5 mx-auto" style={{ maxWidth: "80%" }}>
        <div className="col-12 col-xl-8 col-lg-12 col-md-12 col-sm-12 mx-auto">
          <div className="chair-type-list mb-4">
            <div className="chair-type mr-2 mb-1 p-2 rounded text-white bg-secondary">
              GHẾ ĐÃ ĐẶT
            </div>
            <div className="chair-type mr-2 mb-1 p-2 rounded text-white bg-dark">
              GHẾ TRỐNG
            </div>
            <div className="chair-type mr-2 mb-1 p-2 rounded text-white bg-success">
              GHẾ ĐANG CHỌN
            </div>
            <div className="chair-type mr-2 mb-1 p-2 rounded text-white bg-warning">
              GHẾ VIP
            </div>
          </div>
          <div className="mx-auto chair-list">{renderChairList()}</div>
        </div>

        <div className="col-12 col-xl-4 col-lg-12 col-md-12 col-sm-12">
          <div className="bgCol4">
            <div className="booking-info">
              <img src={movieDetail.hinhAnh} alt="#" />
              <div className="booking-right">
                <h4 className="mb-0 filmTitle">{movieDetail.tenPhim}</h4>
                <h5 className="mb-0 selectChair">
                  Số ghế:
                  <div
                    className="d-flex align-items-center"
                    style={{ flexWrap: "wrap" }}
                  >
                    {renderSeatList()}
                  </div>
                </h5>
                <h5 className="total">
                  <span>Tổng tiền: </span>
                  {renderTotalPrice()}
                </h5>
              </div>
            </div>
            <button
              className="btn btn-primary booking"
              style={{}}
              onClick={handleBookTicket}
            >
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
