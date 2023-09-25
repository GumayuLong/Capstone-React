import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ticketService } from "../../services/ticket";
import { sumBy } from "lodash";

export default function Booking() {
  const params = useParams();

  const [movieDetail, setMovieDetail] = useState({});
  const [chairList, setChairList] = useState([]);

  useEffect(() => {
    fetchTicketDetail();
  }, []);

  const fetchTicketDetail = async () => {
    const result = await ticketService.fetchTicketDetailApi(params.Id);
    console.log(result);

    setMovieDetail(result.data.content.thongTinPhim);
    setChairList(result.data.content.danhSachGhe.map((element) => {
      // element.dangChon = false;

      // return element;
      return {...element, dangChon: false}
    }));
  }

  const handleSelect = (chair) => {
    // console.log(chair);
    const data = [...chairList];

    const idx = data.findIndex((element) => element.maGhe === chair.maGhe);

    data[idx].dangChon = !data[idx].dangChon;

    setChairList(data);
  }

  const renderChairList = () => {
    return chairList.map((element, idx) => {
      let className = "btn-dark";

      if (element.loaiGhe == "Vip"){
        className = "btn-warning";
      };

      if(element.dangChon){
        className = "btn-primary";
      }

      return (
			<React.Fragment key={element.maGhe}>
				<button
          onClick={() => {handleSelect(element)}}
          disabled={element.daDat}
					style={{ width: 50, height: 50, padding: 0 }}
					className={`mr-1 mb-1 btn ${className}`}
				>
					{element.tenGhe}
				</button>
				{(idx + 1) % 16 === 0 && <br />}
			</React.Fragment>
		);
    })
  }

  const renderSeatList = () => {
    const data = chairList.filter((element) => element.dangChon);

    // console.log(data);
    return data.map((element) => {
      return <p className="badge badge-success mr-2 mb-0">{element.tenGhe}</p>;
    })
  }

  const renderTotalPrice = () => {
    const data = chairList.filter((element) => element.dangChon);
    // const total = data.reduce((total, element) => total += element.giaVe, 0);

    const total = sumBy(data, "giaVe");

    return total.toLocaleString();
  };

	return (
		<div className="py-5">
			<div className="row">
				<div className="col-8 mb-4">
					<div style={{ width: "95%" }} className="mx-auto">
						<div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-secondary">
							Seats are booked
						</div>
						<div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-dark">
							Seats not booked
						</div>
						<div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-primary">
							Seats are being booked
						</div>
						<div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-warning">
							VIP seats
						</div>
					</div>
				</div>
				<div className="col-8">
					<div style={{ width: "95%" }} className="mx-auto">
						{renderChairList()}
					</div>
				</div>

				<div className="col-4">
					<img
						style={{ width: 300, height: 400, objectFit: "cover" }}
						src={movieDetail.hinhAnh}
						alt="#"
					/>
					<h4 className="mb-0">{movieDetail.tenPhim}</h4>
					<h5 className="mb-0">
						Number of seats:
						<div className="d-flex">{renderSeatList()}</div>
					</h5>
					<h5>Total: {renderTotalPrice()}</h5>
					<button className="btn btn-warning">BOOK</button>
				</div>
			</div>
		</div>
	);
}
